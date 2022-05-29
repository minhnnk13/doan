<template>
  <div class="logs">
    <el-table
      table-layout="auto"
      ref="tableRef"
      :data="topics"
    >
      <el-table-column width="40">
        <template #default="scope">
          <div
            class="complete action"
            @click="$emit('onCheck', scope.row.topicId)"
          >
            <el-tooltip
              placement="bottom"
              effect="dark"
              content="Hoàn thành"
            >
              <el-icon><checked /></el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Tiêu đề"
        prop="title"
      />
      <el-table-column
        label="Ngày"
        prop="createdDate"
      >
        <template #default="props">
          {{ formatDate(props.row.createdDate) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Người được giao"
        prop="assign"
      >
        <template #default="props">
          <el-popover
            placement="bottom"
            :width="200"
            trigger="click"
            :ref="`poper-${props.row.topicId}`"
          >
            <template #reference>
              <el-button type="text">
                {{ props.row.assignTo }}
              </el-button>
            </template>

            <template #default>
              <div class="select-assign">
                <div
                  class="option"
                  v-for="(user, index) in users"
                  :key="index"
                  @click="() => {
                    this.$refs[`poper-${props.row.topicId}`].hide()
                    editAssignTopic(props.row, user)
                  }"
                >
                  {{ user.name }}
                </div>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
      >
        <template #default="scope">
          <div
            class="operation"
          >
            <div
              class="chat action"
              @click="$emit('redirectChat', scope.row.topicId)"
            >
              <el-tooltip
                placement="bottom"
                effect="dark"
                content="Chi tiết"
              >
                <el-icon><chat-dot-round /></el-icon>
              </el-tooltip>
            </div>
            <div
              class="delete action"
              @click="$emit('deleteChat', scope.row.topicId)"
            >
              <el-tooltip
                placement="bottom"
                effect="dark"
                content="Xóa"
              >
                <el-icon><delete /></el-icon>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Checked, ChatDotRound, Delete } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue-demi'
import { getUserInfo } from '@/utils/auth'
const MODULE_NAME = 'chat'
const USER_MODULE = 'user'
export default {
  components: {
    Checked,
    ChatDotRound,
    Delete
  },

  emits: ['onCheck', 'redirectChat', 'deleteChat', 'onAssignTopic'],

  setup () {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch(`${USER_MODULE}/getUsers`)
    })
    const users = computed(() => store.state[USER_MODULE].users)
    const topics = computed(() => store.getters[`${MODULE_NAME}/notDoneTopics`])
    const userID = ref(
      getUserInfo().userId
    )
    const formatDate = createdDate => {
      const date = new Date(createdDate)

      return date.toLocaleString()
    }

    const editAssignTopic = async (topic, user) => {
      const param = { ...topic }
      param.createBy = userID.value
      param.assignTo = user.id

      await store.dispatch(`${MODULE_NAME}/editTopic`, param)
    }

    return {
      topics,
      formatDate,
      users,
      editAssignTopic
    }
  }
}
</script>

<style lang="scss">
.select-assign {
  .option {
      padding: 4px;
      cursor: pointer;
      &:hover {
        background: #ccc;
      }
    }
}
</style>
<style lang="scss" scoped>
.logs {
  .action {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 24px;

    &.complete {
      &:hover {
        color: #409eff;
      }
    }
  }

  .operation {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
  }

}
</style>
