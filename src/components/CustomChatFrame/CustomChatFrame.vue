<template>
  <div class="custom-chat-frame">
    <div class="frame-top">
      <div class="flex items-center">
        <img
            alt=""
            src="https://gd-hbimg.huaban.com/67d634c2af824efcc8574a59342c1042021311e316edc-SPs6FN_fw236"
            class="w-[45px] h-[45px] rounded-[45px] mr-[10px]"
        >
        <div class="font-[600]">王小二</div>
      </div>
    </div>
    <div class="frame-show-msg">
    </div>
    <div class="frame-content">
      <div class="flex">
        <CustomIconfontButton
            icon="iconfont icon-biaoqing"
            icon-style="font-size:22px"
            class="operate-icon"
        />
        <CustomIconfontButton
            icon="iconfont icon-wenjian"
            icon-style="font-size:24px"
            class="operate-icon"
        />
      </div>
      <div class="flex-1"></div>
      <div class="w-full p-[10px]">
        <CustomButton class="ml-auto">发送</CustomButton>
      </div>
    </div>
  </div>
</template>
<script setup>

import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import CustomButton from "@/components/CustomButton.vue";
</script>
<style lang="less" scoped>
.custom-chat-frame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .frame-top {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    background-color: #F9FBFF;
    display: flex;
    align-items: center;
  }

  .frame-show-msg {
    flex: 1;
  }

  .frame-content {
    width: 100%;
    background-color: #F9FBFF;
    height: 220px;
    display: flex;
    flex-direction: column;

    .operate-icon {
      background-color: transparent;
      margin: 2px;

      &:hover {
        background-color: #EDF2F9;
      }
    }
  }
}
</style>