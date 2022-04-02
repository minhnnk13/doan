<template>
  <div>
    <div class="time">
      Friday, 14 FEB
    </div>
    <div class="space">
      <div class="items">
        <div
          class="item"
          v-for="item in 4"
          :key="item"
        >
          <div class="message">
            <chat-item :message="item" />
          </div>
        </div>
      </div>

      <div class="input-message">
        <input-message
          @onSubmit="addMessage"
          v-model="message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ChatItem from './chat-item.vue'
import InputMessage from './input-message.vue'
export default {
  components: { ChatItem, InputMessage },

  setup () {
    const message = ref(null)
    const addMessage = () => {
      alert('submit')
    }
    return {
      message,
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
