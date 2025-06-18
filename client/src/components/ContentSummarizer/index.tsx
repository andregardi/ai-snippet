import { Paper, Typography, Box } from '@mui/material'

export default function ContentSummarizer() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Content Summarizer
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Paste your raw text, blog drafts, or transcripts and get AI-powered
          summaries in seconds.
        </Typography>
      </Box>
    </Paper>
  )
}
