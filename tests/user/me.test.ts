import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn()
    }
  }
}))

import { prisma } from '../../src/prisma/client'

describe('GET /user/me', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return user if found', async () => {
    const mockUser = { id: '123', name: 'John', email: 'john@example.com' }
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

    const res = await request(app).get('/user/me').query({ id: '123' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user).toEqual(mockUser)
  })

  it('should return 404 if user not found', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).get('/user/me').query({ id: '123' })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'User not found')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).get('/user/me').query({ id: '123' })

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
