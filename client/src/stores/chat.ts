import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Chat } from '../types/types'

export const useChatStore = defineStore('chatStore', () => {
  const chatHistory = ref<Chat>({ messages: [], responses: [] }) // Initialize with default value
  async function submitQuestion(question: string) {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: question })
    })

    if (response.ok) {
      const data = await response.json()
      const botReply = { content: data.message.content, time: new Date() }
      const userMessage = { content: question, time: new Date() }
      chatHistory.value.messages.push(userMessage)
      chatHistory.value.responses.push(botReply)
    } else {
      console.error('Failed to fetch bot reply')
    }
  }
  return { chatHistory, submitQuestion }
})
