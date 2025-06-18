import { render, screen } from '@testing-library/react'
import YourSnippets from '.'
import useGetAllSnippets from '../../hooks/getAllSnippets'

// Mock the hook
jest.mock('../../hooks/getAllSnippets')

const mockUseGetAllSnippets = useGetAllSnippets as jest.Mock

const mockSnippets = [
  { _id: '1', text: 'Sample text 1', summary: 'Summary 1' },
  { _id: '2', text: 'Sample text 2', summary: 'Summary 2' }
]

describe('YourSnippets', () => {
  test('should show loading state', () => {
    mockUseGetAllSnippets.mockReturnValue({
      loading: true,
      data: null,
      error: null
    })

    render(<YourSnippets />)
    expect(screen.getByText('Loading snippets...')).toBeInTheDocument()
  })

  test('should show error state', () => {
    mockUseGetAllSnippets.mockReturnValue({
      loading: false,
      data: null,
      error: new Error('Failed to load')
    })

    render(<YourSnippets />)
    expect(screen.getByText('Error loading snippets')).toBeInTheDocument()
  })

  test('should show snippets when loaded', () => {
    mockUseGetAllSnippets.mockReturnValue({
      loading: false,
      data: mockSnippets,
      error: null
    })

    const { getByText } = render(<YourSnippets />)
    expect(getByText('Your Snippets')).toBeInTheDocument()
    expect(getByText('Summary 1')).toBeInTheDocument()
    expect(getByText('Summary 2')).toBeInTheDocument()
  })
})
