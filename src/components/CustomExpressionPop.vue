<template>
  <div class="expression-pop">
    <div v-for="(emoji,index) in emojis"
         :key="index"
         class="expression"
         @click="emit('onComplete',emoji)"
    >
      {{ emoji }}
    </div>
  </div>
</template>
<script setup>
import {emojis} from "@/utils/emiji.js";
import {defineEmits} from 'vue'

const emit = defineEmits(["onComplete"])
</script>
<style lang="less" scoped>
.expression-pop {
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 4px 0 4px 4px;
  width: 300px;
  height: 200px;

  .expression {
    width: 24px;
    height: 24px;
    display: flex;
    user-select: none;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    margin: 2px;
    font-size: 20px;

    &:hover {
      border-radius: 2px;
      background-color: rgb(220, 234, 255);
    }
  }
}

</style>