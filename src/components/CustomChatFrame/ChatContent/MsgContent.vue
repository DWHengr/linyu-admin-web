<template>
  <div>
    <Time v-if="msg.isShowTime" :value="formatTime(msg?.createTime)"/>
    <SystemMsg v-if="msg.type==='system'" :value="msg?.msgContent"/>
    <div v-if="chatInfo.type === 'group'&&msg.type!=='system'" :class="['flex',{'justify-end':isRight}]">
      <img v-if="!isRight" :src="msg?.msgContent?.formUserPortrait" class="portrait"/>
      <div class="m-[5px] ml-[5px] flex flex-col">
        <div class="flex font-[#969696] text-[12px] items-center"> {{ msg?.msgContent?.formUserName }}</div>
        <component :is="componentType" :value="msg" :right="isRight"/>
      </div>
      <img v-if="isRight" :src="msg?.msgContent?.formUserPortrait" class="portrait"/>
    </div>
    <component v-if="chatInfo.type === 'user'" :is="componentType" :value="msg" :right="isRight"/>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';
import FileContent from "@/components/CustomChatFrame/ChatContent/File.vue";
import Img from "@/components/CustomChatFrame/ChatContent/Img.vue";
import Retraction from "@/components/CustomChatFrame/ChatContent/Retraction.vue";
import Voice from "@/components/CustomChatFrame/ChatContent/Voice.vue";
import Call from "@/components/CustomChatFrame/ChatContent/Call.vue";
import Text from "@/components/CustomChatFrame/ChatContent/Text.vue";
import SystemMsg from "@/components/CustomChatFrame/ChatContent/SystemMsg.vue";
import Time from "@/components/CustomChatFrame/ChatContent/Time.vue";
import {formatTime} from "@/utils/data.js";

const props = defineProps({
  msg: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  chatInfo: {
    type: Object
  }
});
const isRight = computed(() => props.msg.fromId === props.userId);

const componentType = computed(() => {
  const type = props.msg.msgContent?.type;
  switch (type) {
    case "text":
      return Text;
    case "file":
      return FileContent;
    case "img":
      return Img;
    case "retraction":
      return Retraction;
    case "voice":
      return Voice;
    case "call":
      return Call;
    default:
      return null;
  }
});
</script>

<style scoped lang="less">
.portrait {
  width: 35px;
  height: 35px;
  border-radius: 35px;
}
</style>
