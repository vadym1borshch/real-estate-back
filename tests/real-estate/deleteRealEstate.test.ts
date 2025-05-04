import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => {
  const prismaMock = {
    realEstate: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  }
  return {
    prisma: prismaMock
  }
})

import { prisma } from '../../src/prisma/client'
import { ERROR_MESSAGES } from '../../src/types/realEstate.types'

describe('DELETE /real-estates?id=...', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should delete the real estate if found', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.realEstate.delete as jest.Mock).mockResolvedValue({})

    const res = await request(app).delete('/real-estates?id=1')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', ERROR_MESSAGES.ESTATE_DELETED)
  })

  it('should return 404 if real estate not found', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).delete('/real-estates?id=1')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', ERROR_MESSAGES.ESTATE_NOT_FOUND)
  })

  it('should return 500 if DB error occurs', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockRejectedValue(new Error('DB error'))

    const res = await request(app).delete('/real-estates?id=1')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', ERROR_MESSAGES.SERVER_ERROR)
  })

  it('should return 500 if delete operation fails', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.realEstate.delete as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).delete('/real-estates?id=1')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', ERROR_MESSAGES.SERVER_ERROR)
  })
})
