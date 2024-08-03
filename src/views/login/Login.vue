<template>
  <div class="login-container">
    <img alt="" src="/poster.png" class="poster-img">
    <img class="logo" alt="" src="/title.png">
    <div class="login-content">
      <div class="login-box">
        <div class="title">
          <div class="text-[40px] font-[600] leading-[40px]">登录系统</div>
          <div class="text-[20px] ml-[10px] text-[#8D8D8D] leading-[20px]">欢迎使用林语管理端</div>
        </div>
        <div class="info">
          <div class="custom-input">
            <div style="margin-left: 10px">请输入用户名</div>
          </div>
          <div class="custom-input">
            <div style="margin-left: 10px">请输入密码</div>
          </div>
        </div>
        <div
            class="operate"
            @click="onLogin"
        >
          登 录
        </div>
      </div>
      <div class="web-info">
        <div>
          <i class="iconfont icon-bzhan" style="font-size: 30px;margin-right: 10px"></i>
          <i class="iconfont icon-github" style="font-size: 30px"></i>
        </div>
        <div>Author : Heath</div>
        <div>QQ群 : 729158695</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

let onLogin = () => {
  router.push("/index")
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;

  .poster-img {
    height: 100vh;
    min-width: 650px;
    min-height: 700px;
  }

  .logo {
    margin: 15px;
    position: absolute;
    display: flex;
    height: 60px;
  }

  .login-content {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom, #EDF2F9, #fff);
    position: relative;

    .web-info {
      position: absolute;
      bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ababab;
    }

    .login-box {
      margin: 100px;
      width: 600px;
      height: 500px;
      background-color: #FFF;
      border-radius: 20px;
      border: #f1f1f1 3px solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        display: flex;
        align-items: end;
      }

      .info {
        width: 500px;
        height: 200px;
        margin-top: 20px;
        margin-bottom: 40px;

        .custom-input {
          height: 50px;
          width: 100%;
          border-radius: 5px;
          background-color: #F0F0F0;
          font-size: 18px;
          color: #8D8D8D;
          margin-top: 30px;
          display: flex;
          align-items: center;
        }
      }

      .operate {
        width: 500px;
        height: 50px;
        font-size: 24px;
        font-weight: 600;
        color: #FFFFFF;
        background-color: var(--primary-color);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
