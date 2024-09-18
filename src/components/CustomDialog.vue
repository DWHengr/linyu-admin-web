<template>
  <CustomModal :is-open="isOpen" @update:is-open="(v)=>isOpen=v">
    <div class="custom-dialog">
      <div class="flex justify-between items-center  mb-[10px]">
        <div class="font-[600] text-[20px]">{{ props.title }}</div>
        <CustomIconfontButton
            icon="iconfont icon-guanbi"
            icon-style="font-size:24px"
            class="close-icon"
            @click="onCancel"
        />
      </div>
      <div class="flex-1">
        <slot></slot>
      </div>
      <div class="flex justify-end">
        <CustomButton type="minor" style="width: 80px" @click="onCancel">取 消</CustomButton>
        <CustomButton style="width: 80px;margin-left: 10px" @click="onOk">确 定</CustomButton>
      </div>
    </div>
  </CustomModal>
</template>
<script setup>
import CustomModal from "@/components/CustomModal.vue";
import {defineEmits, defineModel, defineProps} from "vue";
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import CustomButton from "@/components/CustomButton.vue";

const props = defineProps({
  title: {
    default: ''
  }
})

const emit = defineEmits(["cancel", "ok"])
const isOpen = defineModel("isOpen")

const onCancel = () => {
  emit("cancel")
}

const onOk = () => {
  emit("ok")
}

</script>

<style lang="less" scoped>
.custom-dialog {
  width: 480px;
  height: 180px;
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  .close-icon {
    background-color: transparent;

    &:hover {
      color: #FFFFFF;
      background: #ff4c4c;
    }
  }
}
</style>