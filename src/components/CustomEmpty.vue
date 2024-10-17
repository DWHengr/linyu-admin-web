<template>
  <div class="flex flex-col w-full h-full items-center justify-center">
    <img data-tauri-drag-region :style="{ width: '130px', height: '80px' }" src="/empty.svg" alt="empty"/>
    <div data-tauri-drag-region :style="{ fontSize: '14px' }">
      {{ placeholder }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索结果为空~'
  }
});
</script>

<style scoped>
</style>
