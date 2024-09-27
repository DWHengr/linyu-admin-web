<template>
  <CustomDialog
      title="删除"
      v-model:is-open="delNotifyIsOpen"
      @cancel="delNotifyIsOpen=false"
      @ok="onDelNotify"
  >
    确认删除该条通知？
  </CustomDialog>
  <NotifyContent>
    <template #top>
      创建时间:{{ notify?.createTime }}
    </template>
    <template #operation>
      <div class="icon-button" @click="delNotifyIsOpen=true">
        <i class="iconfont icon-shanchu"/>
      </div>
    </template>
    <template #title>
      {{ notify?.content?.title }}
    </template>
    <template #img>
      <img class="mb-[30px] rounded-[5px]" :src="notify?.content?.img" style="width: 600px;">
    </template>
    <template #text>
      {{ notify?.content?.text }}
    </template>
  </NotifyContent>
</template>
<script setup>
import NotifyContent from "@/components/NotifyContent.vue";
import {defineProps, defineEmits, ref} from "vue";
import CustomDialog from "@/components/CustomDialog.vue";
import NotifyApi from "@/api/notify.js";
import {useToast} from '@/components/ToastProvider.vue';

const delNotifyIsOpen = ref(false)

const props = defineProps({
  notify: Object,
})

const emit = defineEmits(["delNotify"])

const showToast = useToast();

const onDelNotify = () => {
  NotifyApi.delete({notifyId: props.notify.id}).then(res => {
    if (res.code === 0) {
      showToast("删除成功~")
      delNotifyIsOpen.value = false
      emit('delNotify')
    } else {
      showToast(res.msg, true)
    }
  })

}
</script>

<style lang="less" scoped>
.icon-button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(76, 155, 255, 0.15);
  }
}
</style>