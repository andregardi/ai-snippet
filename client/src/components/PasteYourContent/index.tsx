import { useState } from 'react'

export default function PasteYourContent() {
  const [content, setContent] = useState('')

  return (
    <div>
      <h2>Paste Your Content</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your blog draft, transcript, or any text content here..."
      />
      <button onClick={() => console.log('Saving:', content)}>
        Save Snippet
      </button>
    </div>
  )
}
