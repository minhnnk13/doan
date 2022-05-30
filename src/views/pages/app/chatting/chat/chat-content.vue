<template>
  <div class="items">
    <div
      class="item"
      v-for="(message, index) in messages"
      :key="index"
    >
      <div class="message">
        <chat-item :message="message" />
      </div>
    </div>
  </div>

  <div class="input-message">
    <input-message
      @onSubmit="addMessage"
    />
  </div>
</template>

<script>
import ChatItem from './chat-item.vue'
import InputMessage from './input-message.vue'
export default {

  components: { ChatItem, InputMessage },

  emits: ['addMessage'],

  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },

  setup (props, { emit }) {
    const addMessage = (message) => {
      emit('addMessage', message)
    }
    return {
      addMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
