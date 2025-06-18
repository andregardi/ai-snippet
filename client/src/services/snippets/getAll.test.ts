import getAllSnippets from './getAll'

const mockSnippets = [
  {
    _id: '1',
    text: 'Sample text 1',
    summary: 'Summary 1'
  },
  {
    _id: '2',
    text: 'Sample text 2',
    summary: 'Summary 2'
  }
]

describe('getAllSnippets', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSnippets)
      })
    ) as jest.Mock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should fetch snippets from API', async () => {
    const result = await getAllSnippets()
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/snippets/')
    expect(result).toEqual(mockSnippets)
  })
})
