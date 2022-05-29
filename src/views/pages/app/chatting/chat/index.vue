<template>
  <div class="content">
    <div
      class="container"
      id="chat-container"
      @scroll="onScroll"
    >
      <chat-space
        v-for="(topic) in topics"
        :key="topic"
        :id="`chat-${topic.topicId}`"
        @addMessage="addMessage"
        :topic="topic"
      />

      <!-- <el-button
        type="text"
        class="view-more"
        @click="$emit('loadMoreTopic')"
        v-if="topics.length && !isLastPage"
      >
        Xem thêm
      </el-button> -->
      <div
        v-if="!topics.length"
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
import { useStore } from 'vuex'
import { computed } from 'vue'
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
    const store = useStore()
    const addMessage = (message, id) => {
      emit('addMessage', message, id)
    }

    const addNewChat = (message) => {
      emit('addNewChat', message)
    }

    const isLastPage = computed(() => store.getters['chat/isLastPage'])

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
      onScroll,
      isLastPage
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
      gap: 32px;
      height: calc(100% - 120px);
      overflow: auto;
      margin: 0 -16px;
      padding: 0 16px;
    }
}
</style>
