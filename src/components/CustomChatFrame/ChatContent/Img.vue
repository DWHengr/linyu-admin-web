<template>
  <div class="chat-content-img">
    <div :class="['content', right ? 'right' : '']">
      <div v-if="!isLoaded" class="loading-spinner"></div>
      <img
          v-if="imgInfo"
          :key="retryNum"
          :style="{ width: '100%', height: '100%', objectFit: 'cover', display: !isLoaded ? 'none' : '' }"
          :src="imgInfo"
          alt="加载失败"
          @load="onImageLoad"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import MessageApi from "@/api/message.js";

const props = defineProps({
  value: Object,
  right: {
    type: Boolean,
    default: false,
  },
});

const imgInfo = ref(null);
const fileInfo = ref(null);
const isLoaded = ref(false);
const retryNum = ref(0);
const retryNumRef = ref(0);
const interval = ref(null);

onMounted(() => {
  fileInfo.value = JSON.parse(props.value.msgContent?.content);
  MessageApi.getMedia({msgId: props.value.id}).then((res) => {
    imgInfo.value = res?.data;
  });

  if (interval.value) clearInterval(interval.value);
  interval.value = setInterval(() => {
    if (retryNumRef.value > 60) {
      clearInterval(interval.value);
      return;
    }
    retryNum.value = retryNumRef.value++;
  }, 1000);
});

const onImageLoad = () => {
  clearInterval(interval.value);
  isLoaded.value = true;
};

</script>

<style scoped>
.chat-content-img {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  height: 100px;
  min-height: 100px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}

.loading-spinner::after {
  content: " ";
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solidvar(--primary-color);;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.content {
  border-radius: 15px;
  color: #1F1F1F;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 15px;
  letter-spacing: 0.5px;
  max-width: 300px;
  vertical-align: top;
}

.content.right {
  color: #fff;
  margin-left: auto;
}
</style>
