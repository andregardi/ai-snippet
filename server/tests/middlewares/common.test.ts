import { describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import { applyMiddlewares } from '../../src/middlewares/common'

type RequestHandler = express.RequestHandler

const testHandler: RequestHandler = (req, res) => {
  res.send('ok')
}

const jsonHandler: RequestHandler = (req, res) => {
  res.json(req.body)
}

describe('Common Middlewares', () => {
  let app: express.Express

  beforeEach(() => {
    app = express()
    applyMiddlewares(app)
  })

  it('should apply cors middleware', async () => {
    app.get('/test', testHandler)

    const res = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3000')

    expect(res.headers['access-control-allow-origin']).toBe(
      'http://localhost:3000'
    )
  })

  it('should apply helmet middleware', async () => {
    app.get('/test', testHandler)

    const res = await request(app).get('/test')

    // Helmet adds several security headers, we'll check for one
    expect(res.headers['x-dns-prefetch-control']).toBe('off')
  })

  it('should apply body-parser json middleware', async () => {
    app.post('/test', jsonHandler)

    const testData = { foo: 'bar' }
    const res = await request(app).post('/test').send(testData)

    expect(res.body).toEqual(testData)
  })
})
