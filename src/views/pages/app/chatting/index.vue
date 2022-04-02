<template>
  <div class="chatting">
    <el-tabs
      v-model="activeTab"
      class="chatting__tabs"
    >
      <el-tab-pane
        label="Chat"
        name="Chat"
      >
        <div class="content">
          <div class="container">
            <chat-space
              v-for="(item, index) in 4"
              :key="item"
              :id="`thread-${index}`"
            />
          </div>

          <new-thread />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="Log"
        name="Log"
      >
        <log-thread />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import ChatSpace from './chat-space.vue'
import NewThread from './new-thread.vue'
import LogThread from './log-thread.vue'
export default {
  components: { ChatSpace, NewThread, LogThread },

  setup () {
    const activeTab = ref('Chat')
    return {
      activeTab
    }
  }

}
</script>

<style lang="scss" scoped>
.chatting {

  &__tabs {
    .content {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 0 200px;
      height: calc(100vh - 158px);
      overflow: hidden;

      .container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        height: calc(100% - 120px);
        overflow: auto;
        margin: 0 -16px;
        padding: 0 16px;
      }
    }
  }
}
</style>
