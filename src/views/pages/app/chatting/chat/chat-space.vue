<template>
  <div>
    <div class="time">
      {{ date }}
    </div>
    <div
      class="space"
      ref="space"
    >
      <div
        class="topic"
      >
        <div class="user">
          {{ topic.createBy }}
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
        :topic="topic"
        @addMessage="addMessage"
        @showComments="showComments"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import ChatContent from './chat-content.vue'
import { ElLoading } from 'element-plus'

const MODULE_NAME = 'chat'
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
    const store = useStore()
    const createdDate = ref(new Date(topic.value.createdDate))
    const pageIndex = ref(0)
    const space = ref(null)
    const isLoading = ref(false)

    const date = ref(createdDate.value.toLocaleDateString('vi', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    const isShowComment = ref(false)
    const addMessage = (message) => {
      emit('addMessage', message, topic.value.topicId)
    }

    const showComments = async () => {
      if (isLoading.value) {
        // eslint-disable-next-line no-throw-literal
        throw ('isLoading')
      }
      const param = {
        topicId: topic.value.topicId,
        pageIndex: pageIndex.value
      }
      let loadingInstance = null

      isShowComment.value = true
      isLoading.value = true
      if (pageIndex.value === 0) {
        const container = space.value
        loadingInstance = ElLoading.service({
          target: container,
          fullscreen: false
        })
      } else {
        const container = document.querySelector('#viewmore-loading')
        loadingInstance = ElLoading.service({
          target: container,
          fullscreen: false,
          customClass: 'viewmore-loading'
        })
      }

      await store.dispatch(`${MODULE_NAME}/getComments`, param)

      loadingInstance.close()

      pageIndex.value++
      isLoading.value = false
    }

    return {
      addMessage,
      date,
      isShowComment,
      showComments,
      space
    }
  }

}
</script>
<style lang="scss">
.viewmore-loading {
  svg {
    width: 16px !important;
  }
}
</style>

<style lang="scss" scoped>
.time {
    text-align: center;
    margin-bottom: 4px;
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
      color: #202124;

      .user {
        font-weight: 500;
      }

      .line {
        width: 100%;
        height: 2px;
        background: #ccc;
      }
    }
}
</style>
