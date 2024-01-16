<template>
  <div ref="messagesElement" class="mx-2 flex-grow overflow-auto py-4">
    <template v-if="chatMode === ChatMode.NORMAL">
      <div
        v-for="(message, index) of conversationWithoutSystem"
        :key="index"
        class="group flex flex-col px-4 py-3 rounded-lg dark:hover:bg-slate-900 hover:bg-slate-100"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="font-bold">{{ message.role.toUpperCase() }}：</div>
          <button
            class="invisible group-hover:visible text-slate-400"
            @click="copy(message.content)"
          >
            <font-awesome-icon v-if="copied" :icon="['far', 'circle-check']" />
            <font-awesome-icon v-else :icon="['far', 'copy']" />
          </button>
        </div>
        <div>
          <div
            class="text-sm leading-relaxed text-slate-600 dark:text-slate-400"
            v-if="message.content"
          >
            {{ message.content }}
          </div>
          <div v-else>
            <font-awesome-icon icon="fa-solid fa-spinner" spin />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        v-for="(message, index) of conversationWithoutSystem"
        :key="index"
        class="group flex flex-col px-4 py-3 rounded-lg"
        :class="{
          'text-right ml-auto bg-blue-200': message.role === 'user',
          'text-left mr-auto bg-gray-200': message.role === 'assistant'
        }"
      >
        <div
          class="text-sm leading-relaxed text-slate-600 dark:text-slate-400"
          v-if="message.content"
        >
          {{ message.content }}
        </div>
        <div v-else>
          <font-awesome-icon icon="fa-solid fa-spinner" spin />
        </div>
      </div>
    </template>
  </div>

  <div class="sticky bottom-0 w-full py-6 px-6 bg-indigo-500">
    <div class="flex">
      <input
        type="text"
        class="w-full p-2 border-2 border-gray-300 dark:bg-slate-800 dark:text-slate-200 text-slate-600 rounded-md focus:outline-none focus:border-slate-500"
        placeholder="Type your message here..."
        v-model="userMessage"
        @keydown.enter="sendMessage"
      />
      <button
        :disabled="isGenerating"
        @click="sendMessage"
        class="ml-2 bg-indigo-50 font-medium text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-50 dark:hover:bg-indigo-700 px-4 py-2 rounded-md"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useMessageStore } from '../stores/message'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '../stores/setting'
import { ChatMode } from '../types/types'

const { copy, copied } = useClipboard()

const userMessage = ref('')
const isGenerating = ref(false)

const messageStore = useMessageStore()
const { conversation } = storeToRefs(messageStore)

const settingStore = useSettingStore()
const { chatMode } = storeToRefs(settingStore)

const messagesElement = ref<HTMLElement>()

const conversationWithoutSystem = computed(() =>
  conversation.value.filter((message) => message.role !== 'system')
)

function sendMessage() {
  if (!userMessage.value) return
  isGenerating.value = true
  messageStore.sendMessage({
    content: userMessage.value,
    role: 'user'
  })
  userMessage.value = ''
  isGenerating.value = false
}

function scrollBottom() {
  if (messagesElement.value) {
    messagesElement.value.scrollTop = messagesElement.value.scrollHeight
  }
}

onUpdated(() => {
  scrollBottom()
})
</script>
