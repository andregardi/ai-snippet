import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'
import useCreateSnippet from '.'
import createSnippet from '../../services/snippets/create'

// Mock the service
jest.mock('../../services/snippets/create')

type Snippet = {
  _id: string
  text: string
  summary: string
}

const mockSnippet: Snippet = { _id: '1', text: 'Sample', summary: 'Summary' }

describe('useCreateSnippet', () => {
  it('should have initial state', () => {
    const { result } = renderHook(() => useCreateSnippet())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.data).toBeNull()
    expect(typeof result.current.save).toBe('function')
  })

  it('should handle loading state during save', async () => {
    ;(createSnippet as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves to test loading
    )

    const { result } = renderHook(() => useCreateSnippet())

    await act(async () => {
      result.current.save('Test text')
    })

    expect(result.current.loading).toBe(true)

    // Clean up mock to avoid test warnings
    ;(createSnippet as jest.Mock).mockClear()
  })

  it('should return data when save is successful', async () => {
    ;(createSnippet as jest.Mock).mockResolvedValue(mockSnippet)

    const { result } = renderHook(() => useCreateSnippet())

    await act(async () => {
      result.current.save('Test text')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.data).toEqual(mockSnippet)
    })
  })

  it('should handle error state when save fails', async () => {
    const mockError = new Error('Failed to create')
    ;(createSnippet as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useCreateSnippet())

    await act(async () => {
      result.current.save('Test text')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual(mockError)
      expect(result.current.data).toBeNull()
    })
  })
})
