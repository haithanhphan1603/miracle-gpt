<template>
  <div ref="messagesElement" class="mx-2 flex-grow flex flex-col overflow-auto py-4">
    <template v-if="chatMode === ChatMode.NORMAL">
      <normal-chat :conversation="conversationWithoutSystem"></normal-chat>
    </template>
    <template v-else>
      <messenger-chat :conversation="conversationWithoutSystem"></messenger-chat>
    </template>
  </div>

  <div class="sticky bottom-0 w-full py-6 px-6 bg-indigo-500">
    <div class="flex">
      <input
        type="text"
        class="w-full p-2 border-2 border-gray-300 dark:bg-slate-800 dark:text-slate-200 text-slate-600 rounded-md focus:outline-none focus:border-slate-500"
        placeholder="Type your message here..."
        v-model="userMessage"
        @keydown.enter="sendMessage"
      />
      <button
        :disabled="isGenerating"
        @click="sendMessage"
        class="ml-2 bg-indigo-50 font-medium text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-50 dark:hover:bg-indigo-700 px-4 py-2 rounded-md"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { useMessageStore } from '../stores/message'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '../stores/setting'
import { ChatMode } from '../types/types'

import NormalChat from './NormalChat.vue'
import MessengerChat from './MessengerChat.vue'

const userMessage = ref('')
const isGenerating = ref(false)

const messageStore = useMessageStore()
const { conversation } = storeToRefs(messageStore)

const settingStore = useSettingStore()
const { chatMode } = storeToRefs(settingStore)

const messagesElement = ref<HTMLElement>()

const conversationWithoutSystem = computed(() =>
  conversation.value.filter((message) => message.role !== 'system')
)

function sendMessage() {
  if (!userMessage.value) return
  isGenerating.value = true
  messageStore.sendMessage({
    content: userMessage.value,
    role: 'user'
  })
  userMessage.value = ''
  isGenerating.value = false
}

function scrollBottom() {
  if (messagesElement.value) {
    messagesElement.value.scrollTop = messagesElement.value.scrollHeight
  }
}

onUpdated(() => {
  scrollBottom()
})
</script>
