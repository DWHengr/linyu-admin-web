<template>
  <div class="image-uploader">
    <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        style="display: none"
    >
    <div @click="triggerFileInput" v-if="!preview" class="image-button" :style="props.buttonStyle">
      <i class="iconfont icon-tianjia" style="font-size: 50px"/>
    </div>
    <div v-if="preview" class="image-preview" :style="props.previewStyle">
      <div class="image-preview-del">
        <CustomIconfontButton
            icon="iconfont icon-shanchu rounded-[2px]"
            icon-style="font-size:22px;background-color:#ff4c4c;color:#fff"
            @click="onCancel"
        />
      </div>
      <img :src="preview" alt="preview"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, ref, watch} from 'vue'
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";

const fileInput = ref(null)
const file = ref(null)
const preview = ref(null)

const value = defineModel("value")
const props = defineProps({
  buttonStyle: String,
  previewStyle: String,
})

const urlToFile = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = "portrait"; // 从URL中获取文件名
  return new File([blob], fileName, {type: blob.type});
}


watch(() => value.value, () => {
  if (typeof value.value === 'string') {
    preview.value = value.value
    urlToFile(value.value).then(res => {
      file.value = res
    })
  }
}, {immediate: true})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  if (file.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.value = e.target.result
    }
    reader.readAsDataURL(file.value)
  }
}
const onCancel = () => {
  file.value = null
  preview.value = null
}

watch(file, () => {
  value.value = file.value
})

watch(value, () => {
  if (!value.value) {
    file.value = null
    preview.value = null
  }
})
</script>

<style lang="less" scoped>
.image-uploader {
  .image-button {
    height: 160px;
    width: 160px;
    background-color: #F9FBFF;
    border-radius: 2px;
    border: #c4c4c4 1px dashed;
    user-select: none;
    cursor: pointer;
    color: #c4c4c4;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;

    &:hover {
      border-color: var(--primary-color);
    }
  }

  .image-preview {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .image-preview-del {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      background-color: rgba(0, 0, 0, .3);
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      .image-preview-del {
        opacity: 1;
      }
    }
  }
}
</style>