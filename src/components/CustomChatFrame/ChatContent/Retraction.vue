<template>
  <div class="chat-content-retraction">
    <div>{{ right ? "你" : "对方" }}撤回了一条消息</div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: Object,
  right: {
    type: Boolean,
    default: false
  },
  onReedit: Function
});
</script>

<style scoped>
.chat-content-retraction {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #969696;
  user-select: none;
  height: 20px;
  min-height: 20px;
}
</style>
