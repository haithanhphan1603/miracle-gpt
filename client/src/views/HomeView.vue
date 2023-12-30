<template>
  <chat-header class="w-full"></chat-header>
  <div
    class="h-screen flex flex-col items-center justify-between bg-gray-50 py-6 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-xl w-full space-y-10 rounded-lg border-2 border-gray-300 flex flex-col justify-between h-full relative"
    >
      <chat-box class="overflow-auto"></chat-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatHeader from '@/components/ChatHeader.vue'
import ChatBox from '@/components/ChatBox.vue'
import { useCharacterStore } from '@/stores/character'
import { onMounted } from 'vue'

const characterStore = useCharacterStore()

onMounted(() => {
  characterStore.fetchCharacters()
})
</script>
