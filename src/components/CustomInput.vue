<template>
  <div>
    <input :type="props.type" class="custom-input" :placeholder="props.placeholder" v-model="value"/>
  </div>
</template>

<script setup>
import {defineProps, defineModel} from "vue";

const props = defineProps({
  placeholder: String,
  type: String
})
const value = defineModel('value')
</script>

<style scoped lang="less">
.custom-input {
  padding: 0 10px;
  height: 50px;
  width: 100%;
  border-radius: 5px;
  background-color: #F0F0F0;
  font-size: 18px;
  color: #8D8D8D;
  margin-top: 30px;
  display: flex;
  outline: none;
}
</style>