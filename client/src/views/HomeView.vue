<template>
  <Suspense>
    <div class="flex flex-col h-screen dark:bg-slate-800 dark:text-white">
      <the-header></the-header>
      <chat-box></chat-box>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import ChatBox from '../components/ChatBox.vue'
</script>
