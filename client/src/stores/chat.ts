import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useCharacterStore } from './character'

import { ConversationItem } from '../types/types'

export const useChatStore = defineStore('chatStore', () => {
  // Initialize with default value
  const isLoading = ref(false)

  const characterStore = useCharacterStore()
  const { currentCharacter } = storeToRefs(characterStore)

  async function submitQuestion(question: string) {
    const userMessage = { content: question, time: new Date() }
    const conversationItem: ConversationItem = {
      question: userMessage,
      response: { content: '', time: new Date() } // Initialize with an empty response
    }
    currentCharacter.value.chatHistory.conversation.push(conversationItem)

    isLoading.value = true

    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: question, characterName: currentCharacter.value?.name })
    })

    if (response.ok) {
      const data = await response.json()
      const botReply = { content: data.message, time: new Date() }
      conversationItem.response = botReply // Update the response when it's received
    } else {
      console.error('Failed to fetch bot reply')
    }
    isLoading.value = false
  }

  return { isLoading, submitQuestion }
})
