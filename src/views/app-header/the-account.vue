<template>
  <div class="account">
    <el-popover
      placement="bottom-start"
      :width="200"
      trigger="click"
      popper-class="popper-account"
      ref="popperAccount"
    >
      <template #reference>
        <div
          class="avatar"
          ref="accountSetup"
        >
          <img
            :src="avatar"
            width="42"
          >
        </div>
      </template>
      <div
        class="item"
        @click="onShowProfile"
      >
        <div class="profileIcon account-icon">
          <img
            :src="profileIcon"
          >
        </div>
        Tài khoản của thôi
      </div>

      <div
        class="item"
        @click="onLogout"
      >
        <div class="logout-icon account-icon">
          <img
            :src="logoutIcon"
          >
        </div>
        Đăng xuất
      </div>
    </el-popover>
  </div>
</template>

<script>
import { removeAuthToken } from '@/utils/auth'
import { redirectToApp } from '@/common/common-fn'
import { App } from '@/common/constant'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default {

  setup () {
    const router = useRouter()
    const avatar = require('@/assets/images/app/app-header/default-avatar.png')
    const logoutIcon = require('@/assets/images/app/app-header/logout.svg')
    const profileIcon = require('@/assets/images/app/app-header/profile.svg')
    const popperAccount = ref(null)

    const onLogout = () => {
      redirectToApp(App.account)
      removeAuthToken()
    }
    const onShowProfile = () => {
      router.push('profile')
      popperAccount.value.hide()
    }
    return {
      avatar,
      logoutIcon,
      profileIcon,
      popperAccount,
      onLogout,
      onShowProfile

    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  cursor: pointer;

}
</style>
<style lang="scss">
.popper-account {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    .account-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #c4c4c4;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color--primary;

      img {
        width: 36px;
      }
    }
  }

}
</style>
