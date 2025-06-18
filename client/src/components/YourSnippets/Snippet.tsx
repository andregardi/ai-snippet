import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface SnippetProps {
  snippet: {
    _id: string
    summary: string
    text: string
  }
}

export default function Snippet({ snippet }: SnippetProps) {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="snippet-content"
          id="snippet-header"
        >
          <Typography variant="h6">{snippet.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            {snippet.text}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
