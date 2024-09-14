import { expect, describe, it } from 'bun:test'
import { Configuration, DefaultApi, ResponseError } from '@' // Adjust to your SDK path

describe('API Client Tests', () => {
  const apiKey = process.env.LUNAR_CRUSH_API_KEY

  if (!apiKey) throw new Error('Lunar Crush API key not found')

  // Set up the client with the API key
  const config = new Configuration({
    basePath: 'https://lunarcrush.com/api4',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  // Initialize the API client
  const apiClient = new DefaultApi(config)

  it('should fetch data successfully', async () => {
    try {
      // Use the API client to call a method
      const response = await apiClient.publicCoinsCoinV1Get({
        coin: '1',
      }) // Replace with the actual API method

      console.log('API response:', response)

      expect(response).toBeDefined()
    } catch (error) {
      const e = error as ResponseError
      console.log('Request URL:', e.response.url)
      console.error(await e.response.json())
      throw e
    }
  })
})
