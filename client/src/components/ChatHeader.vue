<template>
  <div class="flex items-center justify-center p-4 bg-gray-200">
    <div class="flex items-center space-x-4">
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

const characterStore = useCharacterStore()
const { characters, currentCharacter } = storeToRefs(characterStore)

function setCurrentCharacter(character: Character) {
  currentCharacter.value = character
}
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 100;
}
</style>
