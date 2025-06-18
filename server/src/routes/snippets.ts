import { Router, Request, Response } from 'express'
import { Snippet } from '../models/snippet'
import { summarizeWithOpenAI } from '../services/open-ai/open-ai'

export const router = Router()

router.post('/', async (req: Request, res: Response) => {
  if (!req.body?.text) {
    res.status(400).send('Text is required')
    return
  }

  const { output_text } = await summarizeWithOpenAI(req.body.text)
  console.log(output_text)

  const snippet = new Snippet({
    text: req.body.text,
    summary: output_text
  })

  await snippet.save()

  res.status(201).send(snippet)
})

router.get('/', async (req: Request, res: Response) => {
  const snippets = await Snippet.find({})
  res.send(snippets)
})

router.get('/:id', async (req: Request, res: Response) => {
  const snippet = await Snippet.findById(req.params.id)
  if (!snippet) {
    res.status(404).send('Snippet not found')
    return
  }
  res.send(snippet)
})
