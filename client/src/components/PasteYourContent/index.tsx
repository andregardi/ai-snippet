import { useState } from 'react'
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material'
import useCreateSnippet from '../../hooks/createSnippet'

export default function PasteYourContent() {
  const [content, setContent] = useState('')
  const { save, loading, error } = useCreateSnippet()

  const handleSave = async () => {
    if (!content.trim()) return

    try {
      await save(content)
      setContent('') // Clear input on successful save
    } catch (err) {
      // Error is already handled by the hook
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Paste Your Content
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}

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
          onClick={handleSave}
          disabled={loading || !content.trim()}
        >
          {loading ? 'Saving...' : 'Save Snippet'}
        </Button>
      </Box>
    </Paper>
  )
}
