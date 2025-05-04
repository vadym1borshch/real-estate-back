import request from 'supertest'
import app from '../../src/app'

jest.mock('../../src/prisma/client', () => {
  const prismaMock = {
    realEstate: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    realEstateEquipments: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      updateMany: jest.fn(),
      create: jest.fn(),
    },
  }

  return { prisma: prismaMock }
})
import { prisma } from '../../src/prisma/client'
import { ERROR_MESSAGES } from '../../src/types/realEstate.types'

describe('PATCH /real-estates/update-estate-info', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update estate additional info and return updated estate', async () => {
    const payload = {
      id: '1',
      premises: [
        { key: 'living-space', value: '50' },
        { key: 'wc', value: '1' },
        { key: 'bathroom', value: '1' },
      ],
      equipments: [{ id: 1, key: 'eq-key', label: 'Equipment Label' }],
      fees: [{ key: 'fee-key', descriptions: 'per month', value: '100' }],
      monthlyCosts: [{ key: 'cost-key', descriptions: 'monthly', cost: '200' }],
    }

    const updatedEstate = {
        id: '1',
        images: [],
        premises: payload.premises,
        equipments: payload.equipments,
        fees: payload.fees,
        monthlyCosts: payload.monthlyCosts,
        favoredBy: [],
      }

    ;(prisma.realEstate.update as jest.Mock).mockResolvedValue(updatedEstate)
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue(updatedEstate)
    ;(prisma.realEstateEquipments.findMany as jest.Mock).mockResolvedValue([])

    const res = await request(app).patch('/real-estates/update-estate-info').send(payload)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', ERROR_MESSAGES.ESTATE_UPDATED)
    expect(res.body.estate).toHaveProperty('id', '1')
    expect(res.body.estate.premises).toHaveLength(3)
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.realEstate.update as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).patch('/real-estates/update-estate-info').send({ id: '1' })

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
