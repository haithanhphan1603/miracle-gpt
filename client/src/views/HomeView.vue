<template>
  <div class="flex flex-col h-screen" :class="{ 'bg-slate-800 text-white': isDark }">
    <the-header></the-header>
    <chat-box></chat-box>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import ChatBox from '../components/ChatBox.vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
