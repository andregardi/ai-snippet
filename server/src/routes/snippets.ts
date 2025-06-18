import { Router } from 'express'

export const router = Router()

router.post('/', (req, res) => {
  res.send('Post to snippets')
})
