<template>
  <div class="new-thread">
    <div
      class="thumbnail"
      v-if="!isActive"
      @click="handleComponent(true)"
    >
      <el-icon><plus /></el-icon>
      <div class="text">
        Cuộc trò chuyện mới
      </div>
    </div>

    <div
      class="create"
      v-else
    >
      <div class="head">
        <div class="title">
          Cuộc trò chuyện mới
        </div>

        <div
          class="close"
          @click="handleComponent(false)"
        >
          <el-icon><close-bold /></el-icon>
        </div>
      </div>

      <input-message @onSubmit="addNewChat" />
    </div>
  </div>
</template>

<script>
import { CloseBold, Plus } from '@element-plus/icons-vue'
import InputMessage from './input-message.vue'
import { ref } from 'vue'
export default {
  components: {
    CloseBold,
    Plus,
    InputMessage
  },

  emits: ['addNewChat'],

  setup (props, { emit }) {
    const isActive = ref(false)
    const handleComponent = (value) => {
      isActive.value = value
    }

    const addNewChat = message => {
      emit('addNewChat', message)
    }
    return {
      isActive,
      handleComponent,
      addNewChat
    }
  }
}
</script>

<style lang="scss" scoped>
.new-thread {
    flex: 1;
    display: flex;
    align-items: center;

    .thumbnail {
        flex: 1;
        padding: 12px;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background: #fff;
        @include box-shadow();
        line-height: 17px;
        cursor: pointer;

        &:hover {
            background: rgb(241 243 244 / 75%);
        }

    }

    .create {
        background: #fff;
        border-radius: 10px;
        padding-bottom: 24px;
        flex: 1;

        .head {
            padding: 24px;
            display: flex;
            justify-content: space-between;
            .close {
                cursor: pointer;
            }
        }

    }
}
</style>
