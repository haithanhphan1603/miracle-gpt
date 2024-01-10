<template>
  <teleport to="body">
    <div v-if="show" @click="close" class="backdrop"></div>
    <transition name="dialog">
      <dialog
        open
        v-if="show"
        class="fixed w-3/4 sm:w-1/3 z-50 inset-0 flex items-center justify-center"
      >
        <div
          class="bg-white dark:bg-slate-700 dark:text-indigo-50 p-4 text-indigo-950 rounded-none shadow-lg w-full"
        >
          <header class="p-4">
            <h2 class="text-2xl font-bold">Settings</h2>
            <p class="pt-1">
              You can find your API key at
              <a
                class="underline"
                target="_blank"
                href="https://platform.openai.com/account/api-keys"
                >OpenAI API keys</a
              >
            </p>
          </header>
          <section class="p-4">
            <label class="block mb-2 font-medium">API Key</label>
            <input
              class="w-full p-2 border-2 border-gray-300 dark:bg-slate-800 dark:text-slate-200 text-slate-600 rounded-md focus:outline-none focus:border-slate-500"
              type="password"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
              v-model="apiKey"
              @keydown.enter="submit"
            />
            <span v-if="error" class="text-red-500">{{ error }}</span>

            <label class="block mb-2 mt-4 font-medium">Theme</label>
            <div class="flex">
              <button
                @click="toggleDark()"
                class="p-2 w-10 h-10 flex items-center justify-center border-2 rounded-full"
                :class="{ 'border-yellow-500': !isDark, 'bg-yellow-500 text-white': !isDark }"
              >
                <font-awesome-icon :icon="['far', 'sun']" />
              </button>
              <button
                @click="toggleDark()"
                class="p-2 ml-4 w-10 h-10 flex items-center justify-center border-2 rounded-full"
                :class="{ 'border-indigo-500': isDark, 'bg-indigo-500 text-white': isDark }"
              >
                <font-awesome-icon :icon="['far', 'moon']" />
              </button>
            </div>
          </section>
          <div v-if="!fixed" class="p-4">
            <button
              class="bg-indigo-700 w-full hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
              @click="submit"
            >
              SAVE
            </button>
          </div>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useApiStore } from '../stores/api'
import { useDark, useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'

interface Props {
  show: boolean
  title?: string
  fixed?: boolean
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const apiStore = useApiStore()
const { apiKey } = storeToRefs(apiStore)

const apiKeyInput = ref(apiKey.value)
const error = ref('')

const isDark = useDark()
const toggleDark = useToggle(isDark)

function submit() {
  if (apiKeyInput.value.slice(0, 3) !== 'sk-' || apiKeyInput.value.length !== 51) {
    error.value = 'Invalid API key. Please try again'
  } else {
    error.value = ''
    apiStore.saveApiKey(apiKeyInput.value)
    close()
  }
}

function close() {
  emit('close')
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
