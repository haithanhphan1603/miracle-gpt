<template>
  <header
    class="top-0 sticky w-full text-white text-center px-6 py-4 flex items-center justify-between ring-1 ring-slate-900/5 bg-indigo-500"
  >
    <div class="flex items-center">
      <h1 class="text-2xl font-bold">MiracleGPT</h1>
      <p class="text-sm pl-4">
        Natural language model artificial intelligence dialogue based on OpenAI
      </p>
    </div>

    <button @click="toggleDialog()">
      <font-awesome-icon :icon="['fas', 'gear']" />
    </button>
    <setting-dialog :show="showDialog" @close="toggleDialog"></setting-dialog>
  </header>
</template>

<script lang="ts" setup>
import SettingDialog from './SettingDialog.vue'

import { useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { useSettingStore } from '../stores/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
const { apiKey } = storeToRefs(settingStore)

const showDialog = ref(!apiKey.value)
const toggleDialog = useToggle(showDialog)
</script>
