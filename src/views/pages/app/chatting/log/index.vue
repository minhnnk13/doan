<template>
  <div class="log">
    <list-log
      @onCheck="onCheck"
      @deleteChat="deleteChat"
      @redirectChat="redirectChat"
    />
    <complete-log
      @deleteChat="deleteChat"
      @redirectChat="redirectChat"
    />
  </div>
</template>

<script>
import CompleteLog from './complete-log.vue'
import listLog from './list-log.vue'
export default {
  components: { listLog, CompleteLog },
  props: {
    chats: {
      type: Array,
      default: () => []
    }
  },

  emits: ['onCheck', 'deleteChat', 'redirectChat'],

  setup (props, { emit }) {
    const onCheck = id => {
      emit('onCheck', id)
    }

    const deleteChat = id => {
      emit('deleteChat', id)
    }

    const redirectChat = id => {
      emit('redirectChat', id)
    }
    return {
      onCheck,
      deleteChat,
      redirectChat
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  height: calc(100vh - 160px);
  overflow: auto;
}
</style>
