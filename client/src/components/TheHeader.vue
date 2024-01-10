<template>
  <header
    class="top-0 fixed w-full text-white text-center px-6 py-4 flex items-center justify-between ring-1 ring-slate-900/5 bg-indigo-500"
  >
    <div class="flex items-center">
      <h1 class="text-2xl font-bold">Miracle GPT</h1>
      <p class="text-sm pl-4">
        Natural language model artificial intelligence dialogue based on OpenAI
      </p>
    </div>
    <button @click="toggleDark()">
      <font-awesome-icon v-if="isDark" :icon="['far', 'sun']" />
      <font-awesome-icon v-else :icon="['far', 'moon']" />
    </button>
  </header>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
