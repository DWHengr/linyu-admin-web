<template>
  <div class="custom-chat-list">
    <div class="absolute h-[60px] flex items-center right-[10px]">
      <CustomIconfontButton
          icon="iconfont icon-guanbi"
          icon-style="font-size:24px"
          class="close-icon"
          @click="$emit('close')"
      />
    </div>
    <div class="chat-list">
      <div class="h-[60px] text-[28px] leading-[28px] flex items-center font-[600]">聊天列表</div>
      <CustomSearchInput placeholder="搜索" style="margin-bottom: 15px;margin-top: 0"/>
      <div class="flex-1 flex flex-col overflow-y-scroll pr-[5px]">
        <div v-for="item in userChatListData"
             class="chat-card"
             :class="item.id === selectedUser?.id?'selected':''"
             :key="item.id"
             @click="selectedUser=item"
        >
          <img
              alt=""
              :src="item.portrait"
              class="w-[40px] h-[40px] rounded-[40px] mr-[10px]"
          >
          <div class="flex h-[45px] w-full flex-1 justify-between flex-col py-[2px]">
            <div class="flex w-full justify-between items-center flex-shrink-0">
              <div
                  class="w-[85px] text-ellipsis overflow-hidden whitespace-nowrap text-[14px] leading-[14px]"
                  :class="item.id === selectedUser?.id?'text-[#FFF]':'text-[#1F1F1F]'"
              >
                {{ item.name }}
              </div>
              <div
                  class="text-[10px] leading-[16px] flex-shrink-0"
                  :class="item.id === selectedUser?.id?'text-[#FFF]':'text-[#1F1F1F]'"
              >
                {{ formatTime(item.updateTime) }}
              </div>
            </div>
            <div class="flex h-[16px] w-full justify-between items-center flex-shrink-0">
              <div
                  class="text-[12px] leading-[12px]"
                  :class="item.id === selectedUser?.id?'text-[#FFF]':'text-[#1F1F1F]'"
              >
                <MsgContentShow :msg-content="item.lastMsgContent"/>
              </div>
              <div
                  v-if="item.id !== selectedUser?.id&&item.unreadNum>0"
                  class="text-[10px] leading-[12px] w-[20px] h-[20px] rounded-[20px] flex justify-center items-center bg-[var(--primary-color)] text-[#FFF]"
              >
                {{ item.unreadNum }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <CustomChatFrame v-if="selectedUser" :user-info="selectedUser" @on-send-msg="onChatList"/>
      <CustomEmptyBg v-if="!selectedUser"/>
    </div>
  </div>
</template>
<script setup>

import CustomSearchInput from "@/components/CustomSearchInput.vue";
import {ref, defineEmits, onMounted, nextTick, watch} from "vue";
import CustomChatFrame from "@/components/CustomChatFrame/CustomChatFrame.vue";
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import ChatListApi from "@/api/chatList.js";
import MsgContentShow from "@/components/MsgContentShow.vue";
import {formatTime} from "@/utils/data.js";
import CustomEmptyBg from "@/components/CustomEmptyBg.vue";
import EventBus from "@/utils/eventBus.js";

defineEmits(["close"])

const selectedUser = ref(null)
const userChatListData = ref([])

onMounted(() => {
  onChatList()
  handlerReceiveMsg()
})

const onChatList = () => {
  ChatListApi.chatList().then(res => {
    if (res.code === 0) {
      userChatListData.value = [...res.data?.tops, ...res.data.others]
    }
  })
}

const handlerReceiveMsg = () => {
  EventBus.on('on-receive-msg', async (data) => {
    if (selectedUser.value.fromId === data.fromId || (data.source === 'group' && selectedUser.value.fromId === data.toId)) {
      onRead()
    } else {
      onChatList()
    }
  });
}

const onRead = () => {
  ChatListApi.read(selectedUser.value.fromId).then(res => {
    if (res.code === 0) {
      onChatList()
    }
  })
}

watch(selectedUser, () => {
  onRead()
})

</script>
<style lang="less" scoped>
.custom-chat-list {
  width: 980px;
  height: 720px;
  background-color: #EDF2F9;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  .close-icon {
    background-color: transparent;

    &:hover {
      color: #FFFFFF;
      background: #ff4c4c;
    }
  }

  .chat-list {
    height: 100%;
    padding: 0 10px 10px 10px;
    width: 320px;
    background-color: #F9FBFF;
    border-radius: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid #E1E0E0;
    flex-shrink: 0;

    .chat-card {
      width: 100%;
      height: 60px;
      border-radius: 10px;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      padding: 0 10px;
      margin-bottom: 5px;
      flex-shrink: 0;
      cursor: pointer;
      user-select: none;

      &.selected {
        background-color: var(--primary-color);

        &:hover {
          background-color: var(--primary-color);
        }
      }

      &:hover {
        background-color: #EDF2F9;
      }

    }
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(117, 117, 117, 0.3);
  }
}
</style>