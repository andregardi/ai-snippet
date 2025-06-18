import { useState, useEffect } from 'react'
import getAllSnippets from '../../services/snippets/getAll'

type Snippet = {
  _id: string
  text: string
  summary: string
}

export default function useGetAllSnippets() {
  const [data, setData] = useState<Snippet[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSnippets()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
