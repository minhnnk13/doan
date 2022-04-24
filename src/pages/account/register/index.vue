<template>
  <the-container>
    <div
      class="register"
      ref="container"
    >
      <div class="title">
        Đăng ký
      </div>

      <base-form
        ref="form"
        class="form"
      >
        <div class="user-name">
          <text-field
            placeholder="Tên đăng nhập"
            label="Tên đăng nhập"
            v-model="account.username"
            :allow-blank="false"
            :show-require="false"
          />
        </div>
        <div class="user-name">
          <text-field
            placeholder="Tên của bạn"
            label="Tên hiển thị"
            v-model="account.name"
            :allow-blank="false"
            :show-require="false"
          />
        </div>
        <div class="email">
          <text-field
            placeholder="Email của bạn"
            label="email"
            v-model="account.email"
            :is-email="true"
            :allow-blank="false"
            :show-require="false"
          />
        </div>

        <div class="password">
          <text-field
            placeholder="Nhập mật khẩu"
            type="password"
            label="Mật khẩu"
            v-model="account.password"
            :show-password="true"
            :show-password-state="true"
            :allow-blank="false"
            :show-require="false"
          />
        </div>

        <!-- <div class="confirm-password">
          <text-field
            placeholder="Nhập lại mật khẩu"
            type="password"
            label="Nhập lại mất khẩu"
            v-model="account.password"
            :show-password="true"
            :show-password-state="true"
          />
        </div> -->

        <!-- <el-switch
          active-text="Duy trì đăng nhập"
          v-model="account.isActive"
        /> -->

        <el-button
          class="btn-login"
          type="info"
          @click="onRegister"
        >
          Đăng ký
        </el-button>
      </base-form>
      <div class="footer">
        Bạn có tài khoản?

        <router-link to="login">
          <el-button type="text">
            Đăng nhập ngay
          </el-button>
        </router-link>
      </div>
    </div>
  </the-container>
</template>

<script>
import { reactive } from 'vue'
import theContainer from '../common/the-container.vue'
import { useRouter } from 'vue-router'
import baseStore from '@/views/pages/base/base-store'
import { ElMessage } from 'element-plus'
import { focusFirstControl } from '@/common/common-fn'

const MODULE_NAME = 'auth'

export default {
  components: { theContainer },

  setup () {
    const { container, store, validate, showMask, hideMask } = baseStore()
    const router = useRouter()
    const account = reactive({
      username: null,
      email: null,
      password: null,
      isActive: true
    })

    const onRegister = async () => {
      if (!validate()) {
        return
      }
      showMask()
      const res = await store.dispatch(`${MODULE_NAME}/register`, account)
      if (res) {
        router.push('login')
      } else {
        focusFirstControl(container.value)
        ElMessage.error('Đăng ký không thành công, vui lòng thử lại sau')
      }
      hideMask()
    }
    return {
      account,
      onRegister,
      container
    }
  }

}
</script>

<style lang="scss" scoped>
.register {
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
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
