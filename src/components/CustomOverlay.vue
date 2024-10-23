<template>
  <div v-if="visible" @mousedown.stop class="custom-overlay">
    <div ref="contentRef"
         class="content"
         :style="{
             top: position.top + 'px',
             left: position.left + 'px',
             outline: 'none'
           }"
         tabindex="0"
         @blur="handleBlur"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {nextTick, ref, watch} from 'vue'

const props = defineProps({
  position: Object,
  width: [Number, String],
})

const emit = defineEmits(['close'])
const visible = defineModel('visible')
const contentRef = ref(null)

watch(() => visible.value, () => {
  if (visible.value) {
    nextTick(() => {
      contentRef.value.focus()
    })
  }
})

const handleBlur = () => {
  visible.value = false
  emit('close')
}
</script>

<style lang="less" scoped>
.custom-overlay {

  .content {
    position: absolute;
    z-index: 1111;
  }
}
</style>