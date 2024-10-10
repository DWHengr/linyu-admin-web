<template>
  <div class="image-uploader">
    <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/*"
        style="display: none"
    >
    <div @click="triggerFileInput" v-if="!preview" class="image-button">
      <i class="iconfont icon-tianjia" style="font-size: 50px"/>
    </div>
    <div v-if="preview" class="image-preview">
      <div class="image-preview-del">
        <CustomIconfontButton
            icon="iconfont icon-guanbi rounded-[2px]"
            icon-style="font-size:24px;background-color:#ff4c4c;color:#fff"
            @click="onCancel"
        />
      </div>
      <img :src="preview" alt="preview"/>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";

const fileInput = ref(null)
const file = ref(null)
const preview = ref(null)

const value = defineModel("value")

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
    position: relative;

    .image-preview-del {
      position: absolute;
      top: 5px;
      right: 5px;
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