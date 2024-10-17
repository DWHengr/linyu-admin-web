<template>
  <div class="main-container">
    <div class="main-left">
      <div class="panel">
        <div class="flex-col w-[380px] ml-[40px]">
          <div class="text-[20px] font-[600] tracking-[2px] mb-[30px] select-none">系统管理员，下午好！</div>
          <div class="flex">
            <div class="info-card mr-[25px]">
              <div class="ml-[10px]">
                <img alt="" src="@/assets/icon/click.png" class="h-[40px] w-[40px] select-none">
                <div class="text-[#787878] text-[12px] select-none">今日登录人数：</div>
                <div class="font-[600] text-[28px]">{{ numInfo.loginNum }}</div>
              </div>
            </div>
            <div class="info-card">
              <div class="ml-[10px]">
                <img alt="" src="@/assets/icon/message.png" class="h-[40px] w-[40px] select-none">
                <div class="text-[#787878] text-[12px] select-none">今日消息数：</div>
                <div class="font-[600] text-[28px]">{{ numInfo.msgNum }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 h-[100px] flex flex-col justify-center items-center">
          <img alt="" src="@/assets/icon/admin.png" class="h-[110px] w-[110px] select-none">
          <div class="text-[12px] text-[#787878] select-none">当前,在线人数:</div>
          <div class="flex items-center">
            <div class="h-[12px] w-[12px] bg-[var(--primary-color)] rounded-[20px] mr-[5px]"></div>
            <div>{{ numInfo.onlineNum }}</div>
          </div>
        </div>
      </div>
      <div class="chart">
        <div ref="onlineChart" style="width: 500px; height: 240px;"></div>
      </div>
      <div class="rank">
        <div class="text-[20px] font-[600] mb-[5px] select-none">今日发送消息数 TOP10 榜单</div>
        <div class="w-full flex-1 divide-y overflow-y-scroll pr-[5px]">
          <div v-for="(item,index) in rankData" class="flex w-full h-[60px] items-center">
            <div class="h-[40px] w-[40px] relative mr-[15px] shrink-0">
              <img
                  v-if="index===0"
                  src="@/assets/icon/crown.png" alt=""
                  class="h-[40px] w-[40px] absolute top-[-45%] right-[-45%] rotate-45"
              >
              <img class="h-[40px] w-[40px] rounded-[40px]" :src="item.portrait"/>
            </div>
            <div class="w-full flex flex-col justify-between h-[40px]">
              <div class="flex w-full justify-between">
                <div>{{ item.name }}</div>
                <div>{{ item.num }}</div>
              </div>
              <div
                  class="h-[10px] bg-gradient-to-r from-[#A0D9F6] to-[#4C9BFF] rounded-[5px]"
                  :style="`width: ${ item.num/maxRankNum*100 }%`"
              />
            </div>
          </div>
          <CustomEmpty v-if="rankData.length<=0" placeholder="暂无排名信息~"/>
        </div>
      </div>
    </div>
    <div class="main-right">
      <div class="flex justify-between items-center">
        <div class="text-[20px] font-[600] mb-[10px] h-[30px] select-none">今日登录详情</div>
        <CustomSearchInput v-model:value="loginDetailsQueryInfo.keyword" placeholder="搜索"
                           style="margin-bottom: 15px;margin-top: 0;height: 30px;width: 260px"/>
      </div>
      <div class="login-info" ref="loginDetailsContainerRef">
        <div v-for="(item,index) in loginDetailsData"
             class="login-info-card"
             :class="{odd:index%2!==0}"
        >
          <div class="flex items-center">
            <img class="h-[40px] w-[40px] rounded-[40px] bg-[var(--primary-color)] mr-[10px] shrink-0"
                 :src="item.portrait">
            <div class="flex flex-col">
              <div class="flex items-center">
                <div>{{ item.name }}</div>
                <div class="text-[12px] ml-[5px] text-[#787878]">{{ item.account }}</div>
              </div>
              <div class="text-[14px]">{{ item.email }}</div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-[#787878] text-[14px]">{{ item.createTime }}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
      </div>
      <CustomEmpty v-if="loginDetailsData.length<=0"/>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import StatisticApi from "@/api/statistic.js";
import CustomSearchInput from "@/components/CustomSearchInput.vue";
import CustomEmpty from "@/components/CustomEmpty.vue";
import NotifyApi from "@/api/notify.js";
import {getDateParts, getMonthAndDayParts} from "@/utils/data.js";

const onlineChart = ref(null)
const loginDetailsData = ref([])
const loginDetailsQueryInfo = ref({index: 0, num: 20, keyword: ''})
let loginDetailsDataComplete = false
let loginDetailsDataLoading = false
const loginDetailsContainerRef = ref(null);
const numInfo = ref({loginNum: 0, onlineNum: 0, msgNum: 0, statistics: []})
let onlineChartInstance = null;
let rankData = ref([])
let maxRankNum = ref(0);

const handleScroll = () => {
  const container = loginDetailsContainerRef.value;
  if (!container) return;
  const {scrollTop, scrollHeight, clientHeight} = container;
  if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
    if (!loginDetailsDataComplete && !loginDetailsDataLoading) {
      loginDetailsQueryInfo.value.index += loginDetailsQueryInfo.value.num
      onLoginDetails()
    }
  }
};

const handlerShowStatistics = () => {
  onlineChartInstance = echarts.init(onlineChart.value);
  const option = {
    legend: {
      left: "20"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: '25%',
      bottom: '10%'
    },
    xAxis: {
      data: numInfo.value?.statistics?.map(item => getMonthAndDayParts(item.date))
    },
    yAxis: {},
    series: [{
      itemStyle: {
        color: '#4C9BFF'
      },
      name: '登录数量',
      type: 'bar',
      data: numInfo.value?.statistics?.map(item => item.loginNum)
    }, {
      itemStyle: {
        color: '#A0D9F6'
      },
      name: '同时在线人数',
      type: 'bar',
      data: numInfo.value?.statistics?.map(item => item.onlineNum)
    }
    ]
  };
  onlineChartInstance.setOption(option);
}

onMounted(async () => {
  onLoginDetails()
  onGetNumInfo()
  onTop10Msg()
  await nextTick()
  loginDetailsContainerRef.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (onlineChartInstance != null && onlineChartInstance.dispose) {
    onlineChartInstance.dispose();
  }
  loginDetailsContainerRef.value?.removeEventListener('scroll', handleScroll);
});

const onLoginDetails = () => {
  loginDetailsDataLoading = true
  StatisticApi.loginDetails(loginDetailsQueryInfo.value).then(res => {
    if (res.code === 0) {
      if (res.data.length > 0) {
        loginDetailsData.value = [...loginDetailsData.value, ...res.data]
      } else {
        loginDetailsDataComplete = true
      }
    }
  }).finally(() => {
    loginDetailsDataLoading = false
  })
}

const onGetNumInfo = () => {
  StatisticApi.numInfo().then(res => {
    if (res.code === 0) {
      numInfo.value = res.data
      handlerShowStatistics()
    }
  })
}

const onTop10Msg = () => {
  StatisticApi.top10Msg().then(res => {
    if (res.code === 0) {
      if (res.data?.length > 0) {
        rankData.value = res.data
        maxRankNum.value = res.data[0].num
      }
    }
  })
}

watch(() => loginDetailsQueryInfo.value.keyword, () => {
  loginDetailsQueryInfo.value.index = 0
  loginDetailsQueryInfo.value.num = 20
  loginDetailsData.value = []
  onLoginDetails()
})
</script>

<style lang="less">
.main-container {
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 700px;
  min-width: 1000px;

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(117, 117, 117, 0.2);
  }


  .main-left {
    margin-right: 10px;
    width: 600px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    .panel {
      height: 260px;
      background-image: linear-gradient(130deg, #F9FBFF, rgba(249, 251, 255, 0.5));
      border-radius: 5px;
      box-sizing: border-box;
      border: 3px #FFFFFF solid;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      .info-card {
        flex: 1;
        height: 120px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 5px;
        border: #f8f8f8 2px solid;
        display: flex;
        align-items: center;
      }
    }

    .chart {
      height: 260px;
      border-radius: 5px;
      margin-bottom: 10px;
      background-color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .rank {
      flex: 1;
      border-radius: 5px;
      background-color: #FFFFFF;
      padding: 20px;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }

  .main-right {
    border-radius: 5px;
    width: 600px;
    min-width: 440px;
    background-color: #FFFFFF;
    padding: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .login-info {
      flex: 1;
      width: 100%;
      padding-right: 5px;
      overflow-y: scroll;

      .login-info-card {
        display: flex;
        height: 70px;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        background-image: linear-gradient(to right, rgba(160, 217, 246, 0.2), rgba(160, 217, 246, 0));
        margin-bottom: 10px;
        border-bottom: #e1e1e1 1px solid;

        &.odd {
          background-image: linear-gradient(to left, rgba(160, 217, 246, 0.2), rgba(160, 217, 246, 0));
        }
      }
    }
  }
}
</style>