<template>
  <div class="user-container">
    <CustomModal v-model:is-open="addUserIsOpen">
      <div class="add-user">
        <div class="font-semibold text-[20px] mb-[20px]">{{ currentSelectedUser ? "修改用户" : "添加用户" }}</div>
        <div>
          <div class="add-user-label">账号</div>
          <CustomFormInput v-model:value="addUserInfo.account" :limit="30" is-only-chars required
                           :readonly="!!currentSelectedUser"
                           placeholder="请输入用户账号~"/>
          <div class="add-user-label">用户名</div>
          <CustomFormInput v-model:value="addUserInfo.name" :limit="30" required placeholder="请输入用户名~"/>
          <div class="add-user-label">邮箱</div>
          <CustomFormInput v-model:value="addUserInfo.email" type="email" placeholder="请输入用户邮箱~" required/>
          <div class="add-user-label">手机号</div>
          <CustomFormInput v-model:value="addUserInfo.phone" type="tel" placeholder="请输入用户手机号~"/>
        </div>
        <div class="w-[100%] flex justify-end mt-[30px]">
          <CustomButton type="minor" style="width: 80px" @click="()=>addUserIsOpen=false">取 消</CustomButton>
          <CustomButton style="width: 80px;margin-left: 10px" @click="onCreateOrUpdateUser">确 定</CustomButton>
        </div>
      </div>
    </CustomModal>
    <CustomDialog
        title="删除"
        v-model:is-open="delUserIsOpen"
        @cancel="delUserIsOpen=false"
        @ok="onDelUser"
    >
      确认删除该用户？
    </CustomDialog>
    <div class="border-white-0">
      <CustomSearchInput
          v-model:value="searchValue"
          placeholder="搜索"
          class="w-[300px] border-[2px] border-[#FFF]"
          style="margin-top: 0;margin-bottom: 10px"
          @on-search="()=>console.log(searchValue)"
      />
    </div>
    <div class="flex h-[40px] justify-between select-none items-center mb-[15px]">
      <div class="text-[24px] font-[600] tracking-[1px]">{{ `用户数量(${usersData?.total})` }}</div>
      <div>
        <div>
          <CustomSwitchButton
              v-model="selectedOption"
              optionOne="在线"
              optionTwo="离线"
          />
        </div>
      </div>
      <div class="flex">
        <!--        <CustomIconfontButton-->
        <!--            icon="icon-shaixuan"-->
        <!--            class="mr-[5px]"-->
        <!--            @click="(e)=>console.log(e)"-->
        <!--        />-->
        <!--        <CustomIconfontButton icon="icon-paixu" class="mr-[5px]"/>-->
        <CustomIconfontButton
            icon="icon-tianjia"
            label="添加用户"
            style="background-color: #4C9BFF;color: #FFFFFF"
            @click="handlerAddUser"
        />
      </div>
    </div>
    <CustomPopover placement="bottom" v-model:is-visible="moreIsVisible" :position="morePosition">
      <div class="user-options">
        <div class="option" @click="handlerSendMsg">发送消息</div>
        <div class="option" v-if="currentSelectedUser?.status === 'normal'" @click="onDisableUser">禁用</div>
        <div class="option" v-if="currentSelectedUser?.status === 'disable'" @click="onUnDisableUser">解禁</div>
        <div class="option" @click="handlerEditUser">修改信息</div>
        <div class="option" v-if="currentSelectedUser?.role === 'admin'" @click="onCancelAdmin">取消管理员</div>
        <div class="option" v-if="currentSelectedUser?.role !== 'admin'" @click="onSetAdmin">设置管理员</div>
        <div class="option" @click="onResetPassword">重置密码</div>
        <div class="option" @click="()=>{delUserIsOpen=true;moreIsVisible=false}">删除</div>
      </div>
    </CustomPopover>
    <div class="flex w-full flex-wrap overflow-y-scroll">
      <div
          v-for="item in usersData?.records"
          class="bg-[#fff] flex flex-col h-[290px] w-[280px] p-[10px] rounded-[10px] mr-[10px] mb-[10px] flex-shrink-0"
      >
        <div
            class="flex flex-col h-[190px] bg-opacity-10 p-[10px] rounded-[10px] items-center mb-[10px] relative"
            :class="`${item.sex==='男'?'bg-[#4C9BFF]':'bg-[#FFA0CF]'} ${daysDifference(item.createTime)>1?'':'bg-[#FFB800]'}`"
        >
          <div class="flex justify-between text-[14px] leading-[14px] w-full select-none mb-[2px]">
            <div class="flex items-center w-full">
              <div
                  class="w-[12px] h-[12px] rounded-[12px] mr-[4px]"
                  :class="item.isOnline?'bg-[var(--primary-color)]':'bg-[#C4C4C4]'"
              />
              <div :class="item.isOnline&&'text-[var(--primary-color)] font-semibold'">
                {{ item.isOnline ? '在线' : '离线' }}
              </div>
              <div v-if="item.role==='admin'" class="ml-[4px] flex items-center text-[var(--primary-color)]">
                <i class="iconfont icon-guanliyuan" style="font-size: 18px;"/>
              </div>
              <div v-if="item.role==='third'" class="ml-[4px] flex items-center text-[#FEB633]">
                <i class="iconfont icon-huiyuan" style="font-size: 18px;"/>
              </div>
            </div>
            <div class="flex flex-shrink-0">
              <div class="mr-[4px]">{{ calculateAge(item.birthday) }}岁</div>
              <i
                  class="iconfont"
                  :class="item.sex==='男'?'icon-nan text-[var(--primary-color)]':'icon-nv text-[#FFA0CF]'"
              />
            </div>
          </div>
          <div v-if="daysDifference(item.createTime) <= 0"
               class="user-info-bg bg-cover bg-center h-[80px] w-full absolute"/>
          <div class="flex flex-col items-center z-[1]">
            <img alt="" :src="item.portrait"
                 class="w-[60px] h-[60px] rounded-[60px] select-none">
            <div class="text-[18px]">{{ item.name }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.account }}</div>
            <div class="text-[12px] text-[#ababab]">{{ getDateParts(item.birthday) }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.phone }}</div>
            <div class="text-[12px] text-[#ababab]">{{ item.email }}</div>
          </div>
        </div>
        <div class="flex flex-1 justify-between items-center select-none">
          <div class="flex flex-col justify-between items-center">
            <div class="font-[600] flex items-center text-[15px] h-[30px]">
              {{ daysDifference(item.createTime) > 0 ? daysDifference(item.createTime) : "当" }}天
            </div>
            <div class="text-[14px] text-[#ababab] h-[30px] flex items-center">加入时长</div>
          </div>
          <div class="flex flex-col justify-between items-center">
            <div
                class="font-[600] flex items-center text-[20px] h-[30px]"
                :class="item.status ==='normal' ? 'text-[var(--primary-color)]' : 'text-[#FF4C4C]'"
            >
              {{ item.status === "normal" ? "正常" : "禁用" }}
            </div>
            <div class="text-[14px] text-[#ababab] h-[30px] flex items-center">用户状态</div>
          </div>
          <div class="flex flex-col justify-between items-center">
            <div class="font-[600] flex items-center text-[20px] h-[30px]">
              <i
                  class="iconfont icon-gengduo hover:bg-[#EDF2F9] rounded-[5px] cursor-pointer"
                  style="font-size: 30px"
                  @click="(e)=>handlerSetMorePosition(e,item)"
              />
            </div>
            <div class="text-[14px] text-[#ababab] h-[30px] flex items-center">更多操作</div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[40px] flex justify-end mt-[20px] items-center flex-shrink-0">
      <div>
        <CustomPagination
            :total="usersData?.total"
            @update:pagination="(v)=>pagination=v"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomSearchInput from "@/components/CustomSearchInput.vue";
import {onMounted, ref, triggerRef, watch} from "vue";
import CustomSwitchButton from "@/components/CustomSwitchButton.vue";
import CustomIconfontButton from "@/components/CustomIconfontButton.vue";
import {calculateAge, getDateParts, daysDifference} from "@/utils/data.js";
import CustomPagination from "@/components/CustomPagination.vue";
import {useChat} from "@/use/UseChat/useChat.js";
import UserAPi from "@/api/user.js";
import CustomModal from "@/components/CustomModal.vue";
import CustomFormInput from "@/components/CustomFormInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import {useToast} from '@/components/ToastProvider.vue';
import CustomPopover from "@/components/CustomPopover.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import ChatList from "@/api/chatList.js";

const searchValue = ref("")
const selectedOption = ref('none');
const {showChat} = useChat();
const showToast = useToast()
const usersData = ref({total: 0, record: []})
const pagination = ref(null)
const addUserIsOpen = ref(false)
const addUserInfo = ref({account: '', name: '', sex: '', birthday: '', email: '', phone: ''})
const moreIsVisible = ref(false)
const morePosition = ref(null)
const currentSelectedUser = ref(null)
const delUserIsOpen = ref(false)

const onUserPage = () => {
  let onlineStatus = selectedOption.value === "optionOne" ? "online" : "offline";
  UserAPi.page({
    currentPage: pagination.value.currentPage,
    pageSize: pagination.value.pageSize,
    keyword: searchValue.value,
    onlineStatus: selectedOption.value === "none" ? "" : onlineStatus,
  }).then(res => {
    usersData.value = res.data
  })
}

const onDelUser = () => {
  UserAPi.delete({userId: currentSelectedUser.value.id}).then(res => {
    if (res.code === 0) {
      onUserPage()
      showToast("删除成功~")
      delUserIsOpen.value = false
    } else {
      showToast(res.msg, true)
    }
  })
}

const handlerSendMsg = () => {
  ChatList.create({userId: currentSelectedUser.value?.id, type: 'user'}).then(res => {
    if (res.code === 0) {
      showChat(currentSelectedUser.value?.id)
      moreIsVisible.value = false
    }
  })
}

const handlerAddUser = () => {
  addUserIsOpen.value = true
  addUserInfo.value = {account: '', name: '', sex: '', birthday: '', email: '', phone: ''}
  currentSelectedUser.value = null
}

const handlerEditUser = () => {
  addUserIsOpen.value = true
  moreIsVisible.value = false
  addUserInfo.value = currentSelectedUser.value
}

const onDisableUser = () => {
  UserAPi.disable({userId: currentSelectedUser.value.id}).then(res => {
    if (res.code === 0) {
      onUserPage()
      showToast("禁用成功~")
      moreIsVisible.value = false
    } else {
      showToast(res.msg, true)
    }
  })
}

const onUnDisableUser = () => {
  UserAPi.unDisable({userId: currentSelectedUser.value.id}).then(res => {
    if (res.code === 0) {
      onUserPage()
      showToast("解禁成功~")
      moreIsVisible.value = false
    } else {
      showToast(res.msg, true)
    }
  })
}

onMounted(() => {
  onUserPage()
})

watch([pagination, searchValue, selectedOption], () => {
  onUserPage()
})

const onCreateOrUpdateUser = () => {
  if (addUserInfo.value.account &&
      addUserInfo.value.name &&
      addUserInfo.value.email) {
    if (!currentSelectedUser.value) {
      UserAPi.create(addUserInfo.value).then(res => {
        if (res.code === 0) {
          showToast("用户创建成功，密码已发送到该邮箱~")
          addUserIsOpen.value = false
          onUserPage()
        } else {
          showToast(res.msg, true)
        }
      })
    } else {
      UserAPi.update(addUserInfo.value).then(res => {
        if (res.code === 0) {
          showToast("用户信息更新成功~")
          addUserIsOpen.value = false
          onUserPage()
        } else {
          showToast(res.msg, true)
        }
      })
    }
  } else {
    showToast("信息填写不完整~", true)
  }
}

const onResetPassword = () => {
  UserAPi.resetPassword({userId: currentSelectedUser.value.id}).then(res => {
    if (res.code === 0) {
      showToast("重置密码成功~")
      moreIsVisible.value = false
    } else {
      showToast(res.msg, false)
    }
  })
}

const handlerSetMorePosition = (e, user) => {
  e.stopPropagation()
  const rect = e.target.getBoundingClientRect()
  if (!moreIsVisible.value || (morePosition.value?.top === rect.top && morePosition.value?.left === rect.left)) {
    moreIsVisible.value = !moreIsVisible.value
  }
  morePosition.value = {top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right}
  currentSelectedUser.value = user
}


const onSetAdmin = () => {
  UserAPi.setAdmin({userId: currentSelectedUser.value.id}).then(res => {
    if (res.code === 0) {
      showToast("设置成功~")
      moreIsVisible.value = false
      onUserPage()
    } else {
      showToast(res.msg, true)
    }
  })
}

const onCancelAdmin = () => {
  UserAPi.cancelAdmin({userId: currentSelectedUser.value.id}).then(res => {
    if (res.code === 0) {
      showToast("取消成功~")
      moreIsVisible.value = false
      onUserPage()
    } else {
      showToast(res.msg, true)
    }
  })
}

</script>
<style lang="less" scoped>
.user-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  min-width: 900px;
  display: flex;
  flex-direction: column;

  .user-options {
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

  .add-user {
    width: 500px;
    max-height: 70vh;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px 40px;

    .add-user-label {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }

  .user-info-bg {
    background-image: url('@/assets/icon/user-info-bg.png')
  }
}
</style>