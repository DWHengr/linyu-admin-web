<template>
  <Chat/>
  <div class="home-index">
    <div class="navigation-top">
      <img alt="" src="/title.png" class="ml-[10px] h-[50px] ">
      <div class="user-operate">
        <div class="flex mr-[15px] px-[10px] py-[5px] bg-white rounded-[10px] border-[1px] border-[#EDF2F9]">
          <div
              class="w-[32px] h-[32px] flex justify-center items-center cursor-pointer hover:bg-[#EDF2F9] mr-[5px] rounded-[5px]"
          >
            <img alt="" src="@/assets/icon/notify.png" style="width: 26px;height: 26px">
          </div>
          <div
              class="w-[32px] h-[32px] flex justify-center items-center cursor-pointer hover:bg-[#EDF2F9] rounded-[5px] relative"
              @click="showChat()"
          >
            <div v-if="unreadInfo.chat>0"
                 class="w-[10px] h-[10px] rounded-[10px] bg-[#ff4c4c] absolute right-0 top-0"/>
            <img alt="" src="@/assets/icon/chat.png" style="width: 26px;height: 26px">
          </div>
        </div>
        <img
            alt=""
            :src="currentUserInfo.portrait"
            style="width: 40px;height: 40px;border-radius: 40px"
        >
        <div class="mx-[10px]">{{ currentUserInfo.username }}</div>
        <i class="iconfont icon-tuichu text-[var(--primary-color)] cursor-pointer"
           @click="handlerLogout"
           style="font-size: 24px"/>
      </div>
    </div>
    <div class="content-container">
      <div class="navigation-container">
        <div class="navigation-left">
          <div
              v-for="item in navigationData"
              class="navigation-item-container"
              :key="item.name"
              :class="{selected: route.name===item.name}"
          >
            <div
                class="navigation-item"
                :class="{selected: route.name===item.name}"
                @click="() => handlerOptionClick(item)"
            >
              <i class="navigation-item-icon" :class="`iconfont ${item.icon}`"></i>
              <div class="navigation-item-label">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import Chat from "@/use/UseChat/Chat.vue";
import {useChat} from "@/use/UseChat/useChat.js";
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import UserApi from "@/api/user.js";
import EventBus from "@/utils/eventBus.js";

const route = useRoute();
const {showChat} = useChat();
const currentUserInfo = reactive({username: "", portrait: ""})
const unreadInfo = ref({chat: 0})

let navigationData = [
  {
    name: "main",
    label: "首页",
    icon: "icon-shouye",
    route: "/main"
  },
  {
    name: "user",
    label: "用户管理",
    icon: "icon-yonghu",
    route: "/user"
  },
  // {
  //   name: "group",
  //   label: "分组管理",
  //   icon: "icon-fenzhu",
  //   route: "/group"
  // },
  // {
  //   name: "message",
  //   label: "消息管理",
  //   icon: "icon-xiaoxi",
  //   route: "/message"
  // },
  {
    name: "notify",
    label: "通知管理",
    icon: "icon-tongzhi",
    route: "/notify"
  },
  {
    name: "conversation",
    label: "会话管理",
    icon: "icon-xiaoxi",
    route: "/conversation"
  },
  // {
  //   name: "talk",
  //   label: "说说管理",
  //   icon: "icon-shuoshuo",
  //   route: "/talk"
  // },
  // {
  //   name: "set",
  //   label: "系统管理",
  //   icon: "icon-xitong",
  //   route: "/set"
  // }
];

const handlerLogout = () => {
  sessionStorage.removeItem("x-token")
  router.push('/')
}

onMounted(() => {
  currentUserInfo.username = sessionStorage.getItem("username")
  currentUserInfo.portrait = sessionStorage.getItem("portrait")
  onUnread()
  handlerReceiveMsg()
  EventBus.on('on-receive-msg', handlerReceiveMsg)
  EventBus.on('on-refresh-unread', handlerReceiveMsg)
})

onUnmounted(() => {
  EventBus.off('on-receive-msg', handlerReceiveMsg)
  EventBus.off('on-refresh-unread', handlerReceiveMsg)
})

let handlerOptionClick = (item) => {
  router.push('/home' + item.route)
};

const handlerReceiveMsg = () => {
  onUnread()
}

const onUnread = () => {
  UserApi.unread().then(res => {
    if (res.code === 0) {
      unreadInfo.value = res.data
    }
  })
}
</script>

<style lang="less" scoped>
.home-index {
  width: 100vw;
  height: 100vh;
  background-color: #EDF2F9;
  display: flex;
  flex-direction: column;

  .navigation-top {
    width: auto;
    height: 60px;
    background-color: #F9FBFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    user-select: none;

    .user-operate {
      display: flex;
      margin-right: 10px;
      align-items: center;
    }
  }

  .content-container {
    display: flex;
    height: 100%;
    overflow: hidden;

    .navigation-container {
      width: 200px;
      min-width: 60px;
      background-color: #F9FBFF;
      transition: width 0.3s ease;
      flex-shrink: 0;

      .navigation-left {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .navigation-item-container {
          height: 40px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 5px 0;
          box-sizing: border-box;
          border-right: transparent 3px solid;

          .navigation-item {
            height: 100%;
            width: 80%;
            background-color: #ffffff;
            border-radius: 5px;
            display: flex;
            align-items: center;
            user-select: none;
            border: #f3f3f3 1px solid;
            cursor: pointer;
            font-weight: 600;
            letter-spacing: .5px;

            &:hover {
              background-color: #EDF2F9;
            }

            .navigation-item-icon {
              font-size: 20px;
              margin: 0 10px;
            }

            .navigation-item-label {
              white-space: nowrap;
              opacity: 1;
              transition: opacity .3s ease, width .3s ease, visibility .3s ease;
            }

            &.selected {
              color: #FFFFFF;
              background-color: var(--primary-color);
            }
          }

          &.selected {
            border-right: var(--primary-color) 3px solid;
          }
        }
      }
    }

    .content {
      flex: 1;
      background-color: #EDF2F9;
      padding: 10px;
      overflow-y: auto;
    }
  }

  @media (max-width: 1400px) {
    .navigation-container {
      width: 60px !important;

      .navigation-item {
        justify-content: center !important;

        .navigation-item-label {
          opacity: 0 !important;
          width: 0 !important;
          visibility: hidden !important;
        }
      }
    }
  }
}
</style>