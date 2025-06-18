import { describe, it, expect, vi, beforeEach } from 'vitest'
import OpenAI from 'openai'
import { summarizeWithOpenAI } from '../../src/services/open-ai/open-ai'
import { instructions } from '../../src/services/open-ai/instructions'

type MockOpenAIClient = {
  responses: {
    create: ReturnType<typeof vi.fn>
  }
}

describe('OpenAI Service', () => {
  let mockClient: MockOpenAIClient

  beforeEach(() => {
    mockClient = {
      responses: {
        create: vi.fn()
      }
    }
    vi.clearAllMocks()
  })

  it('should call OpenAI with correct parameters', async () => {
    const mockResponse = { data: 'test response' }
    mockClient.responses.create.mockImplementation(() =>
      Promise.resolve(mockResponse)
    )

    const result = await summarizeWithOpenAI('test message', {
      client: mockClient as unknown as OpenAI
    })

    expect(mockClient.responses.create).toHaveBeenCalledWith({
      model: 'gpt-4.1-nano',
      input: 'test message',
      instructions: instructions
    })
    expect(result).toEqual(mockResponse)
  })
})
