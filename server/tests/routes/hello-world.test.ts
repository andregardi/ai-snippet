import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('GET /', () => {
  it('should return hello world', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello World!')
  })
})
