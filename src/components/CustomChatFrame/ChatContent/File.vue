<template>
  <div class="chat-content-file">
    <div
        :class="['content', right ? 'right' : 'left']"
    >
      <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
        <div>
          <div class="ellipsis" style="width: 140px;">
            {{ fileInfo?.name }}
          </div>
          <div style="font-size: 10px;">
            {{ formatSize(fileInfo?.size) }}
          </div>
        </div>
        <div style="width: 60px; height: 60px; display: flex; justify-content: center; align-items: center;">
          <img
              v-if="right"
              style="height: 50px;"
              src="/file-upload.png"
              alt=""
          />
          <img
              v-else
              style="height: 50px;"
              src="/file-download.png"
              alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';

const props = defineProps({
  value: Object,
  right: {
    type: Boolean,
    default: false,
  },
});

const fileInfo = ref(JSON.parse(props.value.msgContent?.content));

function formatSize(size) {
  if (size < 1024) {
    return size + ' B';
  }
  const units = ['KB', 'MB', 'GB', 'TB'];
  let i = -1;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return size.toFixed(1) + ' ' + units[i];
}
</script>

<style scoped>
.chat-content-file {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  height: 76px;
  max-height: 76px;
  min-height: 76px;
}

.content {
  border-radius: 15px;
  color: #1f1f1f;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 15px;
  background-color: #ffffff;
  letter-spacing: 0.5px;
  vertical-align: top;
  cursor: pointer;
}

.content.left {
  margin-right: auto;
}

.content.right {
  color: #fff;
  background-color: var(--primary-color);;
  margin-left: auto;
}
</style>
