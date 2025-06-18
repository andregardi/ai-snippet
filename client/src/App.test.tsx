import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
})

test('should render Content Summarizer title', () => {
  const { getByText } = render(<App />)
  expect(getByText(/Content Summarizer/i)).toBeInTheDocument()
})

test('should render Paste Your Content text', () => {
  const { getByText } = render(<App />)
  expect(getByText(/Paste Your Content/i)).toBeInTheDocument()
})

test('should render Your Snippets text', () => {
  const { getByText } = render(<App />)
  expect(getByText(/Your Snippets/i)).toBeInTheDocument()
})
