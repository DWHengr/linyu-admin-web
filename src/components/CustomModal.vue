<template>
  <Transition name="fade">
    <div v-if="props.isOpen" class="modal-overlay" @click="closeModal">
      <div @click.stop>
        <slot/>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["update:isOpen"])

const closeModal = () => {
  emit("update:isOpen", false);
}
</script>

<style lang="less" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1113;
  background-color: rgba(31, 31, 31, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>