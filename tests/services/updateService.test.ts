import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => {
  const prismaMock = {
    service: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  }
  return {
    prisma: prismaMock,
  }
})

import { prisma } from '../../src/prisma/client'

describe('PATCH /services', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update service and return it', async () => {
    const mockService = { id: 1, title: 'Cleaning', checked: false }
    const updatedService = { ...mockService, checked: true }

    ;(prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService)
    ;(prisma.service.update as jest.Mock).mockResolvedValue(updatedService)

    const res = await request(app).patch('/services').send({ id: 1, checked: true })

    expect(res.statusCode).toBe(200)
    expect(res.body.updatedService).toEqual(updatedService)
  })

  it('should return 404 if service not found', async () => {
    ;(prisma.service.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).patch('/services').send({ id: 999 })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'services not found')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.service.findUnique as jest.Mock).mockResolvedValue({ id: 1 })
    ;(prisma.service.update as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).patch('/services').send({ id: 1, checked: true })

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
