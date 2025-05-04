import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/prisma/client'

jest.mock('../src/prisma/client', () => ({
  prisma: {
    feesField: {
      findMany: jest.fn(),
    },
  },
}))

describe('FeesFields Controller - getFeesFields', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return all fees fields', async () => {
    const fields = [
        { id: '1', label: 'Water', key: 'water' },
        { id: '2', label: 'Electricity', key: 'electricity' },
      ]
    ;(prisma.feesField.findMany as jest.Mock).mockResolvedValue(fields)

    const res = await request(app).get('/fees-fields')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(fields)
  })

  it('should return empty array if no fields exist', async () => {
    ;(prisma.feesField.findMany as jest.Mock).mockResolvedValue([])

    const res = await request(app).get('/fees-fields')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
  })

  it('should return 500 if db throws', async () => {
    ;(prisma.feesField.findMany as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).get('/fees-fields')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})