import { render, screen, waitFor } from '@testing-library/react'
import YourSnippets from '.'
import useGetAllSnippets from '../../hooks/getAllSnippets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock the hook
jest.mock('../../hooks/getAllSnippets')

const mockUseGetAllSnippets = useGetAllSnippets as jest.Mock

const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('YourSnippets', () => {
  it('should show loading state', () => {
    mockUseGetAllSnippets.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null
    })

    render(<YourSnippets />, { wrapper: createWrapper() })
    expect(screen.getByText('Loading snippets...')).toBeInTheDocument()
  })

  it('should show error state', () => {
    const mockError = new Error('Failed to fetch')
    mockUseGetAllSnippets.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError
    })

    render(<YourSnippets />, { wrapper: createWrapper() })
    expect(screen.getByText(/Error loading snippets/)).toBeInTheDocument()
  })

  it('should show snippets when loaded', async () => {
    const mockSnippets = [
      { _id: '1', text: 'Sample 1', summary: 'Summary 1' },
      { _id: '2', text: 'Sample 2', summary: 'Summary 2' }
    ]

    mockUseGetAllSnippets.mockReturnValue({
      data: mockSnippets,
      isLoading: false,
      isError: false,
      error: null
    })

    render(<YourSnippets />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.queryByText('Loading snippets...')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Your Snippets')).toBeInTheDocument()
    expect(screen.getByText('Summary 1')).toBeInTheDocument()
    expect(screen.getByText('Summary 2')).toBeInTheDocument()
  })
})
