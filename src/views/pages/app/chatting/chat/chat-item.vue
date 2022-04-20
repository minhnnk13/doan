<template>
  <div class="item">
    <div class="avatar">
      <el-icon><avatar /></el-icon>
    </div>

    <div class="message">
      <div class="message__head">
        <div class="user-name">
          {{ message.createBy }}
        </div>

        <div class="time">
          {{ dateFomat }}
        </div>
      </div>

      <div class="message__content">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script>

import { Avatar } from '@element-plus/icons-vue'
import { computed, toRefs } from 'vue'
export default {
  components: {
    Avatar
  },

  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },

  setup (props) {
    const { message } = toRefs(props)
    const dateFomat = computed(() => {
      const option = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }

      const date = new Date(message.value.createdDate)
      return date.toLocaleString('vi', option)
    })

    return {
      dateFomat
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
        color: #202124;

        &__head {
            display: flex;
            align-items: center;
            gap: 12px;

            .user-name {
                font-weight: 500;
            }

            .time {
                color: #5f6368;
                font-size: 14px;
                padding-top: 2px;
            }
        }
    }
}
</style>
