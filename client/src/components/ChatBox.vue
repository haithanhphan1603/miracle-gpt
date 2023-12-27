<template>
  <div v-for="(message, index) in chatHistory.conversation" :key="index" class="chat-container">
    <div class="user-message p-4 mt-4 rounded bg-indigo-500 text-white text-right">
      {{ message.question.content }}
    </div>
    <div class="bot-response p-4 mt-4 rounded bg-gray-300 text-black text-left">
      {{ message.response.content }}
    </div>
    <div
      v-if="isLoading && index === chatHistory.conversation.length - 1"
      class="bot-loading p-4 mt-4 rounded bg-gray-300 text-black text-left"
    >
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()
const { chatHistory, isLoading } = storeToRefs(chatStore)
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-message {
  align-self: flex-end;
  background-color: #4f46e5;
}

.bot-response {
  align-self: flex-start;
  background-color: #d1d5db;
}
</style>
