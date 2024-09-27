<template>
  <div class="w-[600px] flex flex-col overflow-hidden">
    <div class="flex justify-between my-[20px]">
      <div class="text-[#707070] select-none">
        <slot name="top"></slot>
      </div>
      <div class="flex">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="flex flex-col overflow-y-scroll pr-[5px]">
      <div class="label">标题</div>
      <div class="mb-[30px]">
        <slot name="title"></slot>
      </div>
      <div class="label">图片内容</div>
      <div>
        <slot name="img"></slot>
      </div>
      <div class="label">内容</div>
      <div>
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

.label {
  padding: 5px;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  color: #707070;
  letter-spacing: 1px;
  font-weight: 600;
  background-image: linear-gradient(-130deg, #F9FBFF, #E3ECFF);
  user-select: none;
  border-radius: 2px;
}

</style>
<script setup>
</script>