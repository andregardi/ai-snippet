import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act } from '@testing-library/react'
import useCreateSnippet from '.'
import createSnippet from '../../services/snippets/create'
import React from 'react'

// Mock the service
jest.mock('../../services/snippets/create')

type Snippet = {
  _id: string
  text: string
  summary: string
}

const mockSnippet: Snippet = {
  _id: '1',
  text: 'Test content',
  summary: 'Test summary'
}

describe('useCreateSnippet', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          retry: false
        }
      }
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    return wrapper
  }

  it('should return mutate function', () => {
    const { result } = renderHook(() => useCreateSnippet(), {
      wrapper: createWrapper()
    })

    expect(result.current.mutate).toBeDefined()
    expect(typeof result.current.mutate).toBe('function')
  })

  it('should handle successful mutation', async () => {
    ;(createSnippet as jest.Mock).mockResolvedValue(mockSnippet)

    const { result } = renderHook(() => useCreateSnippet(), {
      wrapper: createWrapper()
    })

    await act(async () => {
      result.current.mutate('Test content')
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual(mockSnippet)
    })
  })

  it('should handle error state', async () => {
    const mockError = new Error('Failed to create')
    ;(createSnippet as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useCreateSnippet(), {
      wrapper: createWrapper()
    })

    await act(async () => {
      result.current.mutate('Test content')
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(mockError)
    })
  })
})
