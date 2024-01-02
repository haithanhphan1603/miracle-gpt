<template>
  <div
    class="h-screen w-screen flex justify-center items-center bg-gray-50"
    :class="{ 'flex-col': smallerThanLg }"
  >
    <chat-side-bar :class="smallerThanLg ? 'w-full' : 'h-full w-30'"></chat-side-bar>
    <div
      class="w-screen space-y-10 border-2 border-gray-300 flex flex-col justify-between h-full relative"
    >
      <chat-box class="overflow-auto"></chat-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatSideBar from '@/components/ChatSideBar.vue'
import ChatBox from '@/components/ChatBox.vue'
import { useCharacterStore } from '@/stores/character'
import { onMounted } from 'vue'
import useBreakpoints from '@/composables/use-breakpoints'

const { smallerThanLg } = useBreakpoints()

const characterStore = useCharacterStore()

onMounted(() => {
  characterStore.fetchCharacters()
})
</script>
