import { renderHook, waitFor } from '@testing-library/react'
import useGetAllSnippets from '.'
import getAllSnippets from '../../services/snippets/getAll'

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
  it('should handle loading state', async () => {
    ;(getAllSnippets as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves to test loading
    )

    const { result } = renderHook(() => useGetAllSnippets())
    expect(result.current.loading).toBe(true)
  })

  it('should return data when successful', async () => {
    ;(getAllSnippets as jest.Mock).mockResolvedValue(mockSnippets)

    const { result } = renderHook(() => useGetAllSnippets())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.data).toEqual(mockSnippets)
    })
  })

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch')
    ;(getAllSnippets as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetAllSnippets())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual(mockError)
      expect(result.current.data).toBeNull()
    })
  })
})
