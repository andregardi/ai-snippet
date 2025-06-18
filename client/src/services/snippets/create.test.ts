import createSnippet from './create'

describe('createSnippet', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            _id: '123',
            text: 'Test snippet',
            summary: 'Test summary'
          })
      })
    ) as jest.Mock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should make a POST request to /snippets/', async () => {
    const text = 'Test snippet'
    await createSnippet(text)

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/snippets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
  })

  it('should throw an error when the request fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    ) as jest.Mock

    await expect(createSnippet('Test snippet')).rejects.toThrow(
      'Failed to create snippet'
    )
  })
})
