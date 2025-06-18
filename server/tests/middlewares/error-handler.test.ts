import { describe, it, expect } from 'vitest'
import express, { RequestHandler } from 'express'
import request from 'supertest'
import { errorHandler } from '../../src/middlewares/error-handler'

const testHandler: RequestHandler = () => {
  throw new Error('Test error')
}

describe('errorHandler middleware', () => {
  it('should handle errors and return 500 status', async () => {
    const app = express()

    app.get('/test', testHandler)
    app.use(errorHandler)

    const res = await request(app).get('/test')

    expect(res.status).toBe(500)
    expect(res.body).toMatchObject({
      error: 'Internal Server Error',
      message: 'Test error'
    })
  })
})
