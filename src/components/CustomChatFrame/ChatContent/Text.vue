<template>
  <div class="chat-content-msg">
    <div :class="['content', right ? 'right' : '']">
      <span
          v-for="(part, index) in parts"
          :key="index"
          :style="isEmoji(part) ? emojiStyle : defaultStyle"
      >
        {{ part }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: Object,
  right: {
    type: Boolean,
    default: false
  }
});
const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])/;
const parts = props.value.msgContent?.content.split(emojiRegex);

const isEmoji = (part) => emojiRegex.test(part);

const emojiStyle = {
  fontSize: '20px',
  display: 'inline',
  verticalAlign: 'middle'
};

const defaultStyle = {
  display: 'inline',
  verticalAlign: 'middle'
};
</script>

<style scoped>
.chat-content-msg {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  min-height: 40px;
}

.content {
  border-radius: 15px;
  color: #1F1F1F;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 15px;
  background-color: #ffffff;
  letter-spacing: 0.5px;
  max-width: 300px;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  display: flex;
}

.content.right {
  color: #fff;
  background-color: var(--primary-color);
  margin-left: auto;
}
</style>
