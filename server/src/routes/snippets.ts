import { Router } from 'express'

export const router = Router()

router.post('/', (req, res) => {
  res.send('Post to snippets')
})

router.get('/', (req, res) => {
  res.send('Get to snippets')
})

router.get('/:id', (req, res) => {
  res.send('Get to snippets/abc-123')
})
