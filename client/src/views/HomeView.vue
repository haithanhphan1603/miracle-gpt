<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-10">
      <div class="p-4 rounded bg-indigo-500 text-white">{{ botResponse }}</div>
      <form @submit.prevent="submit" class="mt-8 space-y-6">
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
const question = ref('')
const botResponse = ref('Im willing to help')
async function submit() {
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: question.value })
  })

  if (response.ok) {
    const data = await response.json()
    botResponse.value = data.message.content
  } else {
    console.error('Failed to fetch answer')
  }
}
</script>
