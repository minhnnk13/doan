<template>
  <div class="items">
    <div
      class="item"
      v-for="(message, index) in topic.comments"
      :key="index"
    >
      <div class="message">
        <chat-item :message="message" />
      </div>
    </div>
    <div
      class="view-more"
      v-if="isShowViewMore"
    >
      <div
        class="text"
        @click="$emit('showComments')"
      >
        Xem thêm
      </div>

      <div id="viewmore-loading" />
    </div>
  </div>

  <div class="input-message">
    <input-message
      @onSubmit="addMessage"
    />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import ChatItem from './chat-item.vue'
import InputMessage from './input-message.vue'
export default {

  components: { ChatItem, InputMessage },

  emits: ['addMessage', 'showComments'],

  props: {
    topic: {
      type: Object,
      default: () => {}
    }
  },

  setup (props, { emit }) {
    const { topic } = toRefs(props)
    const isShowViewMore = computed(() => {
      const result = topic.value.totalComment !== topic.value.comments?.length && topic.value.comments?.length

      return result
    })
    const addMessage = (message) => {
      emit('addMessage', message)
    }
    return {
      addMessage,
      isShowViewMore
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .view-more {
      display: flex;
      align-items: center;
      gap: 8px;

      .text {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
      #viewmore-loading {
        width: 16px;
        height: 16px;
      }
    }

}
</style>
