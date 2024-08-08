<template>
  <Transition name="fade">
    <div v-if="isVisible" class="chat-overlay" @click.prevent="closeChat">
      <CustomChatList @click.stop @close="closeChat"/>
    </div>
  </Transition>
</template>

<script setup>
import {inject} from 'vue';
import CustomChatList from "@/components/CustomChatList.vue";

const {isVisible, chatData, closeChat} = inject('chatStore');
</script>

<style scoped>
.chat-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>