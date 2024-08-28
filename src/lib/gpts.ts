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
        model: 'gpt-4o-mini	',
        messages: messageList
      })
    })

    if (!response.ok) {
      if (response.status === 429) {
        alert('You have exceeded your API quota. Please check your plan and billing details.')
        throw new Error(
          'You have exceeded your API quota. Please check your plan and billing details.'
        )
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch bot reply')
    throw error
  }
}
