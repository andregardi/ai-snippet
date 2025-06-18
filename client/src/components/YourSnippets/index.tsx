import useGetAllSnippets from '../../hooks/getAllSnippets'
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Paper
} from '@mui/material'
import Snippet from './Snippet'

export default function YourSnippets() {
  const { data, isLoading, isError, error } = useGetAllSnippets()

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Snippets
      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading snippets...</Typography>
        </Box>
      )}

      {isError && (
        <Typography color="error" sx={{ my: 2 }}>
          Error loading snippets: {error?.message}
        </Typography>
      )}

      {data && (
        <List>
          {data.map((snippet, index) => (
            <Box key={snippet._id}>
              {index > 0 && <Divider sx={{ my: 2 }} />}
              <ListItem disableGutters sx={{ display: 'block', px: 0 }}>
                <Snippet snippet={snippet} />
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Paper>
  )
}
