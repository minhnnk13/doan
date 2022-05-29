<template>
  <div class="chatting">
    <el-tabs
      v-model="activeTab"
      class="chatting__tabs"
    >
      <el-tab-pane
        label="Chat"
        name="chat"
      >
        <the-chat
          :topics="chats"
          @addMessage="addMessage"
          @addNewChat="addNewChat"
          @showComments="showComments"
          @loadMoreTopic="loadMoreTopic"
        />
      </el-tab-pane>
      <el-tab-pane
        label="Log"
        name="log"
      >
        <the-log
          @onCheck="onCheck"
          @deleteChat="deleteChat"
          @redirectChat="redirectChat"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, nextTick, onUnmounted } from 'vue'
import TheChat from './chat'
import TheLog from './log'
import baseStore from '@/views/pages/base/base-store'
import CommonFn from '@/common/common-fn'
import { getUserInfo } from '@/utils/auth'
export default {
  components: { TheChat, TheLog },

  setup () {
    const activeTab = ref('chat')
    const config = reactive({
      storeConfig: {
        moduleName: 'chat',
        entityKey: 'id',
        entityName: 'Topics'
      }
    })
    const pageConfig = reactive({
      pageIndex: 0,
      pageSize: 5
    })

    const userID = ref(
      getUserInfo().userId
    )
    const isLoading = ref(false)
    const isLastPage = computed(() => store.getters[`${config.storeConfig.moduleName}/isLastPage`])
    const { store } = baseStore(config)

    const chats = computed(() => store.state[config.storeConfig.moduleName].topics)

    const loadData = async () => {
      const container = document.querySelector('#loadingContainer')
      isLoading.value = true
      CommonFn.showMask(container)
      await store.dispatch(`${config.storeConfig.moduleName}/getTopics`, pageConfig)

      CommonFn.hideMask()
      isLoading.value = false
    }
    onMounted(async () => {
      await loadData()
    })

    const addMessage = (content, id) => {
      const params = {
        content: content,
        topicId: id,
        createBy: userID.value
      }

      store.dispatch(`${config.storeConfig.moduleName}/addComment`, params)
    }

    const addNewChat = (param) => {
      store.dispatch(`${config.storeConfig.moduleName}/addTopic`, param)
    }

    const onCheck = id => {
      store.dispatch(`${config.storeConfig.moduleName}/completeChat`, id)
    }
    const deleteChat = id => {
      store.dispatch(`${config.storeConfig.moduleName}/deleteTopic`, id)
    }
    const redirectChat = id => {
      const chatContainerEL = document.querySelector('#chat-container')
      const chatEl = document.querySelector(`#chat-${id}`)
      activeTab.value = 'chat'
      nextTick(() => {
        chatContainerEL.scrollTo({ top: chatEl.offsetTop, behavior: 'smooth' })
      })
    }

    const loadMoreTopic = async () => {
      if (!isLoading.value && !isLastPage.value) {
        pageConfig.pageIndex++
        await loadData()
      }
    }

    onUnmounted(() => {
      store.commit(`${config.storeConfig.moduleName}/clearData`)
    })

    return {
      activeTab,
      chats,
      addMessage,
      addNewChat,
      onCheck,
      deleteChat,
      redirectChat,
      loadMoreTopic

    }
  }
}
</script>

<style lang="scss" scoped>
.chatting {
  &__tabs {
  }
}
</style>
