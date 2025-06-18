import { useState } from 'react'
import { Box, Typography, TextField, Button, Paper } from '@mui/material'

export default function PasteYourContent() {
  const [content, setContent] = useState('')

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Paste Your Content
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your blog draft, transcript, or any text content here..."
        variant="outlined"
        margin="normal"
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('Saving:', content)}
        >
          Save Snippet
        </Button>
      </Box>
    </Paper>
  )
}
