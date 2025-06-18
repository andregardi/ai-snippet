import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasteYourContent from '.'

describe('PasteYourContent', () => {
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
    await userEvent.type(textarea, 'Test content')

    expect(textarea).toHaveValue('Test content')
  })
})
