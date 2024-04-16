<template>
  <div
    v-for="(message, index) of conversation"
    :key="index"
    class="group flex flex-col px-4 py-3 rounded-lg dark:hover:bg-slate-900 hover:bg-slate-100"
  >
    <div class="flex justify-between items-center mb-2">
      <div class="font-bold">{{ message.role.toUpperCase() }}：</div>
      <button class="invisible group-hover:visible text-slate-400" @click="copy(message.content)">
        <font-awesome-icon v-if="copied" :icon="['far', 'circle-check']" />
        <font-awesome-icon v-else :icon="['far', 'copy']" />
      </button>
    </div>
    <div>
      <div
        class="text-sm leading-relaxed text-slate-600 dark:text-slate-400"
        v-if="message.content"
      >
        {{ message.content }}
      </div>
      <div v-else>
        <font-awesome-icon icon="fa-solid fa-spinner" spin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types/types'
import { useClipboard } from '@vueuse/core'

const { copy, copied } = useClipboard()

interface Props {
  conversation: Message[]
}
defineProps<Props>()
</script>

<style scoped></style>
