import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../../src/app'

const sampleText = 'Sample text to be sent'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Snippets routes', () => {
  describe('POST /', () => {
    it('Should return bad request when text is not provided', async () => {
      const response = await request(app).post('/snippets')

      expect(response.status).toBe(400)
    })

    it('Should return created when text is provided', async () => {
      const response = await request(app)
        .post('/snippets')
        .send({ text: sampleText })

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({
        text: sampleText,
        summary: expect.any(String)
      })
    })
  })

  describe('GET /', () => {
    it('should return Mocked response from GET /snippets', async () => {
      const response = await request(app).get('/snippets')

      expect(response.status).toBe(200)
      expect(response.text).toBe('Get to snippets')
    })
  })

  describe('Get /:id', () => {
    it('should return Mocked response from GET /snippets/:id', async () => {
      const response = await request(app).get('/snippets/abc-123')

      expect(response.status).toBe(200)
      expect(response.text).toBe('Get to snippets/abc-123')
    })
  })
})
