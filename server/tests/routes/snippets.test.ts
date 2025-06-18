import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('Snippets routes', () => {
    describe('POST /', () => {
        it('should return Mocked response from POST /snippets', async () => {
            const response = await request(app).post('/snippets')

            expect(response.status).toBe(200)
            expect(response.text).toBe('Post to snippets')
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
