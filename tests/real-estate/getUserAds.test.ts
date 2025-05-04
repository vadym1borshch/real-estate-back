import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => ({
  prisma: {
    realEstate: {
      findMany: jest.fn(),
    },
  },
}))

import { prisma } from '../../src/prisma/client'

describe('GET /real-estates/user-ads', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a list of user ads', async () => {
    const mockAds = [
        {
          id: 1,
          images: [{ estateId: 1, url: 'image.jpg', createdAt: new Date() }],
          favoredBy: [{ id: 'user1' }],
          premises: [],
          equipments: [],
          fees: [],
          monthlyCosts: [],
        },
      ]
    ;(prisma.realEstate.findMany as jest.Mock).mockResolvedValue(mockAds)

    const res = await request(app).get('/real-estates/user-ads?id=user1')

    expect(res.statusCode).toBe(200)
    expect(res.body.estates).toHaveLength(1)
    expect(res.body.estates[0].id).toBe('1')
  })

  it('should return 404 if no user ads found', async () => {
    ;(prisma.realEstate.findMany as jest.Mock).mockResolvedValue(null)

    const res = await request(app).get('/real-estates/user-ads?id=user1')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'ads not found')
  })

  it('should return 500 on server error', async () => {
    ;(prisma.realEstate.findMany as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).get('/real-estates/user-ads?id=user1')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
