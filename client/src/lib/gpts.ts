import type { Message } from '../types/types'

export async function useGpts(messageList: Message[], apiKey: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messageList
      })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch bot reply')
    throw error
  }
}
