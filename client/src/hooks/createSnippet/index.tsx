import { useMutation, useQueryClient } from '@tanstack/react-query'
import createSnippet from '../../services/snippets/create'

type Snippet = {
  _id: string
  text: string
  summary: string
}

export default function useCreateSnippet() {
  const queryClient = useQueryClient()

  return useMutation<Snippet, Error, string>({
    mutationFn: createSnippet,
    onSuccess: () => {
      // Invalidate the snippets query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
    }
  })
}
