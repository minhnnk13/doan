<template>
  <div class="item">
    <div class="avatar">
      <el-icon><avatar /></el-icon>
    </div>

    <div class="message">
      <div class="message__head">
        <div class="user-name">
          {{ message.userName }}
        </div>

        <div class="time">
          {{ message.time }}
        </div>
      </div>

      <div class="message__content">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>

import { Avatar } from '@element-plus/icons-vue'
export default {
  components: {
    Avatar
  },

  props: {
    message: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    gap: 16px;

    .message {
        display: flex;
        flex-direction: column;
        gap: 12px;

        &__head {
            display: flex;
            gap: 12px;

            .userName {
                color: #202124;
                font-weight: 500;
            }

            .time {
                color: #5f6368;
                font-size: 14px;
            }
        }
    }
}
</style>
