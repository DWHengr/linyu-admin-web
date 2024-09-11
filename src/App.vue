<script setup>
import {RouterView} from 'vue-router'
import ToastProvider from '@/components/ToastProvider.vue';
</script>

<template>
  <ToastProvider>
    <RouterView/>
  </ToastProvider>
</template>

<style scoped>
</style>
