import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/prisma/client'

jest.mock('../src/prisma/client', () => ({
  prisma: {
    equipment: {
      findMany: jest.fn(),
    },
  },
}))

describe('Equipments Controller - getEquipments', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return grouped equipments', async () => {
    ;(prisma.equipment.findMany as jest.Mock).mockResolvedValue([
      {
        id: '1', label: 'Balcony', key: 'balcony', category: 'outlook', categoryTitle: 'Outlook',
      },
      {
        id: '2', label: 'Big Window', key: 'big-window', category: 'windows', categoryTitle: 'Windows',
      },
    ])

    const res = await request(app).get('/equipments')

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body.find((g: any) => g.key === 'outlook').data).toHaveLength(1)
    expect(res.body.find((g: any) => g.key === 'windows').data).toHaveLength(1)
  })

  it('should return all groups with empty data if equipment array is empty', async () => {
    ;(prisma.equipment.findMany as jest.Mock).mockResolvedValue([])

    const res = await request(app).get('/equipments')

    expect(res.statusCode).toBe(200)
    expect(res.body.every((group: any) => Array.isArray(group.data))).toBe(true)
  })

  it('should return 500 if prisma throws', async () => {
    ;(prisma.equipment.findMany as jest.Mock).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/equipments')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})