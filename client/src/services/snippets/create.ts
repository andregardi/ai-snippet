export default async function createSnippet(text: string) {
  const response = await fetch('http://localhost:3001/snippets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })

  if (!response.ok) throw new Error('Failed to create snippet')
  return response.json()
}
