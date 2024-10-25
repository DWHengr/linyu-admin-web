<template>
  <div class="conversation">
    <CustomModal v-model:is-open="addConversationIsOpen">
      <div class="modal-conversation">
        <div class="font-semibold text-[20px] mb-[20px]">{{ isEditConversation ? "修改会话" : "创建会话" }}</div>
        <div class="flex items-center mb-[10px]">
          <div class="modal-label mr-[20px]">头像</div>
          <CustomImageUploader v-model:value="conversationInfo.portrait"
                               button-style="width: 100px;height: 100px;border-radius: 10px"
                               preview-style="width: 100px;height: 100px;border-radius: 10px"
          />
        </div>
        <div>
          <div class="modal-label">名称</div>
          <CustomFormInput v-model:value="conversationInfo.name" :limit="30" required placeholder="请输入名称~"/>
        </div>
        <div class="w-[100%] flex justify-end mt-[30px]">
          <CustomButton type="minor" style="width: 80px" @click="()=>addConversationIsOpen=false">取 消</CustomButton>
          <CustomButton style="width: 80px;margin-left: 10px" @click="onCreateConversation">确 定</CustomButton>
        </div>
      </div>
    </CustomModal>
    <CustomModal v-model:is-open="secretIsOpen">
      <div class="modal-conversation">
        <div class="font-semibold text-[20px] mb-[20px]">秘钥</div>
        <div>
          <div class="modal-label">access key：</div>
          <CustomFormInput v-model:value="currentSelectedConversation.accessKey" readonly/>
        </div>
        <div>
          <div class="modal-label">secret key：</div>
          <CustomFormInput v-model:value="currentSelectedConversation.secretKey" readonly/>
        </div>
        <div class="w-[100%] flex justify-end mt-[30px]">
          <CustomButton type="minor" style="width: 80px" @click="()=>secretIsOpen=false">取 消</CustomButton>
        </div>
      </div>
    </CustomModal>
    <CustomPopover placement="bottom" v-model:is-visible="moreIsVisible" :position="morePosition">
      <div class="conversation-options">
        <div class="option" @click="handlerShowKey">显示秘钥</div>
        <div class="option" @click="resetSecretIsOpen=true;moreIsVisible=false">重置秘钥</div>
        <div class="option" @click="handlerUpdateConversationInfo">修改信息</div>
        <div class="option" v-if="currentSelectedConversation?.status === 'normal'" @click="onDisableConversation">
          禁用
        </div>
        <div class="option" v-if="currentSelectedConversation?.status === 'disable'" @click="onUnDisableConversation">
          解禁
        </div>
        <div class="option" @click="delConversationIsOpen=true;moreIsVisible=false">删除</div>
      </div>
    </CustomPopover>
    <CustomDialog
        title="删除"
        v-model:is-open="delConversationIsOpen"
        @cancel="delConversationIsOpen=false"
        @ok="onDelConversation"
    >
      确认删除该会话？
    </CustomDialog>
    <CustomDialog
        title="重置秘钥"
        v-model:is-open="resetSecretIsOpen"
        @cancel="resetSecretIsOpen=false"
        @ok="onResetSecret"
    >
      确认重置该会话的秘钥？
    </CustomDialog>
    <div class="title">
      <img src="@/assets/icon/conversation.png" style="height: 100%;margin-right: 10px">
      <div>
        <div class="text-[20px] font-[600]">会话管理</div>
        <div class="text-[15px] mt-[2px] text-[#939ea9]">
          可以自定义会话。第三方可以通过Api接口指定会话，给用户发送消息
        </div>
      </div>
    </div>
    <div class="w-[110px] ml-auto my-[10px]">
      <CustomIconfontButton
          icon="icon-tianjia"
          label="添加会话"
          style="background-color: #4C9BFF;color: #FFFFFF"
          @click="handlerShowAddConversationModal"
      />
    </div>
    <div class="flex w-full flex-wrap overflow-y-scroll">
      <div class="card mr-[10px] mb-[10px]" v-for="(item) in conversationData">
        <div class="border-b-[2px] border-b-[#EDF2F9] flex justify-between items-center">
          <div class="text-[13px] text-[#939ea9]">自定义</div>
          <i class="iconfont icon-gengduo hover:bg-[#EDF2F9] rounded-[5px] cursor-pointer"
             style="font-size: 20px" @click="(e)=>handlerSetMorePosition(e,item)"/>
        </div>
        <div class="flex-1 flex flex-col justify-center items-center">
          <img alt="" :src="item.portrait"
               class="w-[60px] h-[60px] rounded-[50px]">
          <div class="mt-[4px]">{{ item.name }}</div>
        </div>
        <div class="h-[40px] border-t-[2px] border-t-[#EDF2F9] flex-shrink-0 flex justify-center items-center">
          <div v-if="item.status==='normal'" class="font-[600] text-[20px] text-[var(--primary-color)]">已启用</div>
          <div v-if="item.status==='disable'" class="font-[600] text-[20px] text-[#ff4c4c]">已禁用</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import {onMounted, reactive, ref} from "vue";
import ConversationApi from "@/api/conversation.js";
import CustomFormInput from "@/components/CustomFormInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import CustomModal from "@/components/CustomModal.vue";
import CustomImageUploader from "@/components/CustomImageUploader.vue";
import {useToast} from '@/components/ToastProvider.vue';
import CustomPopover from "@/components/CustomPopover.vue";
import CustomDialog from "@/components/CustomDialog.vue";

const conversationData = ref([])
const addConversationIsOpen = ref(false)
const conversationInfo = reactive({name: '', portrait: null})
const showToast = useToast()
const secretIsOpen = ref(false)
const moreIsVisible = ref(false)
const morePosition = ref(null)
const currentSelectedConversation = ref(null)
const isEditConversation = ref(false)
const delConversationIsOpen = ref(false)
const resetSecretIsOpen = ref(false)

onMounted(() => {
  onConversationList()
})

const handlerSetMorePosition = (e, data) => {
  e.stopPropagation()
  const rect = e.target.getBoundingClientRect()
  if (!moreIsVisible.value || (morePosition.value?.top === rect.top && morePosition.value?.left === rect.left)) {
    moreIsVisible.value = !moreIsVisible.value
  }
  morePosition.value = rect
  currentSelectedConversation.value = data
  conversationInfo.name = data.name
  conversationInfo.portrait = data.portrait
}

const onConversationList = () => {
  ConversationApi.list().then(res => {
    if (res.code === 0) {
      conversationData.value = res.data
    }
  })
}

const onUnDisableConversation = () => {
  ConversationApi.unDisable({conversationId: currentSelectedConversation.value.id}).then(res => {
    if (res.code === 0) {
      showToast("解禁成功~")
      onConversationList()
    }
  })
}
const onDisableConversation = () => {
  ConversationApi.disable({conversationId: currentSelectedConversation.value.id}).then(res => {
    if (res.code === 0) {
      showToast("禁用成功~")
      onConversationList()
    }
  })
}

const onResetSecret = () => {
  ConversationApi.resetSecret({conversationId: currentSelectedConversation.value.id}).then(res => {
    if (res.code === 0) {
      showToast("重置成功，请查看最新秘钥~")
      resetSecretIsOpen.value = false
      onConversationList()
    }
  })
}

const onDelConversation = () => {
  ConversationApi.delete({conversationId: currentSelectedConversation.value.id}).then(res => {
    if (res.code === 0) {
      showToast("删除成功~")
      delConversationIsOpen.value = false
      onConversationList()
    }
  })
}

const handlerUpdateConversationInfo = () => {
  addConversationIsOpen.value = true;
  moreIsVisible.value = false
  isEditConversation.value = true
}

const handlerShowKey = () => {
  secretIsOpen.value = true
  moreIsVisible.value = false
}

const handlerShowAddConversationModal = () => {
  addConversationIsOpen.value = true
  conversationInfo.name = ''
  conversationInfo.portrait = null
  isEditConversation.value = false
}

const onCreateConversation = () => {
  if (!conversationInfo.name) {
    showToast("名称不能为空~", true)
    return
  }
  if (!conversationInfo.portrait) {
    showToast("头像不能为空~", true)
    return
  }
  const formData = new FormData()
  formData.append('portrait', conversationInfo.portrait)
  formData.append('name', conversationInfo.name)
  console.log(conversationInfo.portrait)
  if (isEditConversation.value) {
    formData.append('id', currentSelectedConversation.value.id)
    ConversationApi.update(formData).then(res => {
      if (res.code === 0) {
        showToast("修改成功~")
        onConversationList()
        addConversationIsOpen.value = false
      }
    })
  } else {
    ConversationApi.create(formData).then(res => {
      if (res.code === 0) {
        showToast("创建成功，点击更多，可以查看秘钥~")
        onConversationList()
        addConversationIsOpen.value = false
      }
    })
  }
}

</script>
<style lang="less" scoped>
.conversation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 900px;

  .conversation-options {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    width: 100px;
    padding: 10px 5px;

    .option {
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 5px;
      user-select: none;

      &:hover {
        background-color: #FFFFFF;
      }
    }
  }

  .modal-conversation {
    width: 500px;
    max-height: 70vh;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px 40px;

    .modal-label {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }

  .title {
    width: 100%;
    height: 90px;
    background-image: linear-gradient(130deg, #F9FBFF, #E3ECFF);
    border: #FFFFFF 3px solid;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .card {
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 210px;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>