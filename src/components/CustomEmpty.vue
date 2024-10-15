<template>
  <div
      :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }"
  >
    <img data-tauri-drag-region :style="{ width: '130px', height: '80px' }" src="/empty.svg" alt="empty"/>
    <div data-tauri-drag-region :style="{ fontSize: '14px', marginBottom: '200px' }">
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
