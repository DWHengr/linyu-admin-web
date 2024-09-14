<template>
  <div class="custom-pagination">
    <input
        type="number"
        v-model="interCurrentPage"
        class="w-[36px] bg-[#4C9BFF26] rounded-[5px] outline-none text-center text-[14px] font-[600]"
        @keydown.enter="handlerSetCurrentPage"
        @blur="handlerSetCurrentPage"
    >
    <div class="mx-[5px]">of 共{{ pageNum }}页</div>
    <div class="mx-[5px] text-[14px] font-[600]">
      <CustomSelect
          :options="[10,20,50]"
          suffix="条/页"
          v-model:selected="interPageSize"
      />
    </div>
    <div class="icon-button" @click="handlerCurrentPageSub">
      <i class="iconfont icon-fenye-zuo"/>
    </div>
    <div class="icon-button" @click="handlerCurrentPageAdd">
      <i class="iconfont icon-fenye-you"/>
    </div>
  </div>
</template>
<script setup>
import CustomSelect from "@/components/CustomSelect.vue";
import {computed, defineEmits, defineProps, ref, watch} from "vue";

const emit = defineEmits(["update:pagination"])

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    default: 10,
    type: Number
  },
  currentPage: {
    default: 1,
    type: Number
  }
})

let pageNum = computed(() => {
  return Math.ceil(props.total / interPageSize.value)
})

const interPageSize = ref(props.pageSize)

const interCurrentPage = ref(props.currentPage)


watch(interPageSize, (pageSize) => {
      emit("update:pagination", {pageSize: pageSize, currentPage: interCurrentPage.value})
    },
    {immediate: true}
)

watch(() => props.total, () => {
      if (props.total / interPageSize.value < interCurrentPage.value) {
        interCurrentPage.value = 1
        emit("update:pagination", {pageSize: interPageSize.value, currentPage: interCurrentPage.value})
      }
    }
)

let handlerSetCurrentPage = () => {
  let cp = interCurrentPage.value;
  if (cp > pageNum.value) {
    cp = pageNum.value
    interCurrentPage.value = pageNum.value
  }
  if (cp < 1) {
    cp = 1
    interCurrentPage.value = 1
  }
  emit('update:pagination', {pageSize: interPageSize.value, currentPage: cp})
}
let handlerCurrentPageSub = () => {
  if (interCurrentPage.value > 1) {
    interCurrentPage.value = interCurrentPage.value - 1
    emit('update:pagination', {pageSize: interPageSize.value, currentPage: interCurrentPage.value})
  }
}

let handlerCurrentPageAdd = () => {
  if (interCurrentPage.value < pageNum.value) {
    interCurrentPage.value = interCurrentPage.value + 1
    emit('update:pagination', {pageSize: interPageSize.value, currentPage: interCurrentPage.value})
  }
}

</script>
<style lang="less" scoped>
.custom-pagination {
  height: 40px;
  padding: 0 10px;
  max-width: 400px;
  background-color: #FFFFFF;
  border-radius: 10px;
  border: rgba(31, 31, 31, 0.15) 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

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
}
</style>