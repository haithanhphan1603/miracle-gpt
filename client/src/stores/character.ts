import { Chat } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface Character {
  name: string
  avatarImage: string
  prompt: string
  dateOfBirth: string
  chatHistory: Chat
  gender: Gender
  description: string
  profession: string
}

export const useCharacterStore = defineStore('characterStore', () => {
  const characters = ref<Character[]>([]) // Initialize with default value
  const currentCharacter = ref<Character | null>(null)

  async function fetchCharacters() {
    const response = await fetch('http://localhost:3000/characters')

    if (response.ok) {
      const data = await response.json()
      characters.value = data.map((character: Character) => ({
        ...character,
        chatHistory: { conversation: [] }
      }))
      currentCharacter.value = characters.value[0]
    } else {
      console.error('Failed to fetch characters')
    }
  }

  return { characters, currentCharacter, fetchCharacters }
})
