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
        prop="date"
      />
      <el-table-column
        label="Người được giao"
        prop="assign"
      />
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
import { computed } from 'vue-demi'
const MODULE_NAME = 'chat'

export default {
  components: {
    Checked,
    ChatDotRound,
    Delete
  },

  emits: ['onCheck', 'redirectChat', 'deleteChat'],

  setup () {
    const store = useStore()

    const topics = computed(() => store.getters[`${MODULE_NAME}/notDoneTopics`])
    return {
      topics
    }
  }
}
</script>
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
