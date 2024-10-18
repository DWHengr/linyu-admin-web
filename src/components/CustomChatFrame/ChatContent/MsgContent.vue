<template>
  <component :is="componentType" :value="msg" :right="isRight"/>
</template>

<script setup>
import {computed, defineProps} from 'vue';
import FileContent from "@/components/CustomChatFrame/ChatContent/File.vue";
import Img from "@/components/CustomChatFrame/ChatContent/Img.vue";
import Retraction from "@/components/CustomChatFrame/ChatContent/Retraction.vue";
import Voice from "@/components/CustomChatFrame/ChatContent/Voice.vue";
import Call from "@/components/CustomChatFrame/ChatContent/Call.vue";
import Text from "@/components/CustomChatFrame/ChatContent/Text.vue";

const props = defineProps({
  msg: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
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
