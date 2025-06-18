import { Router, Request, Response } from 'express'

export const router = Router()

router.post('/', (req: Request, res: Response) => {
  if (!req.body?.text) {
    res.status(400).send('Text is required')
    return
  }
  res.status(201).send('Snippet created')
})

router.get('/', (req: Request, res: Response) => {
  res.send('Get to snippets')
})

router.get('/:id', (req: Request, res: Response) => {
  res.send('Get to snippets/abc-123')
})
