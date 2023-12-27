<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-10 rounded-lg border-2 border-gray-300 p-6">
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
      <form @submit.prevent="chatStore.submitQuestion(question)" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="relative">
            <label for="question" class="sr-only">Ask Mircale-GPT</label>
            <input
              id="question"
              name="question"
              type="question"
              autocomplete="current-question"
              required
              v-model="question"
              class="appearance-none relative block w-full px-3 py-4 border border-indigo-300 placeholder-indigo-500 text-indigo-900 rounded-md round-de focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Ask Mircale-GPT"
            />
            <button
              type="submit"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 group flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '../stores/chat'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const question = ref('')
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
