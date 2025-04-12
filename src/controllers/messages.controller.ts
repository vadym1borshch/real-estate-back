import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'

export const getMessages = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }

  try {
    const messages = await prisma.messageThread.findMany({ where: { userId: id } })
    const replies = await prisma.messageReply.findMany()
    const newMessages = messages.map((message) => {
      return {
        ...message,
        replies: replies.filter((reply) => reply.threadId === message.id),
      }
    })
    res.json({ newMessages })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}


export const postMessage = async (req: Request, res: Response) => {
  const { userId, messageText, senderName, senderEmail, senderLastName } = req.body

  try {

    const thread = await prisma.messageThread.findFirst({ where: { userId } })

    if (!thread) {
      return res.status(404).json({ error: 'Message thread not found for this user' })
    }

    await prisma.messageReply.create({
      data: {
        message: messageText,
        threadId: thread.id,
        senderName,
        senderEmail,
        senderLastName,
        timestamp: new Date(),
      },
    })

    const updatedThread = await prisma.messageThread.findUnique({
      where: { id: thread.id },
      include: { replies: true },
    })

    res.status(201).json({ messageThread: updatedThread })
  } catch (err) {
    console.error('[POST MESSAGE ERROR]', err)
    res.status(500).json({ error: 'Server error' })
  }
}