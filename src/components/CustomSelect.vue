<template>
  <div class="dropdown-container" ref="dropdownContainer">
    <div
        tabindex="0"
        class="label"
        @focus="showDropdown"
        @blur="hideDropdown"
        @click="showDropdown"
    >
      {{ selected }}{{ props.suffix }}
    </div>
    <ul
        v-if="isDropdownVisible"
        :class="{ 'dropdown-menu': true, 'dropdown-menu-up': isUp }"
        ref="dropdownMenu"
    >
      <li
          v-for="option in options"
          :key="option"
          @mousedown.prevent="selectOption(option)"
      >
        {{ option }}{{ props.suffix }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {nextTick, defineProps, defineModel, ref, watch} from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: false,
    default: ''
  },
  suffix: {
    type: String,
  }
});

const selected = defineModel('selected')

const isDropdownVisible = ref(false);
const isUp = ref(false);
const dropdownContainer = ref(null);
const dropdownMenu = ref(null);

const showDropdown = () => {
  isDropdownVisible.value = true;
  nextTick(() => {
    checkDropdownPosition();
  });
};

const hideDropdown = () => {
  setTimeout(() => {
    isDropdownVisible.value = false;
  }, 100);
};

const selectOption = (option) => {
  selected.value = option;
  isDropdownVisible.value = false;
};

const checkDropdownPosition = () => {
  if (dropdownContainer.value && dropdownMenu.value) {
    const containerRect = dropdownContainer.value.getBoundingClientRect();
    const menuRect = dropdownMenu.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (containerRect.bottom + menuRect.height > viewportHeight) {
      isUp.value = true;
    } else {
      isUp.value = false;
    }
  }
};

watch(isDropdownVisible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      checkDropdownPosition();
    });
  }
});

</script>

<style scoped>
.dropdown-container {
  position: relative;
  width: 100px;
  text-align: center;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(117, 117, 117, 0.2);
}

.label {
  border-radius: 5px;
  height: 24px;
  line-height: 24px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  text-align: center;
  background-color: rgba(76, 155, 255, 0.15);
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  left: 0;
  right: 0;
  background-color: rgba(237, 242, 249, 0.8);
  backdrop-filter: blur(2px);
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  border-radius: 5px;
  z-index: 1000;
  margin: 2px;
}

.dropdown-menu-up {
  bottom: 100%;
}

.dropdown-menu li {
  padding: 4px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: rgba(76, 155, 255, 0.15);
}
</style>
