<template>
  <div
    class="new-thread"
  >
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

        <div class="assign">
          <div class="label">
            Giao việc
          </div>
          <el-select
            v-model="userAssign"
            placeholder="Chọn nhân viên"
          >
            <el-option
              v-for="(user) in users"
              :key="user.id"
              :label="user.username"
              :value="user.id"
            />
          </el-select>
        </div>
        <div
          class="close"
          @click="handleComponent(false)"
        >
          <el-icon><close-bold /></el-icon>
        </div>
      </div>

      <input-message
        @onSubmit="addNewChat"
        placeholder="Nhập tiêu đề cuộc trò chuyện mới..."
      />
    </div>
  </div>
</template>

<script>
import { CloseBold, Plus } from '@element-plus/icons-vue'
import InputMessage from './input-message.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUserInfo } from '@/utils/auth'

const USER_MODULE = 'user'
export default {
  components: {
    CloseBold,
    Plus,
    InputMessage
  },

  emits: ['addNewChat'],

  setup (props, { emit }) {
    const store = useStore()
    const isActive = ref(false)
    const handleComponent = (value) => {
      isActive.value = value

      if (value) {
        store.dispatch(`${USER_MODULE}/getUsers`)
      }
    }
    const userID = ref(
      getUserInfo().userId
    )
    const userAssign = ref(userID.value)

    const addNewChat = message => {
      const param = {
        title: message,
        createBy: userID.value,
        assignTo: userAssign.value
      }
      emit('addNewChat', param)
    }
    const users = computed(() => store.state[USER_MODULE].users)

    return {
      isActive,
      handleComponent,
      addNewChat,
      users,
      userAssign
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
            position: relative;
            align-items: center;

            .assign {
              position: absolute;
              right: 80px;
              display: flex;
              align-items: center;
              gap: 12px;

              .el-select {
                width: 160px;
              }
            }
            .close {
                cursor: pointer;
            }
        }

    }
}
</style>
