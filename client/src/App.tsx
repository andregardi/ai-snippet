import './App.css'
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography
} from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PasteYourContent from './components/PasteYourContent'
import YourSnippets from './components/YourSnippets'
import theme from './theme'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default'
          }}
        >
          <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                AI Snippet Manager
              </Typography>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <PasteYourContent />
              <YourSnippets />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
