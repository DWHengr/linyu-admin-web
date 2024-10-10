<template>
  <div class="notify">
    <div class="list">
      <div class="flex justify-between items-center">
        <div class="h-[28px] text-[28px] leading-[28px] flex items-center font-[600]">系统通知</div>
        <CustomIconfontButton icon="iconfont icon-tianjia" class="primary-icon-button"
                              @click="selectedNotify=null;notifyOperation='create'"/>
      </div>
      <CustomSearchInput placeholder="搜索" style="margin-bottom: 15px;margin-top: 15px"/>
      <div class="flex-1 flex flex-col overflow-y-scroll pr-[5px]">
        <div v-for="item in systemNotifyData"
             class="card"
             :class="item.id === selectedNotify?.id?'selected':''"
             :key="item.id"
             @click="selectedNotify=item;notifyOperation='show'"
        >
          <div class="flex h-[45px] w-full flex-1 justify-between flex-col py-[2px]">
            <div class="flex w-full justify-between items-center flex-shrink-0">
              <div
                  class="w-[85px] text-ellipsis overflow-hidden whitespace-nowrap text-[16px] leading-[16px]"
                  :class="item.id === selectedNotify?.id?'text-[#FFF]':'text-[#1F1F1F]'"
              >
                {{ item.content.title }}
              </div>
              <div
                  class="text-[10px] leading-[16px] flex-shrink-0"
                  :class="item.id === selectedNotify?.id?'text-[#FFF]':'text-[#1F1F1F]'"
              >
                {{ item.createTime }}
              </div>
            </div>
            <div class="flex h-[16px] w-full justify-between items-center flex-shrink-0">
              <div
                  class="text-[12px] leading-[12px]"
                  :class="item.id === selectedNotify?.id?'text-[#FFF]':'text-[#1F1F1F]'"
              >
                {{ item.content.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <NotifyContentShow v-if="selectedNotify&&notifyOperation==='show'" :notify="selectedNotify"
                         @del-notify="onGetNotifyList"/>
      <NotifyContentCreate v-if="notifyOperation==='create'" @on-create="onGetNotifyList"/>
    </div>
  </div>
</template>
<script setup>
import CustomSearchInput from "@/components/CustomSearchInput.vue";
import {onMounted, ref, watch} from "vue";
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import NotifyApi from "@/api/notify.js";
import NotifyContentShow from "@/components/NotifyContentShow.vue";
import NotifyContentCreate from "@/components/NotifyContentCreate.vue";

let selectedNotify = ref(null)
let systemNotifyData = ref([])
let notifyOperation = ref("show")

onMounted(() => {
  onGetNotifyList()
})

const onGetNotifyList = () => {
  NotifyApi.list().then(res => {
    if (res.code === 0) {
      systemNotifyData.value = res.data
    }
  })
}

watch(systemNotifyData, () => {
  if (systemNotifyData.value && systemNotifyData.value.length > 0) {
    selectedNotify.value = systemNotifyData.value[0]
  }
}, {immediate: true})
</script>
<style lang="less" scoped>
.notify {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 5px;

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(117, 117, 117, 0.4);
  }

  .list {
    width: 400px;
    min-width: 400px;
    height: 100%;
    background-image: linear-gradient(to top, #ffffff, rgba(249, 251, 255));
    border-right: 1px solid #E1E0E0;
    padding: 10px;
    border-radius: 5px 0 0 5px;

    .primary-icon-button {
      min-width: 28px;
      max-width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      background-color: var(--primary-color);
      color: #FFFFFF;

      &:hover {
        background-color: rgba(76, 155, 255, 0.8);
      }
    }

    .card {
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
      border: #f3f3f3 1px solid;

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

  .content {
    height: 100%;
    flex: 1;
    background-image: linear-gradient(to bottom, #ffffff, rgba(249, 251, 255));
    min-width: 700px;
    display: flex;
    justify-content: center;
    border-radius: 0 5px 5px 0;
  }
}
</style>