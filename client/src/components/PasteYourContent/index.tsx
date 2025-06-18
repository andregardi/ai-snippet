import { useState } from 'react'
import { Button, TextField, Typography, Box, Paper } from '@mui/material'
import useCreateSnippet from '../../hooks/createSnippet'

export default function PasteYourContent() {
  const [text, setText] = useState('')
  const { mutate, isPending, isError, error } = useCreateSnippet()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    mutate(text)
    setText('')
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box
        component="form"
        role="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5">Paste Your Content</Typography>
        <TextField
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here..."
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Snippet'}
        </Button>
        {isError && (
          <Typography color="error">
            Error saving snippet: {error?.message}
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
