<template>
  <div class="custom-chat-frame">
    <div class="frame-top">
      <div class="flex items-center">
        <img
            alt=""
            :src="props.chatInfo.portrait"
            class="w-[45px] h-[45px] rounded-[45px] mr-[10px]"
        >
        <div class="font-[600]">{{ props.chatInfo.name }}</div>
      </div>
    </div>
    <div class="frame-show-msg" ref="messagesRef">
      <div v-for="(item) in messages" :key="item.id">
        <MsgContent :user-id="currentUserId" :msg="item" :chat-info="props.chatInfo"/>
      </div>
    </div>
    <div class="frame-content">
      <div class="flex">
        <CustomIconfontButton
            icon="iconfont icon-biaoqing"
            icon-style="font-size:22px"
            class="operate-icon"
            @click="handlerSetExpressPosition"
        />
        <CustomOverlay v-model:visible="isExpressionVisible" :position="expressionPosition">
          <CustomExpressionPop @on-complete="handlerAddEmoji"/>
        </CustomOverlay>
        <!--        <CustomIconfontButton-->
        <!--            icon="iconfont icon-wenjian"-->
        <!--            icon-style="font-size:24px"-->
        <!--            class="operate-icon"-->
        <!--        />-->
      </div>
      <div class="flex-1">
        <CustomTextarea ref="textareaRef" v-model:value="msgContent" placeholder="请输入聊天内容~"/>
      </div>
      <div class="w-full p-[10px]">
        <CustomButton class="ml-auto" @click="onSendMessage">发送</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import CustomButton from "@/components/CustomButton.vue";
import {defineProps, nextTick, onMounted, ref, watch, defineEmits, reactive, onUnmounted} from "vue";
import MessageApi from "@/api/message.js";
import MsgContent from "@/components/CustomChatFrame/ChatContent/MsgContent.vue";
import CustomTextarea from "@/components/CustomTextarea.vue";
import EventBus from "@/utils/eventBus.js";
import CustomPopover from "@/components/CustomPopover.vue";
import CustomExpressionPop from "@/components/CustomExpressionPop.vue";
import CustomOverlay from "@/components/CustomOverlay.vue";

let currentMsgRecordIndex = 0;
const messages = ref([]);
const messagesRef = ref(null);
const isLoading = ref(false);
const isComplete = ref(false);
const currentUserId = ref(sessionStorage.getItem('userId'));
const msgContent = ref('')
const isExpressionVisible = ref(false)
const expressionPosition = ref(null)
const textareaRef = ref(null)

const props = defineProps({
  chatInfo: Object,
});

const emit = defineEmits(['onSendMsg'])

onMounted(() => {
  EventBus.on('on-receive-msg', handlerReceiveMsg)
  if (messagesRef.value) {
    messagesRef.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  EventBus.off('on-receive-msg', handlerReceiveMsg)
})

const handlerReceiveMsg = (data) => {
  const currentFromUserId = props.chatInfo.fromId;
  if ((data.source === 'user' && currentFromUserId === data.fromId) ||
      (data.source === 'group' && currentFromUserId === data.toId)) {
    messages.value = [...messages.value, data]
    nextTick(() => scrollToBottom())
  }
}

const handlerAddEmoji = (emoji) => {
  const textarea = textareaRef.value.getTextarea()
  if (!textarea) return
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const before = msgContent.value.substring(0, start)
  const after = msgContent.value.substring(end)
  msgContent.value = before + emoji + after
  isExpressionVisible.value = false
  nextTick(() => {
    const newPosition = start + emoji.length
    textarea.setSelectionRange(newPosition, newPosition)
    textarea.focus()
  })
}

watch(() => props.chatInfo, () => {
  currentMsgRecordIndex = 0;
  messages.value = [];
  isComplete.value = false
  nextTick(() => onMessageRecord());
}, {immediate: true});

const scrollToBottom = () => {
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  }
};

const handlerSetExpressPosition = (e) => {
  const rect = e.target.getBoundingClientRect()
  expressionPosition.value = {top: -205, left: 5}
  isExpressionVisible.value = true
}

const onMessageRecord = () => {
  if (isLoading.value || isComplete.value) return;
  isLoading.value = true;

  const container = messagesRef.value;
  const scrollTopBeforeLoad = container ? container.scrollTop : 0;
  const scrollHeightBeforeLoad = container ? container.scrollHeight : 0;

  MessageApi.record({
    targetId: props.chatInfo.fromId,
    index: currentMsgRecordIndex,
    num: 20
  }).then(res => {
    if (res.code === 0) {
      const newMessages = res.data;
      if (newMessages.length > 0) {
        messages.value = [...newMessages, ...messages.value];
        currentMsgRecordIndex += newMessages.length;
        nextTick(() => {
          if (currentMsgRecordIndex === newMessages.length) {
            scrollToBottom();
          } else {
            requestAnimationFrame(() => {
              if (container) {
                const scrollHeightAfterLoad = container.scrollHeight;
                container.scrollTop = scrollTopBeforeLoad + (scrollHeightAfterLoad - scrollHeightBeforeLoad);
              }
            });
          }
        });
      } else {
        isComplete.value = true
      }
    }
  }).finally(() => {
    isLoading.value = false;
  });
};


const onSendMessage = () => {
  if (!msgContent.value) return
  let msg = {
    toUserId: props.chatInfo.fromId,
    source: props.chatInfo?.type,
    msgContent: {
      type: "text",
      content: msgContent.value
    }
  }
  MessageApi.sendMsg(msg).then(res => {
    if (res.code === 0) {
      if (res.data) {
        messages.value = [...messages.value, res.data];
        nextTick(() => scrollToBottom())
        msgContent.value = ''
        emit("onSendMsg")
      }
    }
  })
}

const handleScroll = () => {
  if (messagesRef.value) {
    if (messagesRef.value.scrollTop === 0 && !isLoading.value) {
      onMessageRecord();
    }
  }
};

</script>

<style lang="less" scoped>
.custom-chat-frame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .frame-top {
    width: 100%;
    min-height: 60px;
    flex-shrink: 0;
    padding: 0 10px;
    background-color: #F9FBFF;
    display: flex;
    align-items: center;
  }

  .frame-show-msg {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 10px;
  }

  .frame-content {
    width: 100%;
    background-color: #F9FBFF;
    min-height: 220px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;

    .operate-icon {
      background-color: transparent;
      margin: 2px;

      &:hover {
        background-color: #EDF2F9;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 10px;
  }
}
</style>