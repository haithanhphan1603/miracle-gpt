<template>
  <form @submit.prevent="submit" class="mt-8 space-y-6 w-full">
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
          class="appearance-none relative block w-full px-3 py-4 border border-violet-300 placeholder-violet-500 text-violet-900 rounded-md round-de focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
          placeholder="Ask Mircale-GPT"
        />
        <button
          type="submit"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 group flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const question = ref('')

const emit = defineEmits(['submit'])

function submit() {
  chatStore.submitQuestion(question.value)
  question.value = ''
  emit('submit')
}
</script>

<style scoped></style>
