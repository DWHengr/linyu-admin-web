<template>
  <div class="chat-content-voice">
    <div :class="['content', right ? 'right' : '']">
      <CustomAudio
          v-if="info"
          :type="right ? '' : 'minor'"
          :key="retryNum"
          :audioUrl="info"
          :time="audioTime"
          @on-loaded-metadata="clearRetryInterval"
      />
      <div v-else style="min-height: 34px"></div>

      <div v-if="text" :class="['text', right ? 'right' : '']">
        {{ text }}
      </div>

      <div v-if="loading && !text" :class="['text', 'dots', right ? 'right' : '']">
        加载中...
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, onBeforeUnmount} from 'vue';
import MessageApi from "@/api/message.js";
import CustomAudio from "@/components/CustomAudio.vue";

const props = defineProps({
  value: Object,
  right: {
    type: Boolean,
    default: false
  }
});

const info = ref(null);
const infoRef = ref(null);
const fileInfo = ref(null);
const audioTime = ref(0);
const interval = ref(null);
const retryNum = ref(0);
const retryNumRef = ref(0);
const text = ref('');
const loading = ref(true);

const clearRetryInterval = () => {
  if (interval.value) clearInterval(interval.value);
};

const fetchMediaInfo = async () => {
  try {
    const response = await MessageApi.getMedia({msgId: props.value.id});
    infoRef.value = response?.data;
    info.value = response?.data;
  } catch (error) {
    console.error('Error fetching media:', error);
  }
};

onMounted(() => {
  loading.value = props.value.loading;
  fileInfo.value = JSON.parse(props.value.msgContent?.content || '{}');
  audioTime.value = fileInfo.value.time;
  text.value = fileInfo.value.text;

  fetchMediaInfo();

  clearRetryInterval();
  interval.value = setInterval(() => {
    if (retryNumRef.value > 60) {
      clearRetryInterval();
      return;
    }
    info.value = infoRef.value;
    retryNumRef.value += 1;
    retryNum.value = retryNumRef.value;
  }, 1000);
});

onBeforeUnmount(() => {
  clearRetryInterval();
});

watch(() => props.value, () => {
  loading.value = props.value.loading;
  fileInfo.value = JSON.parse(props.value.msgContent?.content || '{}');
  audioTime.value = fileInfo.value.time;
  text.value = fileInfo.value.text;

  fetchMediaInfo();
  retryNum.value = 0;
  retryNumRef.value = 0;
}, {immediate: true});
</script>

<style scoped>
.chat-content-voice {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  min-height: 34px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: right;
}

.text {
  font-size: 14px;
  border-radius: 5px;
  background-color: #FFF;
  margin-top: 1px;
  padding: 5px;
  max-width: 240px;
}

.text.right {
  background-color: var(--primary-color);
  color: #fff;
}

.content.right {
  color: #fff;
  margin-left: auto;
  align-items: end;
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
  border-top: 4px solid var(--primary-color);
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
</style>
