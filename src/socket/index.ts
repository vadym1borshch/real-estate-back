import { Server, Socket } from 'socket.io'
import { prisma } from '../prisma/client'

export const setupSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.user.userId

    socket.on('send-message', async (data) => {
      const { recipientId, message } = data

      const thread = await prisma.messageThread.findFirst({
        where: { userId: recipientId },
      })

      if (!thread) return

      const newReply = await prisma.messageReply.create({
        data: {
          message,
          threadId: thread.id,
          senderName: data.senderName,
          senderEmail: data.senderEmail,
          senderLastName: data.senderLastName,
        },
      })

      io.to(recipientId).emit('receive-message', newReply)

      // only for test - simulate answer
      setTimeout(async () => {
        const autoReply = await prisma.messageReply.create({
          data: {
            message: 'Vielen Dank für Ihre Nachricht. Wir melden uns bald bei Ihnen 😊',
            threadId: thread.id,
            senderName: 'Auto',
            senderLastName: 'Responder',
            senderEmail: 'auto@responder.at',
          },
        })

        io.to(recipientId).emit('receive-message', autoReply)
      }, Math.floor(13000 + Math.random() * 4000))
    })

    socket.join(userId)
  })
}
