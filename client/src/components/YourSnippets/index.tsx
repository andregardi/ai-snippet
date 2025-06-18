import useGetAllSnippets from '../../hooks/getAllSnippets'
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  CircularProgress,
  Paper
} from '@mui/material'

export default function YourSnippets() {
  const { data, loading, error } = useGetAllSnippets()

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Snippets
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading snippets...</Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ my: 2 }}>
          Error loading snippets
        </Typography>
      )}

      {data && (
        <List>
          {data.map((snippet, index) => (
            <Box key={snippet._id}>
              {index > 0 && <Divider sx={{ my: 2 }} />}
              <ListItem disableGutters sx={{ display: 'block', px: 0 }}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {snippet.summary}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {snippet.text}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Paper>
  )
}
