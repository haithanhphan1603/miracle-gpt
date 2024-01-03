<template>
  <div
    class="h-screen w-screen flex justify-center items-center bg-gray-50"
    :class="{ 'flex-col': smallerThanLg }"
  >
    <chat-side-bar :class="smallerThanLg ? 'w-full' : 'h-full w-2/5'"></chat-side-bar>
    <div
      class="w-screen space-y-10 border-r border-gray-300 flex flex-col justify-between h-full relative"
    >
      <chat-box class="overflow-auto"></chat-box>
    </div>
    <character-info class="self-start bg-violet-50 h-full w-1/3"></character-info>
  </div>
</template>

<script setup lang="ts">
import ChatSideBar from '@/components/chat/ChatSideBar.vue'
import ChatBox from '@/components/chat/ChatBox.vue'
import CharacterInfo from '@/components/CharacterInfo.vue'

import { useCharacterStore } from '@/stores/character'
import { onMounted } from 'vue'
import useBreakpoints from '@/composables/use-breakpoints'

const { smallerThanLg } = useBreakpoints()

const characterStore = useCharacterStore()

onMounted(() => {
  characterStore.fetchCharacters()
})
</script>
