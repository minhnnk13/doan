<template>
  <div>
    <div class="time">
      {{ date }}
    </div>
    <div class="space">
      <div
        class="topic"
      >
        <div class="user">
          {{ topic.assignTo }}
        </div>
        <div class="title">
          {{ topic.title }}
        </div>

        <el-button
          v-if="!isShowComment"
          type="text"
          @click="showComments"
        >
          Xem chi tiết
        </el-button>
        <span
          class="line"
          v-else
        />
      </div>
      <chat-content
        v-if="isShowComment"
        :messages="topic.content"
        @addMessage="addMessage"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, toRefs } from 'vue'
import ChatContent from './chat-content.vue'

export default {
  components: { ChatContent },

  emits: ['addMessage', 'showComments'],
  props: {
    topic: {
      type: Object,
      default: () => { }
    }
  },

  setup (props, { emit }) {
    const { topic } = toRefs(props)

    const createdDate = ref(new Date(topic.value.createdDate))

    const date = ref(createdDate.value.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    const isShowComment = ref(false)
    const addMessage = (message) => {
      emit('addMessage', message, topic.topicId)
    }

    const showComments = () => {
      isShowComment.value = true
      emit('showComments')
    }

    return {
      addMessage,
      date,
      isShowComment,
      showComments
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

    .topic {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .line {
        width: 100%;
        height: 2px;
        background: #ccc;
      }
    }
}
</style>
