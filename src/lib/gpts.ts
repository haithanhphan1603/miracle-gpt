import type { Message } from '../types/types'
import OpenAI from 'openai'

export async function useGpts(messageList: Message[], apiKey: string) {
  try {
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messageList
    })
    return completion.choices[0].message
  } catch (error) {
    console.error('Failed to fetch bot reply')
    alert(`Error : ${error}`)
    throw error
  }
}
