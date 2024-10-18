<template>
  <div class="chat-content-call">
    <div :class="['content', right ? 'right' : '']">
      <i
          :class="`iconfont icon ${msgContent?.type === 'audio' ? 'icon-dianhua' : 'icon-shipin'}`"
          style="font-size: 20px; margin: 0 4px;"
      />
      <div>
        {{ msgContent?.time > 0 ? `通话时长 ${formatTimingTime(msgContent.time)}` : "通话未接通" }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {formatTimingTime} from "@/utils/data.js";

const props = defineProps({
  value: Object,
  right: {
    type: Boolean,
    default: false,
  },
});

const msgContent = ref(null);

onMounted(() => {
  msgContent.value = JSON.parse(props.value.msgContent?.content);
});

watch(
    () => props.value,
    (newValue) => {
      msgContent.value = JSON.parse(newValue.msgContent?.content);
    }
);
</script>

<style scoped>
.chat-content-call {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  height: 34px;
  min-height: 34px;
}

.content {
  background-color: #ffffff;
  width: 150px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  user-select: none;
}

.content.right {
  color: #FFFFFF;
  background-color: var(--primary-color);;
  margin-left: auto;
}
</style>
