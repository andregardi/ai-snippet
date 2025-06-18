export default async function getAllSnippets() {
  const response = await fetch('http://localhost:3001/snippets/')
  if (!response.ok) throw new Error('Failed to fetch snippets')
  return response.json()
}
