<template>
  <div class="content">
    <div
      class="container"
      id="chat-container"
    >
      <chat-space
        v-for="(chat, index) in chats"
        :key="chat"
        :id="`chat-${index}`"
        :messages="chat.content"
        :chat-id="chat.id"
        @addMessage="addMessage"
      />
    </div>

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

  emits: ['addMessage', 'addNewChat'],

  props: {
    chats: {
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
    return {
      addMessage,
      addNewChat
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 200px;
    height: calc(100vh - 158px);
    overflow: hidden;
    position: relative;

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
