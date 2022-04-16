<template>
  <div class="content">
    <div
      class="container"
      id="chat-container"
      @scroll="onScroll"
    >
      <chat-space
        v-for="(topic, index) in topics"
        :key="topic"
        :id="`chat-${index}`"
        @addMessage="addMessage"
        :topic="topic"
        @showComments="$emit('showComments', topic.topicId)"
      />

      <el-button
        type="text"
        class="view-more"
        @click="$emit('loadMoreTopic')"
        v-if="topics.length"
      >
        Xem thêm
      </el-button>
      <div
        v-else
        class="empty"
        style="text-align: center"
      >
        Không có dữ liệu
      </div>
    </div>

    <div
      class="loading"
      id="loadingContainer"
      ref="container"
    />
    <new-thread @addNewChat="addNewChat" />
  </div>
</template>

<script>
import ChatSpace from './chat-space.vue'
import NewThread from './new-thread.vue'
export default {
  components: {
    ChatSpace,
    NewThread
  },

  emits: ['addMessage', 'addNewChat', 'showComments', 'loadMoreTopic'],

  props: {
    topics: {
      type: Array,
      default: () => []
    }
  },

  setup (props, { emit }) {
    const addMessage = (message, id) => {
      emit('addMessage', message, id)
    }

    const addNewChat = (message) => {
      emit('addNewChat', message)
    }

    const onScroll = (event) => {
      const El = event.target
      const allowLoad = El.scrollHeight - El.clientHeight <= El.scrollTop
      if (allowLoad) {
        emit('loadMoreTopic')
      }
    }
    return {
      addMessage,
      addNewChat,
      onScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    padding: 0 100px;
    height: calc(100vh - 158px);
    overflow: hidden;
    position: relative;

    .loading {
      height: 24px;
      background: none;
    }
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
</style>
