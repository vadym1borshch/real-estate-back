import request from 'supertest'
import path from 'path'
import app from '../src/app'

jest.mock('../src/utils/cloudinary', () => ({
  uploadToCloudinary: jest.fn()
}))
import { uploadToCloudinary } from '../src/utils/cloudinary'

jest.mock('fs/promises', () => ({
  readFile: jest.fn(() => Promise.resolve(Buffer.from('dummy')))
}))

jest.mock('crypto', () => {
  const actualCrypto = jest.requireActual('crypto')
  return {
    ...actualCrypto,
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

describe('POST /upload-images', () => {
  it('should upload files and return URLs', async () => {
    (uploadToCloudinary as jest.Mock).mockResolvedValue({
      secure_url: 'https://cdn.example.com/uploaded.jpg'
    })

    const res = await request(app)
      .post('/upload-images')
      .attach('images', path.resolve(__dirname, '__mocks__/test-image.jpg'))

    expect(res.statusCode).toBe(200)
    expect(res.body.urls).toHaveLength(1)
    expect(res.body.urls[0]).toBe('https://cdn.example.com/uploaded.jpg?hash=mockedhash123')
    expect(uploadToCloudinary).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if no files uploaded', async () => {
    const res = await request(app).post('/upload-images')

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'No files uploaded')
  })

  it('should return 500 on error', async () => {
    (uploadToCloudinary as jest.Mock).mockRejectedValue(new Error('fail'))

    const res = await request(app)
      .post('/upload-images')
      .attach('images', path.resolve(__dirname, '__mocks__/test-image.jpg'))

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
