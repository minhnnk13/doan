<template>
  <div>
    <div class="time">
      Friday, 14 FEB
    </div>
    <div class="space">
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
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import ChatItem from './chat-item.vue'
import InputMessage from './input-message.vue'
export default {
  components: { ChatItem, InputMessage },

  emits: ['addMessage'],
  props: {
    messages: {
      type: Array,
      default: () => []
    },

    chatId: {
      type: Number,
      default: -1
    }
  },

  setup (props, { emit }) {
    const { chatId } = toRefs(props)
    const addMessage = (message) => {
      emit('addMessage', message, chatId.value)
    }
    return {
      addMessage
    }
  }

}
</script>

<style lang="scss" scoped>
.time {
    text-align: center;
}
.space {
    background: #fff;
    @include box-shadow();
    border-radius: 10px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .items {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}
</style>
