import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

const sampleText = 'Sample text to be sent'

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
