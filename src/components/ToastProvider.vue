<template>
  <div>
    <slot></slot>
    <CustomToast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :duration="toast.duration"
        :error="toast.error"
        @close="removeToast(toast.id)"
    />
  </div>
</template>

<script>
import {ref, provide, inject} from 'vue';
import CustomToast from "@/components/CustomToast.vue";

const ToastSymbol = Symbol();
export const useToast = () => inject(ToastSymbol);
export default {
  components: {CustomToast},
  setup() {
    const toasts = ref([]);

    const showToast = (message, error = false, duration = 2000) => {
      const id = Math.random().toString(36).substr(2, 9);
      toasts.value.push({id, message, duration, error});
    };

    const removeToast = (id) => {
      toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    provide(ToastSymbol, showToast);

    return {
      toasts,
      removeToast
    };
  }
};
</script>

<style scoped>
</style>