import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).send({
    error: 'Internal Server Error',
    message: err.message
  })
}
