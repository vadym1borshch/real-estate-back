import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/prisma/client'

jest.mock('../src/prisma/client', () => ({
  prisma: {
    messageThread: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    messageReply: {
      findMany: jest.fn(),
    },
  },
}))

describe('Messages Controller', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('GET /messages', () => {
    it('should return messages with replies', async () => {
      const mockMessages = [{ id: '1', userId: 'user1', email: 'test@test.com', status: 'new', isArchived: false, createdAt: '', replies: [] }]
      const mockReplies = [{ id: 'r1', threadId: '1', message: 'Hi', senderName: 'Admin', senderLastName: 'Bot', senderEmail: 'admin@test.com', createdAt: '' }]
      ;(prisma.messageThread.findMany as jest.Mock).mockResolvedValue(mockMessages)
      ;(prisma.messageReply.findMany as jest.Mock).mockResolvedValue(mockReplies)

      const res = await request(app).get('/messages?id=user1')

      expect(res.statusCode).toBe(200)
      expect(res.body.newMessages[0].replies).toHaveLength(1)
    })

    it('should return 500 if db throws', async () => {
      ;(prisma.messageThread.findMany as jest.Mock).mockRejectedValue(new Error('fail'))

      const res = await request(app).get('/messages?id=user1')

      expect(res.statusCode).toBe(500)
      expect(res.body).toHaveProperty('error', 'Server error')
    })
  })

  describe('PATCH /messages', () => {
    it('should update a message', async () => {
      const mockMessage = { id: '1', status: 'new', isArchived: false }
      const updated = { ...mockMessage, status: 'read', isArchived: true }
      ;(prisma.messageThread.findUnique as jest.Mock).mockResolvedValue(mockMessage)
      ;(prisma.messageThread.update as jest.Mock).mockResolvedValue(updated)

      const res = await request(app).patch('/messages').send({ id: '1', isArchived: true })

      expect(res.statusCode).toBe(200)
      expect(res.body.updatedMessage.status).toBe('read')
    })

    it('should return 404 if message not found', async () => {
      ;(prisma.messageThread.findUnique as jest.Mock).mockResolvedValue(null)

      const res = await request(app).patch('/messages').send({ id: '999' })

      expect(res.statusCode).toBe(404)
      expect(res.body).toHaveProperty('error', 'messages not found')
    })

    it('should return 500 if update fails', async () => {
      ;(prisma.messageThread.findUnique as jest.Mock).mockResolvedValue({ id: '1' })
      ;(prisma.messageThread.update as jest.Mock).mockRejectedValue(new Error('fail'))

      const res = await request(app).patch('/messages').send({ id: '1' })

      expect(res.statusCode).toBe(500)
      expect(res.body).toHaveProperty('error', 'Server error')
    })
  })

  describe('DELETE /messages', () => {
    it('should delete a message', async () => {
      ;(prisma.messageThread.findUnique as jest.Mock).mockResolvedValue({ id: '1' })
      ;(prisma.messageThread.delete as jest.Mock).mockResolvedValue({})

      const res = await request(app).delete('/messages?id=1')

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('error', 'message deleted')
    })

    it('should return 404 if message not found', async () => {
      ;(prisma.messageThread.findUnique as jest.Mock).mockResolvedValue(null)

      const res = await request(app).delete('/messages?id=999')

      expect(res.statusCode).toBe(404)
      expect(res.body).toHaveProperty('error', 'messages not found')
    })

    it('should return 500 on deletion error', async () => {
      ;(prisma.messageThread.findUnique as jest.Mock).mockResolvedValue({ id: '1' })
      ;(prisma.messageThread.delete as jest.Mock).mockRejectedValue(new Error('fail'))

      const res = await request(app).delete('/messages?id=1')

      expect(res.statusCode).toBe(500)
      expect(res.body).toHaveProperty('error', 'Server error')
    })
  })
})
