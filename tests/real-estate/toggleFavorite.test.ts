import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => ({
  prisma: {
    realEstate: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

import { prisma } from '../../src/prisma/client'

describe('PATCH /real-estates/toggle-favorite', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const estateId = 1
  const userId = 'user123'

  it('should add to favorites if not already favorite', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue({
      id: estateId,
      favoredBy: [],
    })
    ;(prisma.realEstate.update as jest.Mock).mockResolvedValue({
      id: estateId,
      favoredBy: [{ id: userId }],
    })

    const res = await request(app).patch('/real-estates/toggle-favorite').send({ estateId, userId })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      estate: { id: estateId, favoredBy: [userId] },
      toggled: 'added',
    })
  })

  it('should remove from favorites if already favorite', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue({
      id: estateId,
      favoredBy: [{ id: userId }],
    })
    ;(prisma.realEstate.update as jest.Mock).mockResolvedValue({
      id: estateId,
      favoredBy: [],
    })

    const res = await request(app).patch('/real-estates/toggle-favorite').send({ estateId, userId })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      estate: { id: estateId, favoredBy: [] },
      toggled: 'removed',
    })
  })

  it('should return 404 if estate not found', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).patch('/real-estates/toggle-favorite').send({ estateId, userId })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'Ad not found')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).patch('/real-estates/toggle-favorite').send({ estateId, userId })

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
