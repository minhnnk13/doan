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
          :chats="chats"
          @addMessage="addMessage"
          @addNewChat="addNewChat"
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
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import TheChat from './chat'
import TheLog from './log'
import baseStore from '@/views/pages/base/base-store'

export default {
  components: { TheChat, TheLog },

  setup () {
    const activeTab = ref('chat')
    const config = reactive({
      storeConfig: {
        moduleName: 'chat',
        entityKey: 'id',
        entityName: 'Chats'
      }
    })
    const { loadData, store } = baseStore(config)

    const chats = computed(() => store.state[config.storeConfig.moduleName].chats)

    onMounted(async () => {
      await loadData()
    })

    const addMessage = (message, id) => {
      const params = {
        message: message,
        id: id
      }
      store.dispatch(`${config.storeConfig.moduleName}/addMessage`, params)
    }

    const addNewChat = (message) => {
      store.dispatch(`${config.storeConfig.moduleName}/addNewChat`, message)
    }

    const onCheck = id => {
      store.dispatch(`${config.storeConfig.moduleName}/completeChat`, id)
    }
    const deleteChat = id => {
      store.dispatch(`${config.storeConfig.moduleName}/deleteChat`, id)
    }
    const redirectChat = id => {
      const index = chats.value.findIndex(chat => chat.id === id)
      const chatContainerEL = document.querySelector('#chat-container')
      const chatEl = document.querySelector(`#chat-${index}`)
      activeTab.value = 'chat'
      nextTick(() => {
        chatContainerEL.scrollTo({ top: chatEl.offsetTop, behavior: 'smooth' })
      })
    }

    return {
      activeTab,
      chats,
      addMessage,
      addNewChat,
      onCheck,
      deleteChat,
      redirectChat
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
