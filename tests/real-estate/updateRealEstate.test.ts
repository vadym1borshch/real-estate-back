import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => {
  const prismaMock = {
    realEstate: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  }
  return {
    prisma: prismaMock,
  }
})

import { prisma } from '../../src/prisma/client'
import { ERROR_MESSAGES } from '../../src/types/realEstate.types'

describe('PATCH /real-estates/update-estate', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const existing = {
    id: '1',
    typeValue: 'real-estate.type.house',
    images: [{ url: 'old.jpg', estateId: '1', createdAt: new Date() }],
    favoredBy: [],
    number: '123',
    visibleDetailedAddress: true,
    cellar: true,
    landAreaM2: 100,
    typeKey: 'house',
    wc: 1,
    premises: [],
    equipments: [],
    fees: [],
    monthlyCosts: [],
  }

  it('should update the real estate if changed', async () => {
    const payload = {
      id: '1',
      postCode: '12345',
      city: 'New City',
      visibleDetailedAddress: 'yes',
      cellar: 'no',
      number: '456',
      typeKey: 'apartment',
      landAreaM2: 120,
      wc: 2,
      images: ['new.jpg'],
    }

    const updated = {
        ...existing,
        id: '1',
        typeValue: 'real-estate.type.apartment',
        images: [
          { estateId: '1', url: 'new.jpg', createdAt: new Date() },
        ],
        favoredBy: [],
      }

    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(existing)
    ;(prisma.realEstate.update as jest.Mock).mockResolvedValue(updated)

    const res = await request(app)
      .patch('/real-estates/update-estate')
      .send(payload)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', ERROR_MESSAGES.ESTATE_UPDATED)
    expect(res.body.estate).toHaveProperty('id', '1')
    expect(res.body.estate.images[0].url).toBe('new.jpg')
  })

  it('should return 200 with "nothing changed" if same data sent', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(existing)

    const res = await request(app)
      .patch('/real-estates/update-estate')
      .send({ id: '1', images: ['old.jpg'] })

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe(ERROR_MESSAGES.NOTHING_CHANGED)
  })

  it('should return 404 if estate not found', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app)
      .patch('/real-estates/update-estate')
      .send({ id: '1' })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', ERROR_MESSAGES.ESTATE_NOT_FOUND)
  })

  it('should return 400 if id is missing', async () => {
    const res = await request(app)
      .patch('/real-estates/update-estate')
      .send({})

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', ERROR_MESSAGES.MISSING_ESTATE_ID)
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(existing)
    ;(prisma.realEstate.update as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app)
      .patch('/real-estates/update-estate')
      .send({ id: '1', typeKey: 'apartment' })

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', ERROR_MESSAGES.SERVER_ERROR)
  })
})
