<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-10 rounded-lg border-2 border-gray-300 p-6">
      <chat-box></chat-box>
      <chat-form></chat-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue'
import ChatForm from '../components/ChatForm.vue'
</script>
