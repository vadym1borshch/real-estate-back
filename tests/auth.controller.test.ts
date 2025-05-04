import request from 'supertest'
import app from '../src/app'
import { prisma } from '../src/prisma/client'
import bcrypt from 'bcrypt'

jest.mock('../src/prisma/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    messageThread: {
      create: jest.fn(),
    },
    verified: {
      findMany: jest.fn(),
    },
    agency: {
      findUnique: jest.fn(),
    },
    profession: {
      findUnique: jest.fn(),
    },
  },
}))

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(() => 'hashed-password'),
}))

describe('Auth Controller - Register & Login', () => {
  const testUser = {
    id: 'user-id-1',
    email: 'test@example.com',
    name: 'Test',
    lastName: 'User',
    phone: '1234567890',
    address: 'Test Address',
    password: 'hashed-password',
    agencyId: null,
    professionId: null,
    verifiedId: 'verified-1',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Register
  it('should register a new user successfully', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(prisma.user.create as jest.Mock).mockResolvedValue(testUser)
    ;(prisma.messageThread.create as jest.Mock).mockResolvedValue({})

    const res = await request(app).post('/auth/register').send({
      email: testUser.email,
      password: 'plaintext123',
      name: testUser.name,
      lastName: testUser.lastName,
      phone: testUser.phone,
      address: testUser.address,
    })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toMatchObject({ email: testUser.email })
  })

  it('should fail if user already exists', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser)

    const res = await request(app).post('/auth/register').send({
      email: testUser.email,
      password: 'plaintext123',
      name: testUser.name,
      lastName: testUser.lastName,
      phone: testUser.phone,
      address: testUser.address,
    })

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'User already exists')
  })

  it('should fail if required fields are missing', async () => {
    const res = await request(app).post('/auth/register').send({ email: '' })
    expect(res.statusCode).toBeGreaterThanOrEqual(400)
    expect(res.body).toHaveProperty('error')
  })

  // Login
  it('should login successfully with valid credentials', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
    ;(prisma.verified.findMany as jest.Mock).mockResolvedValue([{
      id: 'verified-1', title: 'Verified', value: true,
    }])
    ;(prisma.agency.findUnique as jest.Mock).mockResolvedValue(null)
    ;(prisma.profession.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).post('/auth/login').send({
      email: testUser.email,
      password: 'plaintext123',
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user).toMatchObject({ email: testUser.email })
  })

  it('should fail if user is not found', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app).post('/auth/login').send({
      email: 'wrong@example.com',
      password: 'irrelevant',
    })

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'User not found')
  })

  it('should fail if password is incorrect', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

    const res = await request(app).post('/auth/login').send({
      email: testUser.email,
      password: 'wrong-password',
    })

    expect(res.statusCode).toBe(401)
    expect(res.body).toHaveProperty('error', 'errors.login-failed')
  })
})