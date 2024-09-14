<template>
  <div>
    <Transition name="fade">
      <div
          v-if="isVisible"
          class="popover-content"
          ref="popoverRef"
          :style="popoverStyle"
      >
        <slot>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUnmount, nextTick, watch} from 'vue';

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
  },
  position: {
    type: Object,
  }
})

const isVisible = defineModel("isVisible")

watch(() => props.position, (n, o) => {
  nextTick(() => {
    updatePopoverPosition()
  })
})

const popoverRef = ref(null)
const popoverPosition = ref({top: 0, left: 0})
const updatePopoverPosition = () => {
  const popover = popoverRef.value
  if (popover) {
    const popoverRect = popover.getBoundingClientRect();
    switch (props.placement) {
      case 'top':
        popoverPosition.value = {
          top: props.position.top - popoverRect.height,
          left: props.position.left,
        };
        break;
      case 'bottom':
        popoverPosition.value = {
          top: props.position.bottom,
          left: props.position.left,
        };
        break;
      case 'left':
        popoverPosition.value = {
          top: props.position.top,
          left: props.position.left - popoverRect.width,
        };
        break;
      case 'right':
        popoverPosition.value = {
          top: props.position.top,
          left: props.position.right,
        };
        break;
      default:
        break;
    }
    if (popoverPosition.value.left + popoverRect.width >= window.innerWidth) {
      popoverPosition.value.left = popoverPosition.value.left - popoverRect.width
      popoverPosition.value.top = popoverPosition.value.top - popoverRect.height
    }
    if (popoverPosition.value.top + popoverRect.height >= window.innerHeight) {
      popoverPosition.value.left = popoverPosition.value.left - popoverRect.width
      popoverPosition.value.top = popoverPosition.value.top - popoverRect.height
    }
  }
};

const popoverStyle = computed(() => {
  return {
    top: popoverPosition.value.top + 'px',
    left: popoverPosition.value.left + 'px',
  };
});

const handleClickOutside = (event) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target)) {
    isVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.popover-content {
  position: fixed;
  background-image: linear-gradient(130deg, rgba(249, 251, 255, 0.6), rgba(227, 236, 255, 0.6));
  backdrop-filter: blur(5px);
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1111;
  border-radius: 5px;
  transition: top 0.5s ease, left 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
