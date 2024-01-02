<template>
  <div class="flex p-4 justify-center bg-indigo-300">
    <div
      class="flex items-center"
      :class="smallerThanLg ? 'flex-row space-x-4' : 'flex-col space-y-4'"
    >
      <div v-for="character in characters" :key="character.name" class="relative group">
        <img
          :src="character.avatarImage"
          alt="Character Avatar"
          class="h-14 w-14 rounded-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110"
          @click="setCurrentCharacter(character)"
        />
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
</style>
