<template>
  <div class="flex flex-col bg-violet-800">
    <div class="flex" :class="smallerThanLg ? 'flex-row space-x-4' : 'flex-col '">
      <div
        v-for="character in characters"
        :key="character.name"
        class="relative flex flex-grow px-4 py-4 items-center group transition-colors duration-200 ease-in-out transition-padding hover:bg-violet-600 cursor-pointer"
        :class="{ 'bg-violet-700 ': character === currentCharacter }"
        @click="setCurrentCharacter(character)"
      >
        <img
          :src="character.avatarImage"
          alt="Character Avatar"
          class="h-14 w-14 rounded-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110"
        />
        <div class="pl-2 truncate w-1/2">
          <p class="font-bold text-md text-violet-200">{{ character.name }}</p>
          <p
            class="text-violet-50"
            v-if="
              character.chatHistory.conversation.length > 0 &&
              character.chatHistory.conversation[character.chatHistory.conversation.length - 1]
                .response.content
            "
          >
            {{
              character.chatHistory.conversation[character.chatHistory.conversation.length - 1]
                .response.content
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { Character } from '@/stores/character'
import useBreakpoints from '@/composables/use-breakpoints'

const characterStore = useCharacterStore()
const { characters, currentCharacter } = storeToRefs(characterStore)

const { smallerThanLg } = useBreakpoints()

function setCurrentCharacter(character: Character) {
  currentCharacter.value = character
}
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 100;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.group:hover .group-hover\:opacity-100 {
  opacity: 100;
}
</style>
