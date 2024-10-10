<template>
  <div :class="['custom-input', { required: isShowRequiredMsg, invalid: !isValid }]">
    <div v-if="pre" class="pre">
      {{ pre }}
    </div>
    <input
        :placeholder="placeholder"
        :value="value"
        :type="inputType"
        @input="handleInput"
        @blur="onBlur"
        :readonly="props.readonly"
    />
    <div class="operation" style="display: flex; justify-content: center">
      <div class="operation-icon"></div>
      <i
          v-if="value && type !== 'date' && !props.readonly"
          class="iconfont icon-guanbi operation-icon"
          @click="onCleanValue"
      ></i>
      <div v-else style="width: 20px"></div>
    </div>
    <div v-if="limit > 0 && !props.readonly" class="character-count">
      {{ value?.length || 0 }}/{{ limit }}
    </div>
    <div>{{ pos }}</div>
  </div>
  <div style="height: 18px; font-size: 12px; color: #ff4c4c">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import {ref, computed, nextTick, triggerRef} from 'vue';

const props = defineProps({
  placeholder: String,
  pre: {
    type: String,
    default: ''
  },
  pos: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: -1
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'tel', 'date', 'password'].includes(value)
  },
  required: {
    type: Boolean,
    default: false
  },
  requiredMsg: {
    type: String,
    default: '内容不能为空'
  },
  isOnlyChars: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

const value = defineModel("value")

const isShowRequiredMsg = ref(false);
const isValid = ref(true);
const errorMessage = ref('');

const inputType = computed(() => {
  if (props.type === 'tel') return 'tel';
  if (props.type === 'email') return 'email';
  if (props.type === 'date') return 'date';
  if (props.type === 'password') return 'password';
  return 'text';
});

const validateInput = () => {
  if (!value.value && props.required) {
    isValid.value = false;
    errorMessage.value = props.requiredMsg;
    return false;
  }

  if (value.value) {
    if (props.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.value)) {
        isValid.value = false;
        errorMessage.value = '请输入有效的邮箱地址';
        return false;
      }
    } else if (props.type === 'tel') {
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(value.value)) {
        isValid.value = false;
        errorMessage.value = '请输入有效的手机号码';
        return false;
      }
    }
  }

  isValid.value = true;
  errorMessage.value = '';
  return true;
};

const onCleanValue = () => {
  value.value = '';
  validateInput();
};

const onBlur = () => {
  validateInput();
};

const handleInput = (e) => {
  let newValue = e.target.value;
  if (newValue.length > props.limit && props.limit !== -1) {
    newValue = newValue.substring(0, props.limit)
  }
  if (props.isOnlyChars) {
    newValue = newValue.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '')
    // if (newValue.length > 0 && !newValue[0].match(/[a-zA-Z]/)) {
    //   newValue = newValue.replace(/^[0-9]+/, '')
    // }
  }
  validateInput()
  value.value = newValue
  if (value.value === newValue) {
    triggerRef(value)
  }
}
</script>

<style scoped>
.custom-input {
  height: 30px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-radius: 4px;
  border: #d9d9d9 1px solid;
  padding: 0 10px;
  font-size: 14px;
}

.custom-input:focus-within {
  border: var(--primary-color) 1px solid;
}

.custom-input.required,
.custom-input.invalid {
  border: #ff4c4c 1px solid;
}

.custom-input .pre {
  flex-shrink: 0;
  min-width: 50px;
}

.custom-input .operation {
  display: flex;
  justify-items: center;
  align-items: center;
}

.custom-input .operation .operation-icon {
  font-size: 16px;
  color: #7F7F7F;
}

.custom-input input {
  font-size: 14px;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
}

.custom-input input[type="date"]::-webkit-datetime-edit-fields-wrapper {
  font-size: 14px;
  color: #7F7F7F
}

.custom-input input::placeholder {
  color: #7F7F7F
}

.custom-input input[type="password"]::-ms-reveal {
  display: none
}

.custom-input .character-count {
  flex-shrink: 0;
  margin-left: 5px;
  min-width: 36px;
  color: #7F7F7F
}
</style>