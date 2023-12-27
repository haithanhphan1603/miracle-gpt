import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Chat, ConversationItem } from '../types/types'

export const useChatStore = defineStore('chatStore', () => {
  const chatHistory = ref<Chat>({ conversation: [] }) // Initialize with default value
  const isLoading = ref(false)

  async function submitQuestion(question: string) {
    const userMessage = { content: question, time: new Date() }
    const conversationItem: ConversationItem = {
      question: userMessage,
      response: { content: '', time: new Date() } // Initialize with an empty response
    }
    chatHistory.value.conversation.push(conversationItem)

    isLoading.value = true

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
      conversationItem.response = botReply // Update the response when it's received
    } else {
      console.error('Failed to fetch bot reply')
    }
    isLoading.value = false
  }

  return { chatHistory, isLoading, submitQuestion }
})
