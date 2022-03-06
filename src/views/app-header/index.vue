<template>
  <div class="app-header">
    <div class="page-name">
      {{ pageName }}
    </div>
    <div class="account">
      <the-account />

      <div class="user-name">
        Xin chào
        {{ userName }}
        !
      </div>

      <div class="notify">
        <img
          :src="notifyIcon"
          width="42"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import theAccount from './the-account.vue'
export default {
  components: { theAccount },

  setup () {
    const route = useRoute()
    const pageName = computed(() => route.meta.pageName)
    const notifyIcon = require('@/assets/images/app/app-header/notify.png')
    const userName = ref('Admin')
    return {
      notifyIcon,
      pageName,
      userName
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
    padding: 0 24px;
    height: 56px;
    background-color: #fff;
    color: $color--primary;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .page-name {
        font-size: 30px;
    }

    .account {
        display: flex;
        align-items: center;
        gap: 20px;
    }
}
</style>
