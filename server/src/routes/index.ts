import { Router } from 'express'
import { router as snippetsRouter } from './snippets'

export const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/snippets', snippetsRouter)
