import request from 'supertest'
import app from '../src/app'

jest.mock('../src/prisma/client', () => {
  const prismaMock = {
    serviceWorker: {
      findMany: jest.fn(),
    },
    profession: {
      findMany: jest.fn(),
    },
  }
  return {
    prisma: prismaMock,
  }
})

import { prisma } from '../src/prisma/client'

describe('GET /service-workers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return service workers with their professions', async () => {
    const mockWorkers = [
      { id: 1, name: 'John', professionId: 2 },
      { id: 2, name: 'Anna', professionId: 1 },
    ]
    const mockProfessions = [
        { id: 1, title: 'Designer' },
        { id: 2, title: 'Builder' },
      ]

    ;(prisma.serviceWorker.findMany as jest.Mock).mockResolvedValue(mockWorkers)
    ;(prisma.profession.findMany as jest.Mock).mockResolvedValue(mockProfessions)

    const res = await request(app).get('/service-workers')

    expect(res.statusCode).toBe(200)
    expect(res.body.workers).toHaveLength(2)
    expect(res.body.workers[0].profession.title).toBe('Builder')
  })

  it('should return 404 if no service workers found', async () => {
    ;(prisma.serviceWorker.findMany as jest.Mock).mockResolvedValue([])

    const res = await request(app).get('/service-workers')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'serviceWorkers not found')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.serviceWorker.findMany as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).get('/service-workers')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
