<template>
  <div class="custom-switch-button">
    <div class="buttons">
      <div
          class="button option-one"
          :class="{ active: isActive === 'optionOne' }"
          @click="toggle('optionOne')"
      >
        {{ props.optionOne }}
      </div>
      <div
          class="button option-two"
          :class="{ active: isActive === 'optionTwo' }"
          @click="toggle('optionTwo')"
      >
        {{ props.optionTwo }}
      </div>
      <div v-show="isShowSlide">
        <transition name="slide">
          <div
              @click.prevent="toggle('none')"
              class="active-indicator"
              :class="{ 'right': isActive === 'optionTwo' }"
          >
            {{ currentOption }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, defineEmits, ref, watch} from 'vue';

const props = defineProps({
  optionOne: {
    type: String,
    required: true,
  },
  optionTwo: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: 'none',
  },
});

const emit = defineEmits(['update:modelValue']);
const isActive = computed(() => props.modelValue);
const isShowSlide = ref(props.modelValue !== 'none')
const currentOption = ref('none');

watch(isActive, (newValue) => {
  if (newValue === 'optionOne') {
    currentOption.value = props.optionOne;
  } else if (newValue === 'optionTwo') {
    currentOption.value = props.optionTwo;
  } else {
    currentOption.value = 'none'
  }
})

const toggle = (option) => {
  if (option === 'none') {
    isShowSlide.value = false
    emit('update:modelValue', 'none');
  } else {
    isShowSlide.value = true
    emit('update:modelValue', option);
  }
}
</script>

<style scoped>
.custom-switch-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  border: 2px solid #ffffff;
  border-radius: 20px;
  overflow: hidden;
  background-image: linear-gradient(130deg, #F9FBFF, #E3ECFF);
  user-select: none;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
}

.buttons {
  position: relative;
  display: flex;
  width: 100%;
}

.button {
  flex: 1;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.button.option-one {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.button.option-two {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.button.active {
  color: #ffffff;
}

.active-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  background-color: var(--primary-color);
  border-radius: 20px;
  transition: transform 0.3s ease;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  color: #fff;
}

.active-indicator.right {
  transform: translateX(100%);
}
</style>
