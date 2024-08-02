<template>
  <div class="home-index">
    <div class="navigation-top">
      <img alt="" src="/title.png" style="height: 50px; margin-left:10px">
      <div class="user-operate">
        <div style="width: 40px; height: 40px; border-radius: 40px; background-color: #4C9BFF"></div>
        <div style="margin-right: 10px; margin-left: 10px">admin</div>
        <i class="iconfont icon-tuichu" style="font-size: 24px; color: #4C9BFF"></i>
      </div>
    </div>
    <div class="content-container">
      <div class="navigation-left">
        <div
            v-for="(item, index) in navigationData"
            class="navigation-item-container"
            :key="index"
            :class="{selected: currentSelectOption === index}"
        >
          <div
              class="navigation-item"
              :class="{selected: currentSelectOption === index}"
              @click="() => handlerOptionClick(index)"
          >
            <i class="navigation-item-icon" :class="`iconfont ${item.icon}`"></i>
            <div class="navigation-item-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

let currentSelectOption = ref(0);
let navigationData = [
  {
    label: "首页",
    icon: "icon-shouye",
    route: "/home"
  },
  {
    label: "用户管理",
    icon: "icon-yonghu",
    route: "/user"
  },
  {
    label: "分组管理",
    icon: "icon-fenzhu",
    route: "/group"
  },
  {
    label: "消息管理",
    icon: "icon-xiaoxi",
    route: "/message"
  },
  {
    label: "通知管理",
    icon: "icon-tongzhi",
    route: "/notify"
  },
  {
    label: "说说管理",
    icon: "icon-shuoshuo",
    route: "/talk"
  },
  {
    label: "系统管理",
    icon: "icon-xitong",
    route: "/set"
  }
];

let handlerOptionClick = (index) => {
  currentSelectOption.value = index;
};
</script>

<style lang="less">
.home-index {
  width: 100vw;
  height: 100vh;
  background-color: #EDF2F9;
  display: flex;
  flex-direction: column;

  .navigation-top {
    width: 100vw;
    height: 70px;
    background-color: #F9FBFF;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-operate {
      display: flex;
      margin-right: 10px;
      align-items: center;
    }
  }

  .content-container {
    flex: 1;
    width: 200px;
    background-color: #F9FBFF;
    transition: width 0.3s ease;

    .navigation-left {
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

          .navigation-item-icon {
            font-size: 20px;
            margin: 0 10px;
          }

          .navigation-item-label {
            white-space: nowrap;
            opacity: 1;
            transition: opacity .6s ease, width .6s ease, visibility .6s ease;
          }

          &.selected {
            color: #FFFFFF;
            background-color: #4C9BFF;
          }
        }

        &.selected {
          border-right: #4C9BFF 3px solid;
        }
      }
    }

    .content {
    }
  }

  @media (max-width: 1200px) {
    .content-container {
      width: 80px;
    }

    .navigation-item {
      justify-content: center;

      .navigation-item-label {
        opacity: 0 !important;
        width: 0 !important;
        visibility: hidden !important;
      }
    }
  }
}
</style>