import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import PasteYourContent from '.'
import useCreateSnippet from '../../hooks/createSnippet'

// Mock the hook
jest.mock('../../hooks/createSnippet')

const mockUseCreateSnippet = useCreateSnippet as jest.MockedFunction<
  typeof useCreateSnippet
>

describe('PasteYourContent', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    mockUseCreateSnippet.mockReturnValue({
      save: jest.fn(),
      data: null,
      loading: false,
      error: null
    })
  })

  test('should render textarea with placeholder', () => {
    render(<PasteYourContent />)
    expect(
      screen.getByPlaceholderText(
        'Paste your blog draft, transcript, or any text content here...'
      )
    ).toBeInTheDocument()
  })

  test('should render Save Snippet button', () => {
    render(<PasteYourContent />)
    expect(
      screen.getByRole('button', { name: 'Save Snippet' })
    ).toBeInTheDocument()
  })

  test('should update text when typing', async () => {
    render(<PasteYourContent />)

    const textarea = screen.getByRole('textbox')
    await act(async () => {
      await userEvent.type(textarea, 'Test content')
    })

    expect(textarea).toHaveValue('Test content')
  })

  test('should call save when button is clicked', async () => {
    const mockSave = jest.fn()
    mockUseCreateSnippet.mockReturnValue({
      save: mockSave,
      data: null,
      loading: false,
      error: null
    })

    render(<PasteYourContent />)
    
    const textarea = screen.getByRole('textbox')
    await act(async () => {
      await userEvent.type(textarea, 'Test content')
    })
    
    const button = screen.getByRole('button', { name: 'Save Snippet' })
    await act(async () => {
      await userEvent.click(button)
    })

    expect(mockSave).toHaveBeenCalledWith('Test content')
  })

  test('should disable button when loading', () => {
    mockUseCreateSnippet.mockReturnValue({
      save: jest.fn(),
      data: null,
      loading: true,
      error: null
    })

    render(<PasteYourContent />)
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled()
  })

  test('should show error message when save fails', async () => {
    const error = new Error('Failed to save')
    mockUseCreateSnippet.mockReturnValue({
      save: jest.fn(),
      data: null,
      loading: false,
      error
    })

    render(<PasteYourContent />)
    expect(screen.getByText('Failed to save')).toBeInTheDocument()
  })

  test('should clear input after successful save', async () => {
    const mockSave = jest.fn().mockResolvedValue({})
    mockUseCreateSnippet.mockReturnValue({
      save: mockSave,
      data: { _id: '1', text: 'Saved', summary: 'Summary' },
      loading: false,
      error: null
    })

    const { rerender } = render(<PasteYourContent />)
    
    const textarea = screen.getByRole('textbox')
    await act(async () => {
      await userEvent.type(textarea, 'Test content')
    })
    
    const button = screen.getByRole('button', { name: 'Save Snippet' })
    await act(async () => {
      await userEvent.click(button)
    })

    // Simulate successful save by re-rendering with new hook state
    await act(async () => {
      rerender(<PasteYourContent />)
    })
    
    await waitFor(() => {
      expect(textarea).toHaveValue('')
    })
  })
})
