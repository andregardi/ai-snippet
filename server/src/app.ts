import express from 'express'
import { router } from './routes'
import { applyMiddlewares } from './middlewares/common'

export const app = express()
applyMiddlewares(app)
app.use(router)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
