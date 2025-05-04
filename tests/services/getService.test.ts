import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => {
  const prismaMock = {
    service: {
      findMany: jest.fn(),
    },
  }
  return {
    prisma: prismaMock
  }
})

import { prisma } from '../../src/prisma/client'

describe('GET /services', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return list of services', async () => {
    const mockServices = [
        { id: 1, title: 'Cleaning' },
        { id: 2, title: 'Plumbing' },
      ]
    ;(prisma.service.findMany as jest.Mock).mockResolvedValue(mockServices)

    const res = await request(app).get('/services')

    expect(res.statusCode).toBe(200)
    expect(res.body.services).toHaveLength(2)
    expect(res.body.services[0].title).toBe('Cleaning')
  })

  it('should return 404 if no services found', async () => {
    ;(prisma.service.findMany as jest.Mock).mockResolvedValue(null)

    const res = await request(app).get('/services')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'services not found')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.service.findMany as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).get('/services')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
