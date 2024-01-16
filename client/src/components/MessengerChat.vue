<template>
  <div
    v-for="(message, index) of conversation"
    :key="index"
    class="group px-4 py-3 mt-3 flex justify-start rounded-lg"
    :class="{
      'justify-end ml-auto bg-blue-200': message.role === 'user',
      'justify-start mr-auto bg-gray-200': message.role === 'assistant'
    }"
  >
    <div
      class="inline-block text-sm leading-relaxed text-slate-600 dark:text-slate-400"
      v-if="message.content"
    >
      {{ message.content }}
    </div>
    <div v-else>
      <font-awesome-icon icon="fa-solid fa-spinner" spin />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types/types'

interface Props {
  conversation: Message[]
}

defineProps<Props>()
</script>

<style scoped></style>
