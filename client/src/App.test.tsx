import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

test('renders learn react link', () => {
  render(<App />, { wrapper })
})

test('should render Paste Your Content text', () => {
  const { getByText } = render(<App />, { wrapper })
  expect(getByText(/Paste Your Content/i)).toBeInTheDocument()
})

test('should render Your Snippets text', () => {
  const { getByText } = render(<App />, { wrapper })
  expect(getByText(/Your Snippets/i)).toBeInTheDocument()
})
