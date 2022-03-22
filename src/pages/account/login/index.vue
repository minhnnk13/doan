<template>
  <the-container>
    <div
      class="login"
      ref="container"
    >
      <div class="title">
        Đăng nhập
      </div>

      <div class="logo">
        CompanyName
      </div>

      <base-form
        ref="form"
        class="form"
      >
        <div class="user-name">
          <text-field
            label="Tên đăng nhập"
            placeholder="Your full name"
            v-model="account.username"
            :allow-blank="false"
            :show-require="false"
          />
        </div>

        <div class="password">
          <text-field
            type="password"
            :show-password="true"
            placeholder="Your password"
            label="Mật khẩu"
            v-model="account.password"
            :allow-blank="false"
            :show-require="false"
          />
        </div>

        <div class="options">
          <el-switch
            active-text="Duy trì đăng nhập"
            v-model="account.isActive"
          />
          <div class="vertical" />
          <router-link to="forget-password">
            <el-button type="text">
              Quên mật khẩu
            </el-button>
          </router-link>
        </div>

        <el-button
          class="btn-login"
          type="info"
          @click="onLogin"
        >
          Đăng nhập
        </el-button>
      </base-form>
      <div class="footer">
        Bạn chưa có tài khoản
        <router-link to="register">
          <el-button
            type="text"
          >
            Đăng ký
          </el-button>
        </router-link>
      </div>
    </div>
  </the-container>
</template>

<script>
import { reactive, ref } from 'vue'
import TheContainer from '../common/the-container.vue'
import { setAuthToken, setUserInfo } from '@/utils/auth'
import { useRoute } from 'vue-router'
import commonFn, { redirectToApp, focusFirstControl } from '@/common/common-fn'
import { App } from '@/common/constant'
import baseStore from '@/views/pages/base/base-store'
import { ElMessage } from 'element-plus'

const MODULE_NAME = 'auth'

export default {
  components: { TheContainer },

  setup () {
    const { container, store, validate, showMask, hideMask } = baseStore()

    const route = useRoute()
    const account = reactive({
      username: null,
      password: null,
      isActive: true
    })

    const onLogin = async () => {
      if (!validate()) {
        return
      }
      showMask()
      const res = await store.dispatch(`${MODULE_NAME}/login`, account)
      if (res) {
        onLoginSuccess(res)
      } else {
        focusFirstControl(container.value)
        ElMessage.error('Tên tài khoản hoặc mật khẩu không đúng')
      }
      hideMask()
    }
    const onLoginSuccess = (loginInfo) => {
      const redirect = route.query.redirect
      setAuthToken(loginInfo.jwtToken)
      setUserInfo(loginInfo.account)
      redirectToApp(App.app, redirect)
    }
    return {
      account,
      onLogin,
      container
    }
  }

}
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding-bottom: 54px;

  .title {
    font-size: 28px;
    font-weight: 700;
  }

  .logo {
    font-size: 34px;
    font-weight: 700;
  }

  .form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 28px;

    .options {
      display: flex;
      align-items: center;
      gap: 20px;
      :deep(.el-switch__label) {
        font-weight: 700;
      }

      .vertical {
        height: 30px;
        width: 1px;
        background-color: #B5B1B1;
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
