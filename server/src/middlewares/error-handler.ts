import { ErrorRequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).send({
    error: 'Internal Server Error',
    message: err.message
  })
}
