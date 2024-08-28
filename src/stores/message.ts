import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { Message } from '../types/types'
import { useGpts } from '../lib/gpts'
import { useSettingStore } from './setting'

export const useMessageStore = defineStore('message', () => {
  const conversation = ref<Message[]>([
    {
      role: 'system',
      content:
        'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'
    },
    {
      content:
        "Hey there! Meet MiracleGPT, your brilliant friend in the digital realm. This clever conversationalist is powered by OpenAI's GPT-4.0, making it a wizard in understanding and generating natural language. It's your go-to buddy for all kinds of discussions—whether you're curious about facts, looking for creative inspiration, or just in the mood for a good chat. MiracleGPT is here to make our conversations smart, engaging, and maybe even a little bit fun. So, ready to dive into the world of information and banter with our digital sidekick? Let's get chatting!",
      role: 'assistant'
    }
  ])

  const settingStore = useSettingStore()
  const { apiKey, isChatDisable } = storeToRefs(settingStore)

  async function sendMessage(message: Message) {
    try {
      conversation.value.push(message)
      conversation.value.push({
        role: 'assistant',
        content: ''
      })
      const botResponse = await useGpts(conversation.value, apiKey.value)
      conversation.value[conversation.value.length - 1].content =
        botResponse.choices[0].message.content
    } catch (error) {
      console.error('Failed to send message', error)
      isChatDisable.value = true
    }
  }
  return {
    conversation,
    sendMessage
  }
})
