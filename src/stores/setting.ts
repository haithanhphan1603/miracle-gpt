import { defineStore } from 'pinia'
import cryptoJS from 'crypto-js'
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { ChatMode } from '../types/types'

export const useSettingStore = defineStore('setting', () => {
  const apiKeyInStorage = useLocalStorage('apiKey', '')
  const isChatDisable = ref(apiKeyInStorage.value === '')
  const secretKey = import.meta.env.VITE_SECRET_KEY

  const chatMode = useLocalStorage('chatMode', ChatMode.NORMAL)

  const apiKey = computed(() => {
    const decryptedApiKey = cryptoJS.AES.decrypt(apiKeyInStorage.value, secretKey).toString(
      cryptoJS.enc.Utf8
    )
    return decryptedApiKey
  })

  const changeChatMode = (mode: ChatMode) => {
    chatMode.value = mode
  }

  const saveApiKey = (apiKey: string) => {
    const encryptedApiKey = cryptoJS.AES.encrypt(apiKey, secretKey).toString()
    localStorage.setItem('apiKey', encryptedApiKey)
  }
  return {
    isChatDisable,
    saveApiKey,
    apiKey,
    changeChatMode,
    chatMode
  }
})
