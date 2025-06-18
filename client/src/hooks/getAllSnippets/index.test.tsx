import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useGetAllSnippets from '.'
import getAllSnippets from '../../services/snippets/getAll'
import React from 'react'

// Mock the service
jest.mock('../../services/snippets/getAll')

type Snippet = {
  _id: string
  text: string
  summary: string
}

const mockSnippets: Snippet[] = [
  { _id: '1', text: 'Sample 1', summary: 'Summary 1' },
  { _id: '2', text: 'Sample 2', summary: 'Summary 2' }
]

describe('useGetAllSnippets', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    return wrapper
  }

  it('should return loading state initially', () => {
    ;(getAllSnippets as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    const { result } = renderHook(() => useGetAllSnippets(), {
      wrapper: createWrapper()
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should return data when successful', async () => {
    ;(getAllSnippets as jest.Mock).mockResolvedValue(mockSnippets)

    const { result } = renderHook(() => useGetAllSnippets(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(false)
      expect(result.current.data).toEqual(mockSnippets)
    })
  })

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch')
    ;(getAllSnippets as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetAllSnippets(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(mockError)
    })
  })
})
