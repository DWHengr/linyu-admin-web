<template>
  <div
      class="icon-button"
      :class="props.class"
      :style="props.style"
      @click="(e)=>$emit('click',e)"
  >
    <i
        class="iconfont flex justify-center items-center"
        style="font-size: 16px;min-width: 34px"
        :class="props.icon + ' ' + props.iconClass "
        :style="iconStyle"
    />
    <div v-if="props.label" class="mr-[12px]">{{ props.label }}</div>
  </div>
</template>
<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  icon: String,
  iconStyle: String,
  class: String,
  style: Object,
  iconClass: String,
  label: String,
})
defineEmits(["click"])
</script>
<style lang="less" scoped>
.icon-button {
  min-width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #FFFFFF;
  cursor: pointer;
  position: relative;
}
</style>