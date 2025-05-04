import request from 'supertest'
import app from '../src/app'

let mockFindUnique = jest.fn()

jest.mock('../src/prisma/client', () => ({
  prisma: {
    profession: {
      findUnique: (...args: any[]) => mockFindUnique(...args),
    },
  },
}))


describe('Professions Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return profession if found', async () => {
    const mockProfession = { id: '1', title: 'Engineer' }
    mockFindUnique.mockResolvedValue(mockProfession)

    const res = await request(app).get('/professions?id=1')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ profession: mockProfession })
  })

  it('should return 404 if profession not found', async () => {
    mockFindUnique.mockResolvedValue(null)

    const res = await request(app).get('/professions?id=1')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error', 'profession not found')
  })

  it('should return 400 if id is missing', async () => {
    const res = await request(app).get('/professions')

    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('error', 'Missing id in query')
  })

  it('should return 500 on DB error', async () => {
    mockFindUnique.mockRejectedValue(new Error('DB error'))

    const res = await request(app).get('/professions?id=1')

    expect(res.statusCode).toBe(500)
    expect(res.body).toHaveProperty('error', 'Server error')
  })
})
