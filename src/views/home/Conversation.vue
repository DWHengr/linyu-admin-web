<template>
  <div class="conversation">
    <div class="title">
      <img src="@/assets/icon/conversation.png" style="height: 100%;margin-right: 10px">
      <div>
        <div class="text-[20px] font-[600]">会话管理</div>
        <div class="text-[15px] mt-[2px] text-[#939ea9]">
          可以自定义会话。第三方可以通过Api接口指定会话，给用户发送消息
        </div>
      </div>
    </div>
    <div class="w-[110px] ml-auto my-[10px]">
      <CustomIconfontButton
          icon="icon-tianjia"
          label="添加会话"
          style="background-color: #4C9BFF;color: #FFFFFF"
      />
    </div>
    <div class="flex">
      <div class="card">
        <div class="border-b-[2px] border-b-[#EDF2F9] flex justify-between items-center">
          <div class="text-[13px] text-[#939ea9]">系统默认</div>
          <i class="iconfont icon-gengduo" style="font-size: 20px"/>
        </div>
        <div class="flex-1 flex flex-col justify-center items-center">
          <img alt="" src="https://img1.baidu.com/it/u=119288129,1126670693&fm=253&fmt=auto&app=138&f=JPEG?w=512&h=500"
               class="w-[60px] h-[60px] rounded-[50px]">
          <div class="mt-[4px]">林语提醒</div>
        </div>
        <div class="h-[40px] border-t-[2px] border-t-[#EDF2F9] flex-shrink-0 flex justify-center items-center">
          <div class="font-[600] text-[20px] text-[var(--primary-color)]">已启用</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
</script>
<style lang="less" scoped>
.conversation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 900px;

  .title {
    width: 100%;
    height: 90px;
    background-image: linear-gradient(130deg, #F9FBFF, #E3ECFF);
    border: #FFFFFF 3px solid;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .card {
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 210px;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>