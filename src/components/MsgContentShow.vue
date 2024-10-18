<template>
  <template v-if="msgContent">
    <template v-if="msgContent.type === 'text'">
      {{ msgContent.content }}
    </template>
    <template v-else-if="msgContent.type === 'file'">
      [文件] {{ parseContent(msgContent.content).name }}
    </template>
    <template v-else-if="msgContent.type === 'img'">
      [图片]
    </template>
    <template v-else-if="msgContent.type === 'retraction'">
      [消息被撤回]
    </template>
    <template v-else-if="msgContent.type === 'voice'">
      <div>[语音] {{ parseContent(msgContent.content).time }}"</div>
    </template>
    <template v-else-if="msgContent.type === 'call'">
      <div>[通话] {{ getCallTime(parseContent(msgContent.content)) }}</div>
    </template>
    <template v-else-if="msgContent.type === 'system' || msgContent.type === 'quit'">
      [系统消息]
    </template>
  </template>
</template>

<script setup>
import {formatTimingTime} from "@/utils/data.js";

const props = defineProps({
  msgContent: {
    type: Object,
    required: true
  }
});

const parseContent = (content) => {
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse content:', e);
    return {};
  }
};

const getCallTime = (content) => {
  return content?.time > 0 ? formatTimingTime(content.time) : "未接通";
};
</script>