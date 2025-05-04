import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    agency: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    profession: {
      delete: jest.fn(),
    },
  }
}))

import { prisma } from '../../src/prisma/client'

describe('PATCH /user/update', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update individual user and disconnect agency/profession', async () => {
    const user = { id: '1', agencyId: 'agency1', professionId: 'prof1' }
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(user)
    ;(prisma.user.update as jest.Mock).mockResolvedValue({})

    const res = await request(app)
      .patch('/user/update')
      .send({ id: '1', userType: 'individual' })

    expect(res.statusCode).toBe(200)
    expect(prisma.user.update).toHaveBeenCalled()
    expect(prisma.agency.delete).toHaveBeenCalledWith({ where: { id: 'agency1' } })
    expect(prisma.profession.delete).toHaveBeenCalledWith({ where: { id: 'prof1' } })
  })

  it('should update agency user and create agency if missing', async () => {
    const user = { id: '2', agencyId: null, professionId: null }
    const newAgency = { id: 'newAgencyId' }
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(user)
    ;(prisma.agency.create as jest.Mock).mockResolvedValue(newAgency)
    ;(prisma.user.update as jest.Mock).mockResolvedValue({})

    const res = await request(app)
      .patch('/user/update')
      .send({ id: '2', userType: 'agency', agency: 'New Agency' })

    expect(res.statusCode).toBe(200)
    expect(prisma.agency.create).toHaveBeenCalled()
    expect(prisma.user.update).toHaveBeenCalled()
  })

  it('should return 404 if user not found', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).patch('/user/update').send({ id: 'nonexistent' })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'User not found')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).patch('/user/update').send({ id: '1' })

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
