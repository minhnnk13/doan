<template>
  <the-container>
    <div class="register">
      <div class="title">
        Đăng ký
      </div>

      <div class="form">
        <div class="user-name">
          <text-field
            placeholder="Your full name"
            label="Tên đăng nhập"
            v-model="account.UserName"
          />
        </div>
        <div class="email">
          <text-field
            placeholder="Your email address"
            label="email"
            v-model="account.Email"
          />
        </div>

        <div class="password">
          <text-field
            placeholder="Your password"
            type="password"
            label="Mật khẩu"
            v-model="account.Password"
          />
        </div>

        <el-switch
          active-text="Duy trì đăng nhập"
          v-model="account.IsActive"
        />

        <el-button
          class="btn-login"
          type="info"
          @click="onRegister"
        >
          Đăng ký
        </el-button>
      </div>
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
import { useStore } from 'vuex'

const MODULE_NAME = 'auth'

export default {
  components: { theContainer },

  setup () {
    const store = useStore()
    const router = useRouter()
    const account = reactive({
      UserName: null,
      Email: null,
      Password: null,
      IsActive: true
    })

    const onRegister = async () => {
      const res = await store.dispatch(`${MODULE_NAME}/register`, account)
      if (res) {
        router.push('login')
      }
    }
    return {
      account,
      onRegister
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
