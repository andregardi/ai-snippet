import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PasteYourContent from '.'
import useCreateSnippet from '../../hooks/createSnippet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

// Mock the hook
jest.mock('../../hooks/createSnippet')

const mockUseCreateSnippet = useCreateSnippet as jest.Mock

const createWrapper = () => {
  const queryClient = new QueryClient()

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('PasteYourContent', () => {
  beforeEach(() => {
    mockUseCreateSnippet.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
      error: null
    })
  })

  it('renders correctly', () => {
    render(<PasteYourContent />, { wrapper: createWrapper() })

    expect(screen.getByText('Paste Your Content')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Paste your content here...')
    ).toBeInTheDocument()
    expect(screen.getByText('Save Snippet')).toBeInTheDocument()
  })

  it('updates text state when typing', () => {
    render(<PasteYourContent />, { wrapper: createWrapper() })

    const input = screen.getByPlaceholderText('Paste your content here...')
    fireEvent.change(input, { target: { value: 'Test content' } })

    expect(input).toHaveValue('Test content')
  })

  it('calls mutate when form is submitted', async () => {
    const mockMutate = jest.fn()
    mockUseCreateSnippet.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      error: null
    })

    render(<PasteYourContent />, { wrapper: createWrapper() })

    const input = screen.getByPlaceholderText('Paste your content here...')
    fireEvent.change(input, { target: { value: 'Test content' } })
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith('Test content')
    })
  })

  it('shows error message when there is an error', () => {
    mockUseCreateSnippet.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: true,
      error: new Error('Test error')
    })

    render(<PasteYourContent />, { wrapper: createWrapper() })

    expect(
      screen.getByText('Error saving snippet: Test error')
    ).toBeInTheDocument()
  })

  it('disables button when pending', () => {
    mockUseCreateSnippet.mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      isError: false,
      error: null
    })

    render(<PasteYourContent />, { wrapper: createWrapper() })

    expect(screen.getByText('Saving...')).toBeDisabled()
  })
})
