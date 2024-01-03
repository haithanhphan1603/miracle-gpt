<template>
  <div class="self-start flex justify-between border-t px-5 w-full py-3">
    <div>
      <p class="text-sm text-violet-950 font-semibold">{{ title }}</p>
      <p class="text-sm mt-1 font-medium text-violet-300">{{ content }}</p>
    </div>
    <div v-if-icon class="flex items-center justify-center">
      <font-awesome-icon class="text-violet-300" :icon="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  content: string
  icon?: string
}
defineProps<Props>()
</script>

<style scoped></style>
