import { useState } from 'react'
import createSnippet from '../../services/snippets/create'

type Snippet = {
  _id: string
  text: string
  summary: string
}

export default function useCreateSnippet() {
  const [data, setData] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const save = async (text: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createSnippet(text)
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return { save, data, loading, error }
}
