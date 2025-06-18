import express from 'express'
import { router } from './routes'
import { applyMiddlewares } from './middlewares/common'
import { connection } from './db'

export const app = express()
applyMiddlewares(app)
app.use(router)

const PORT = process.env.PORT || 3001

async function startServer() {
  await connection
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
