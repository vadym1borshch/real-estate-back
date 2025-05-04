import request from 'supertest'
import path from 'path'
import app from '../../src/app'

jest.mock('../../src/utils/cloudinary', () => ({
  uploadToCloudinary: jest.fn()
}))
import { uploadToCloudinary } from '../../src/utils/cloudinary'

jest.mock('../../src/prisma/client', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
    },
  }
}))
import { prisma } from '../../src/prisma/client'


jest.mock('fs/promises', () => ({
  readFile: jest.fn(() => Promise.resolve(Buffer.from('dummy')))
}))
jest.mock('crypto', () => {
  const actual = jest.requireActual('crypto')
  return {
    ...actual,
    createHash: () => ({
      update: () => ({
        digest: () => 'mockedhash123'
      })
    })
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('PATCH /user/update-photo', () => {
  const filePath = path.resolve(__dirname, '../__mocks__/test-image.jpg')

  it('should upload avatar and return updated user', async () => {
    const mockUser = { id: 'user1', name: 'John', photo: null }
    const updatedUser = { ...mockUser, photo: 'https://cdn.com/file.jpg?hash=mockedhash123' }

    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
    ;(prisma.user.findFirst as jest.Mock).mockResolvedValue(null)
    ;(uploadToCloudinary as jest.Mock).mockResolvedValue({ secure_url: 'https://cdn.com/file.jpg' })
    ;(prisma.user.update as jest.Mock).mockResolvedValue(updatedUser)

    const res = await request(app)
      .patch('/user/update-photo')
      .field('id', 'user1')
      .attach('file', filePath)

    expect(res.statusCode).toBe(200)
    expect(res.body.user).toEqual(updatedUser)
    expect(uploadToCloudinary).toHaveBeenCalledTimes(1)
  })

  it('should reuse existing photo if hash matches', async () => {
    const mockUser = { id: 'user1', name: 'John', photo: null }
    const otherUser = { id: 'user2', photo: 'https://cdn.com/same.jpg?hash=mockedhash123' }
    const updatedUser = { ...mockUser, photo: otherUser.photo }

    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
    ;(prisma.user.findFirst as jest.Mock).mockResolvedValue(otherUser)
    ;(prisma.user.update as jest.Mock).mockResolvedValue(updatedUser)

    const res = await request(app)
      .patch('/user/update-photo')
      .field('id', 'user1')
      .attach('file', filePath)

    expect(res.statusCode).toBe(200)
    expect(res.body.user.photo).toBe(otherUser.photo)
    expect(uploadToCloudinary).not.toHaveBeenCalled()
  })

  it('should return 400 if no file uploaded', async () => {
    const res = await request(app)
      .patch('/user/update-photo')
      .field('id', 'user1')

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'No file uploaded')
  })

  it('should return 404 if user not found', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const res = await request(app)
      .patch('/user/update-photo')
      .field('id', 'user1')
      .attach('file', filePath)

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'User not found')
  })

  it('should return 500 on error', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app)
      .patch('/user/update-photo')
      .field('id', 'user1')
      .attach('file', filePath)

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
