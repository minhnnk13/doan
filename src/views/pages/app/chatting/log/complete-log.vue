<template>
  <div class="complete-logs">
    <el-table
      table-layout="auto"
      ref="tableRef"
      :data="topics"
    >
      <el-table-column width="40">
        <template #default>
          <div class="icon">
            <el-icon><check /></el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Đã Hoàn thành"
        prop="title"
      />
      <el-table-column
        prop="date"
        label=""
      />
      <el-table-column
        prop="assign"
        label=""
      />
      <el-table-column width="100">
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
import { Check, ChatDotRound, Delete } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue-demi'
const MODULE_NAME = 'chat'

export default {
  components: {
    Check,
    ChatDotRound,
    Delete
  },

  emits: ['redirectChat', 'deleteChat'],

  setup () {
    const store = useStore()

    const topics = computed(() => store.getters[`${MODULE_NAME}/doneTopics`])
    return {
      topics
    }
  }
}
</script>
<style lang="scss" scoped>
.complete-logs {
  .action {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 24px;
  }

  .operation {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
  }

  .icon {
    font-size: 24px;
  }
}
</style>
