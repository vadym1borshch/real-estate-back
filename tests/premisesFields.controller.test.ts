import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/prisma/client'

jest.mock('../src/prisma/client', () => {
  const mockPrisma = {
    realEstate: {
      findUnique: jest.fn(),
    },
    premisesField: {
      findMany: jest.fn(),
    },
  }
  return { prisma: mockPrisma }
})

describe('Premises Fields Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all fields if no estateId is provided', async () => {
    const mockFields = [
        { id: 1, key: 'cellar' },
        { id: 2, key: 'living-space' },
      ]
    ;(prisma.premisesField.findMany as jest.Mock).mockResolvedValue(mockFields)

    const res = await request(app).get('/premises-fields')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(mockFields)
  })

  it('should filter cellar if estate exists and cellar is false', async () => {
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue({ cellar: false })
    ;(prisma.premisesField.findMany as jest.Mock).mockResolvedValue([
      { id: 1, key: 'cellar' },
      { id: 2, key: 'living-space' },
    ])

    const res = await request(app).get('/premises-fields?estateId=1')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([{ id: 2, key: 'living-space' }])
  })

  it('should return all fields if estate has cellar', async () => {
    const mockFields = [
        { id: 1, key: 'cellar' },
        { id: 2, key: 'living-space' },
      ]
    ;(prisma.realEstate.findUnique as jest.Mock).mockResolvedValue({ cellar: true })
    ;(prisma.premisesField.findMany as jest.Mock).mockResolvedValue(mockFields)

    const res = await request(app).get('/premises-fields?estateId=1')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(mockFields)
  })

  it('should return 404 if no fields are found', async () => {
    ;(prisma.premisesField.findMany as jest.Mock).mockResolvedValue(null)

    const res = await request(app).get('/premises-fields')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'Fields not found')
  })

  it('should return 500 on server error', async () => {
    ;(prisma.premisesField.findMany as jest.Mock).mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/premises-fields')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})