<template>
  <div class="custom-search-input" :style="props.style" :class="props.class">
    <input
        v-model="value"
        :placeholder="props.placeholder"
        @keydown.enter="$emit('on-search')"
    >
    <div @click="$emit('on-search')" class="cursor-pointer">
      <i class="iconfont icon-sousuo mr-[10px] text-[var(--primary-color)]" style="font-size: 16px"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, defineModel} from 'vue';

const props = defineProps({
  placeholder: String,
  style: Object,
  class: String,
})
const value = defineModel('value')
defineEmits(["on-search"])
</script>

<style lang="less" scoped>
.custom-search-input {
  margin-top: 18px;
  margin-bottom: 18px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E3ECFF;
  border-radius: 10px;

  input {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 0 10px;
    border: none;
    outline: none;
    width: 100%;
    background-color: transparent;
  }

  input::placeholder {
    color: #4C9BFF
  }

}
</style>