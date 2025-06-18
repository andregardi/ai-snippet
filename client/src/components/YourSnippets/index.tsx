import useGetAllSnippets from '../../hooks/getAllSnippets'

export default function YourSnippets() {
  const { data, loading, error } = useGetAllSnippets()

  return (
    <div>
      <h2>Your Snippets</h2>
      {loading && <div>Loading snippets...</div>}
      {error && <div>Error loading snippets</div>}
      {data?.map((snippet) => (
        <div key={snippet._id}>
          <p>{snippet.summary}</p>
          <p>{snippet.text}</p>
        </div>
      ))}
    </div>
  )
}
