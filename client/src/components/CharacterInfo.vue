<template>
  <div v-if="currentCharacter" class="flex flex-col items-center">
    <img
      class="w-24 h-24 mt-10 rounded-full border-white"
      :src="currentCharacter.avatarImage"
      alt="Avatar"
    />
    <div class="px-8 text-center mt-3 mb-6">
      <h4 class="text-xl text-violet-900 font-bold">{{ currentCharacter.name }}</h4>
      <h5 class="font-semibold text-sm mt-1 text-violet-400">
        {{ currentCharacter.profession }}
      </h5>
    </div>

    <info-block
      title="Date of birth"
      :content="currentCharacter.dateOfBirth"
      icon="calendar"
    ></info-block>

    <info-block
      title="Gender"
      :content="currentCharacter.gender"
      icon="fa-solid fa-venus-mars"
    ></info-block>

    <info-block title="Description" :content="currentCharacter.description"></info-block>
  </div>
</template>

<script setup lang="ts">
import InfoBlock from './InfoBlock.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { currentCharacter } = storeToRefs(characterStore)
</script>

<style scoped></style>
