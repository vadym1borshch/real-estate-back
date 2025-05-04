import { ERROR_MESSAGES } from '../../src/types/realEstate.types'

const prismaMock = {
  realEstate: {
    create: jest.fn(),
  },
}

jest.mock('../../src/prisma/client', () => ({
  prisma: prismaMock,
}))

import { prisma } from '../../src/prisma/client'
import request from 'supertest'
import app from '../../src/app'


describe('POST /real-estates', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a real estate and return it', async () => {
    const payload = {
      userId: 'user1',
      images: ['img1.jpg'],
      bathroomsTotal: 1,
      permittedRentForm: true,
      typeKey: 'apartment',
      yearBuilt: '2000',
      label: 'Cozy Apartment',
      cellar: 'no',
      postCode: '12345',
      visibleDetailedAddress: 'yes',
      city: 'TestCity',
      addressLat: '49.0',
      addressLng: '24.0',
      rooms: '2',
      livingAreaM2: '45',
      landAreaM2: '60',
      price: 50000,
    }

    const mockCreated = {
        ...payload,
        id: 1,
        images: [{ estateId: 1, url: 'img1.jpg', createdAt: new Date() }],
        favoredBy: [],
      }

    ;(prisma.realEstate.create as jest.Mock).mockResolvedValue(mockCreated)

    const res = await request(app).post('/real-estates').send(payload)

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('message', ERROR_MESSAGES.ESTATE_CREATED)
    expect(res.body.estate.id).toBe('1')
  })

  it('should return 500 on DB error', async () => {
    ;(prisma.realEstate.create as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app).post('/real-estates').send({})

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})