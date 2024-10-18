<template>
  <div class="chat-content-system-msg">
    <div class="content">
      <span v-for="(msg, index) in systemMsgList" :key="index">
        <span v-if="msg.isEmphasize" :style="emphasizeStyle">
          {{ msg.content }}
        </span>
        <span v-else>
          {{ msg.content }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  value: Object
});

const systemMsgList = ref([]);

const emphasizeStyle = {
  color: '#4C9BFF',
  fontWeight: 600
};

watch(
    () => props.value,
    (newValue) => {
      systemMsgList.value = JSON.parse(newValue.content || '[]');
    },
    {immediate: true}
);
</script>

<style scoped>
.chat-content-system-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-bottom: 10px;
  height: 20px;
  min-height: 20px;
}

.content {
  border-radius: 2px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  line-height: 10px;
}
</style>
