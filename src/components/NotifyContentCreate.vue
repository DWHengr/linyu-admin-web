<template>
  <NotifyContent>
    <template #top>
      <div class="font-[600]">新建系统通知</div>
    </template>
    <template #operation>
      <div class="icon-button" @click="onSubmit">
        <i class="iconfont icon-tijiao"/>
      </div>
    </template>
    <template #title>
      <CustomFormInput v-model:value="title" placeholder="请输入通知标题~" required required-msg="标题不能为空~"/>
    </template>
    <template #img>
      <CustomImageUploader v-model:value="img" class="mb-[30px]"/>
    </template>
    <template #text>
      <textarea class="textarea" v-model="text" placeholder="请输入通知内容~"></textarea>
    </template>
  </NotifyContent>
</template>

<script setup>
import NotifyContent from "@/components/NotifyContent.vue";
import CustomFormInput from "@/components/CustomFormInput.vue";
import CustomImageUploader from "@/components/CustomImageUploader.vue";
import {ref, defineEmits} from "vue";
import {useToast} from '@/components/ToastProvider.vue';
import NotifyApi from "@/api/notify.js";

const title = ref("")
const img = ref(null)
const text = ref("")
const showToast = useToast()
const emit = defineEmits(["onCreate"])

const onSubmit = () => {
  if (!title.value) {
    showToast("标题不能为空~", true)
    return
  }
  if (!img.value) {
    showToast("图片不能为空~", true)
    return
  }
  if (!text.value) {
    showToast("内容不能为空~", true)
    return
  }
  const formData = new FormData()
  formData.append('file', img.value)
  formData.append('title', title.value)
  formData.append('text', text.value)
  NotifyApi.create(formData).then(res => {
    if (res.code === 0) {
      showToast("创建成功~")
      emit("onCreate")
      title.value = ""
      text.value = ""
      img.value = null
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

.textarea {
  border: #c4c4c4 1px solid;
  border-radius: 2px;
  background-color: #F9FBFF;
  resize: none;
  width: 100%;
  min-height: 120px;
  outline: none;
  padding: 5px;
  font-size: 14px;

  &::placeholder {
    color: #7F7F7F;
  }

  &:hover, &:focus {
    border: var(--primary-color) 1px solid;
  }
}
</style>