<template>
  <div class="user-container">
    <div class="h-[70px] border-white-0">
      <CustomSearchInput
          v-model:value="searchValue"
          placeholder="搜索"
          class="w-[300px] border-[2px] border-[#FFF]"
          @on-search="()=>console.log(searchValue)"
      />
    </div>
    <div class="flex h-[40px] justify-between select-none items-center mb-[15px]">
      <div class="text-[24px] font-[600] tracking-[1px]">全部用户(1001)</div>
      <div>
        <div>
          <CustomSwitchButton
              v-model="selectedOption"
              optionOne="在线"
              optionTwo="离线"
          />
        </div>
      </div>
      <div class="flex">
        <CustomIconfontButton
            icon="icon-shaixuan"
            class="mr-[5px]"
            @click="(e)=>console.log(e)"
        />
        <CustomIconfontButton icon="icon-paixu" class="mr-[5px]"/>
        <CustomIconfontButton
            icon="icon-tianjia"
            label="添加用户"
            style="background-color: #4C9BFF;color: #FFFFFF"
        />
      </div>
    </div>
    <div class="flex w-full flex-wrap overflow-y-scroll">
      <div
          v-for="item in usersData"
          class="bg-[#fff] flex flex-col h-[290px] w-[280px] p-[10px] rounded-[10px] mr-[10px] mb-[10px] flex-shrink-0"
      >
        <div
            class="flex flex-col h-[190px] bg-opacity-10 p-[10px] rounded-[10px] items-center mb-[10px] relative"
            :class="`${item.sex==='男'?'bg-[#4C9BFF]':'bg-[#FFA0CF]'} ${daysDifference(item.createTime)>1?'':'bg-[#FFB800]'}`"
        >
          <div class="flex justify-between text-[14px] leading-[14px] w-full select-none">
            <div class="flex items-center w-full">
              <div
                  class="w-[10px] h-[10px] rounded-[10px] mr-[4px]"
                  :class="item.online?'bg-[var(--primary-color)]':'bg-[#C4C4C4]'"
              />
              <div>{{ item.online ? '在线' : '离线' }}</div>
            </div>
            <div class="flex flex-shrink-0">
              <div class="mr-[4px]">{{ calculateAge(item.birthday) }}岁</div>
              <i
                  class="iconfont"
                  :class="item.sex==='男'?'icon-nan text-[var(--primary-color)]':'icon-nv text-[#FFA0CF]'"
              />
            </div>
          </div>
          <div v-if="daysDifference(item.createTime) <= 0"
               class="user-info-bg bg-cover bg-center h-[80px] w-full absolute"/>
          <div class="flex flex-col items-center z-[1]">
            <img alt="" :src="item.portrait"
                 class="w-[60px] h-[60px] rounded-[60px] select-none">
            <div class="text-[18px]">{{ item.name }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.account }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.birthday }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.phone }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.email }}</div>
          </div>
        </div>
        <div class="flex flex-1 justify-between items-center select-none">
          <div class="flex flex-col justify-between items-center">
            <div class="font-[600] flex items-center text-[15px] h-[30px]">
              {{ daysDifference(item.createTime) > 0 ? daysDifference(item.createTime) : "当" }}天
            </div>
            <div class="text-[14px] text-[#ababab] h-[30px] flex items-center">加入时长</div>
          </div>
          <div class="flex flex-col justify-between items-center">
            <div
                class="font-[600] flex items-center text-[20px] h-[30px]"
                :class="item.status ==='normal' ? 'text-[var(--primary-color)] ' : 'text-[#FF4C4C]'"
            >
              {{ item.status === "normal" ? "正常" : "禁用" }}
            </div>
            <div class="text-[14px] text-[#ababab] h-[30px] flex items-center">用户状态</div>
          </div>
          <div class="flex flex-col justify-between items-center">
            <div class="font-[600] flex items-center text-[20px] h-[30px]">
              <i class="iconfont icon-gengduo" @click="showChat()" style="font-size: 30px"/>
            </div>
            <div class="text-[14px] text-[#ababab] h-[30px] flex items-center">更多操作</div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[40px] flex justify-end mt-[20px] items-center flex-shrink-0">
      <div>
        <CustomPagination
            :total="101"
            @update:pagination="(v)=>console.log(v)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomSearchInput from "@/components/CustomSearchInput.vue";
import {ref, watch} from "vue";
import CustomSwitchButton from "@/components/CustomSwitchButton.vue";
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import {calculateAge, daysDifference} from "@/utils/data.js";
import CustomPagination from "@/components/CustomPagination.vue";
import {useChat} from "@/use/UseChat/useChat.js";

const searchValue = ref("")
const selectedOption = ref('none');

const {showChat} = useChat();

let usersData = [
  {
    name: "王小二",
    portrait: "https://gd-hbimg.huaban.com/67d634c2af824efcc8574a59342c1042021311e316edc-SPs6FN_fw236",
    account: "wangxiaoer",
    birthday: "2022-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "normal",
    online: true,
    sex: "女",
    createTime: "2022-10-20",
  },
  {
    name: "王小1二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "normal",
    online: true,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2024-8-5",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  },
  {
    name: "王小3二",
    portrait: "https://th.bing.com/th/id/OIP.c-I6QGVea_XcqjihjmqSawAAAA?rs=1&pid=ImgDetMain",
    account: "wangxiaoer",
    birthday: "2023-10-20",
    email: "wangxiaoer@163.com",
    phone: "18833333333",
    status: "ban",
    online: false,
    sex: "男",
    createTime: "2021-10-20",
  }
]

watch(selectedOption, (value) => {
  console.log(value)
})
</script>
<style lang="less" scoped>
.user-container {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: hidden;
  min-width: 900px;
  display: flex;
  flex-direction: column;

  .user-info-bg {
    background-image: url('@/assets/icon/user-info-bg.png')
  }
}
</style>