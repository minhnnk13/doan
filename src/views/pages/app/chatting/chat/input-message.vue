<template>
  <div class="type">
    <div class="plus">
      <el-icon><circle-plus /></el-icon>
    </div>

    <text-field
      placeholder="Trả lời"
      v-model="message"
      @onSubmit="onSubmit"
    />

    <div
      class="send"
      :class="{'enable': isEnable}"
      @click="onSubmit"
    >
      <svg
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        class="GfYBMd v6TC2e"
      ><path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z" /></svg>
    </div>
  </div>
</template>

<script>

import { CirclePlus } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
export default {
  components: {
    CirclePlus
  },

  emits: ['onSubmit'],

  props: {
    modelValue: {
      type: String,
      default: null
    }
  },

  setup (props, { emit }) {
    const message = ref(null)

    const isEnable = computed(() => !!message.value)

    const onSubmit = () => {
      if (isEnable.value) {
        emit('onSubmit', message.value)
        message.value = null
      }
    }
    return {
      message,
      isEnable,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.type {
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 16px;

    .plus, .send {
        display: flex;
        align-items: center;
        font-size: 24px;
        cursor: pointer;
    }

    .send {
        fill: #bdc1c6;

        &.enable {
            fill: #1a73e8;
        }
    }

    .input {
        flex: 1;

        :deep(.el-input__inner) {
            height: 40px;
            border-radius: 10px;
        }
    }
}
</style>
