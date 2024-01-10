import { defineStore } from 'pinia'
import cryptoJS from 'crypto-js'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useApiStore = defineStore('api', () => {
  const secretKey = 'fan-highh'
  const apiKeyInStorage = useLocalStorage('apiKey', '')

  const apiKey = computed(() => {
    if (apiKeyInStorage.value === '') {
      alert('Your API Key is Invalid! Please check again.')
      return ''
    }
    const decryptedApiKey = cryptoJS.AES.decrypt(apiKeyInStorage.value, secretKey).toString(
      cryptoJS.enc.Utf8
    )
    return decryptedApiKey
  })

  const saveApiKey = (apiKey: string) => {
    if (apiKey.slice(0, 3) !== 'sk-' || apiKey.length !== 51) {
      alert('API Key Invalid! Please check again.')
      return false
    }
    const encryptedApiKey = cryptoJS.AES.encrypt(apiKey, secretKey).toString()
    localStorage.setItem('apiKey', encryptedApiKey)
  }
  return {
    saveApiKey,
    apiKey
  }
})
