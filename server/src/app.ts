import express from 'express'
import { router } from './routes'

export const app = express()
app.use(router)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
