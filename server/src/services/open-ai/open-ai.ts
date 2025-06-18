import OpenAI from 'openai'
import { instructions } from './instructions'

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function summarizeWithOpenAI(
  userMessage: string,
  { client }: { client: OpenAI } = { client: openAIClient }
) {
  return await client.responses.create({
    model: 'gpt-4.1-nano',
    input: userMessage,
    instructions: instructions
  })
}
