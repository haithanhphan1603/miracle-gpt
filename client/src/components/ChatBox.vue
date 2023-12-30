<template>
  <div class="chat-wrapper">
    <div class="text-white flex items-center p-3 bg-indigo-500">
      <img
        class="w-12 rounded-full mr-2.5 h-12 border-white"
        src="https://www.thoughtco.com/thmb/GZD-Ax2jcBNV9bjQWIqU0toFTSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CharlesDarwin-5c2c3d7e46e0fb0001a343e3.jpg"
        alt="Avatar"
      />
      <h2 class="chat-name">Charles Darwin</h2>
    </div>
    <div class="overflow-auto pb-4 p-6" ref="messages">
      <div
        v-for="(message, index) in chatHistory.conversation"
        :key="index"
        class="flex items-start overflow-y-auto flex-col-reverse"
      >
        <div class="flex mt-4 items-center">
          <img
            class="w-12 rounded-full mr-2.5 h-12 border-white self-end flex-shrink-0 flex-grow-0"
            src="https://www.thoughtco.com/thmb/GZD-Ax2jcBNV9bjQWIqU0toFTSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CharlesDarwin-5c2c3d7e46e0fb0001a343e3.jpg"
            alt="Avatar"
          />
          <div
            v-if="isLoading && index === chatHistory.conversation.length - 1"
            class="bot-loading p-4 mt-4 rounded bg-gray-300 text-black text-left"
          >
            <div class="snippet py-2 px-4" data-title="dot-elastic">
              <div class="stage">
                <div class="dot-elastic"></div>
              </div>
            </div>
          </div>
          <div v-else class="bot-response p-4 rounded bg-gray-300 text-black text-left">
            {{ message.response.content }}
          </div>
        </div>

        <div class="user-message p-4 mt-4 rounded bg-indigo-500 text-white text-right">
          {{ message.question.content }}
        </div>
      </div>
    </div>
    <chat-input @submit="scrollBottom" class="chat-form p-6"></chat-input>
  </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue'

import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'
import { onUpdated, ref } from 'vue'

const chatStore = useChatStore()
const { chatHistory, isLoading } = storeToRefs(chatStore)

const messages = ref<HTMLElement>(null)

onUpdated(() => scrollBottom())

const scrollBottom = () => {
  if (messages.value) {
    messages.value.scrollTop = messages.value.scrollHeight
  }
}
</script>

<style scoped>
.chat-name {
  font-size: 18px;
  font-weight: bold;
}
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%; /* Set a height to make sure the flex container expands */
}

.chat-form {
  margin-top: auto;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url('https://www.thoughtco.com/thmb/GZD-Ax2jcBNV9bjQWIqU0toFTSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CharlesDarwin-5c2c3d7e46e0fb0001a343e3.jpg')
    no-repeat center center;
  background-size: cover;
  margin-right: 10px;
}

.user-message {
  align-self: flex-end;
  background-color: #4f46e5;
}

.bot-response {
  align-self: flex-start;
  background-color: #d1d5db;
}

.dot-elastic {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-elastic 1s infinite linear;
}
.dot-elastic::before,
.dot-elastic::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-elastic::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-elastic-before 1s infinite linear;
}
.dot-elastic::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-elastic-after 1s infinite linear;
}

@keyframes dot-elastic-before {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes dot-elastic {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes dot-elastic-after {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
