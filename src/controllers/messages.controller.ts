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

export const updateMessage = async (req: Request, res: Response) => {
  const { id, isArchived } = req.body
  try {
    const message = await prisma.messageThread.findUnique({ where: { id } })
    if (!message) return res.status(404).json({ error: 'messages not found' })

    const updatedMessage = await prisma.messageThread.update({
      where: { id },
      data: {
        status: 'read',
        ...(typeof isArchived === 'boolean' ? { isArchived } : {}),
      },
    })
    res.json({ updatedMessage })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }
  try {
    const message = await prisma.messageThread.findUnique({ where: { id } })
    if (!message) return res.status(404).json({ error: 'messages not found' })
    await prisma.messageThread.delete({ where: { id } })
    res.status(200).json({ error: 'message deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}