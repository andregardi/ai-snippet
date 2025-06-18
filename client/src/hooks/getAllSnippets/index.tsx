import { useQuery } from '@tanstack/react-query'
import getAllSnippets from '../../services/snippets/getAll'

type Snippet = {
  _id: string
  text: string
  summary: string
}

export default function useGetAllSnippets() {
  return useQuery<Snippet[], Error>({
    queryKey: ['snippets'],
    queryFn: getAllSnippets
  })
}
