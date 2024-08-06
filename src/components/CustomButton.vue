<template>
  <div class="custom-button" :class="props.class" :style="props.style">
    <slot/>
  </div>
</template>
<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  class: String,
  style: Object,
})
</script>
<style lang="less" scoped>
.custom-button {
  width: 70px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 5px;
  color: #FFFFFF;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(76, 155, 255, 0.8);
  }
}
</style>