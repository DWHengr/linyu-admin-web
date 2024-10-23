<template>
  <textarea ref="textareaRef" class="textarea" v-model="value" :placeholder="placeholder"></textarea>
</template>
<script setup>
import {defineProps, defineModel, ref, defineExpose} from 'vue';

const props = defineProps({
  placeholder: String
})
const textareaRef = ref(null)

const value = defineModel('value')

defineExpose({
  focus() {
    textareaRef.value?.focus()
  },
  getTextarea() {
    return textareaRef.value
  }
})
</script>
<style lang="less" scoped>
.textarea {
  border-radius: 2px;
  background-color: #F9FBFF;
  resize: none;
  width: 100%;
  min-height: 100%;
  outline: none;
  padding: 0 10px;
  font-size: 14px;

  &::placeholder {
    color: #7F7F7F;
  }
}
</style>