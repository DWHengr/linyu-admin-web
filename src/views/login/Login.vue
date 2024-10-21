<template>
  <div class="login-container" @keydown.enter="onLogin">
    <img alt="" src="/poster.png" class="poster-img">
    <img class="logo" alt="" src="/title.png">
    <div class="login-content">
      <div class="login-box">
        <div class="title">
          <div class="text-[40px] font-[600] leading-[40px]">登录系统</div>
          <div class="text-[20px] ml-[10px] text-[#8D8D8D] leading-[20px]">欢迎使用林语管理端</div>
        </div>
        <div class="info">
          <CustomInput v-model:value="account" placeholder="请输入账号"/>
          <CustomInput v-model:value="password" type="password" placeholder="请输入密码"/>
        </div>
        <div
            :class="['operate', { logging: logging }]"
            @click="onLogin"
        >
          {{ !logging ? '登 录' : '登 录 中' }}
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
import CustomInput from "@/components/CustomInput.vue";
import {useToast} from '@/components/ToastProvider.vue';
import {ref} from "vue";
import LoginApi from "@/api/login.js";
import {JSEncrypt} from "jsencrypt";
import Ws from "@/utils/ws.js";

const router = useRouter()
const showToast = useToast()
const account = ref("")
const password = ref("")
const logging = ref(false)

let onLogin = async () => {
  if (!account.value) {
    showToast("账号不能为空~", true)
    return
  }
  if (!password.value) {
    showToast("密码不能为空~", true)
    return
  }
  logging.value = true
  let keyData = await LoginApi.publicKey();
  if (keyData.code !== 0) {
    return
  }
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(keyData.data);
  const encryptedPassword = encrypt.encrypt(password.value);
  LoginApi.login({account: account.value, password: encryptedPassword})
      .then((res) => {
        if (res.code === 0) {
          sessionStorage.setItem('x-token', res.data.token)
          sessionStorage.setItem('portrait', res.data.portrait)
          sessionStorage.setItem('username', res.data.username)
          sessionStorage.setItem('userId', res.data.userId)
          router.push("/home")
          Ws.connect(res.data.token)
        } else {
          showToast(res.msg, true)
        }
      })
      .catch((res) => {
        showToast(res.message, true)
      })
      .finally(() => {
        logging.value = false
      })
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  min-height: 800px;

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
        user-select: none;

        &.logging, &:hover {
          background-color: rgba(76, 155, 255, 0.8);
        }
      }
    }
  }
}
</style>
