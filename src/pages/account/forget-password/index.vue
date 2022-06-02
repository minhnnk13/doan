<template>
  <the-container>
    <div
      class="reset-password"
      ref="container"
    >
      <div
        class="back"
        @click="$router.go(-1)"
      >
        <el-icon><Back /></el-icon>
      </div>
      <div
        class="title"
      >
        {{ componentActive.title }}
        <div
          class="subtitle"
          v-if="componentActive.subtitle"
        >
          {{ componentActive.subtitle }}
        </div>
      </div>

      <div
        class="hint"
        v-if="componentActive.hint"
      >
        {{ componentActive.hint }}
      </div>

      <base-form
        ref="form "
        class="form"
        @submit="onClick(componentActive.action)"
      >
        <component
          :is="componentActive.component"
          ref="formData"
        />
      </base-form>

      <el-button
        type="info"
        @click="onClick(componentActive.action)"
      >
        {{ componentActive.buttonName }}
      </el-button>
    </div>
  </the-container>
</template>

<script>
import { computed, reactive, ref } from 'vue'
// import TheContainer from ' @/src/pages/account/common/the-container.vue'
import TheContainer from '../common/the-container.vue'
import SendEmail from './send-email'
import CheckEmail from './check-email'
import ConfirmPassword from './confirm-password'
import { useRouter } from 'vue-router'

import baseStore from '@/views/pages/base/base-store'
import { ElMessage } from 'element-plus'
import { Back } from '@element-plus/icons-vue'
const MODULE_NAME = 'auth'

const component = {
  sendEmail: 0,
  checkEmail: 1,
  confirmPassword: 2
}
export default {

  components: {
    TheContainer,
    CheckEmail,
    Back
  },

  setup () {
    const router = useRouter()
    const email = computed(() => {
      return store.state[MODULE_NAME].currentEmail
    })
    const userName = ref('userName')
    const activeNumber = ref(0)
    const formData = ref(null)

    const { container, store, validate, showMask, hideMask } = baseStore()

    const sendEmail = async (data) => {
      let res = false

      res = await store.dispatch(`${MODULE_NAME}/sendEmail`, data)

      if (!res.data) {
        ElMessage.error('Email không tồn tại!')
      }

      return res.data
    }

    const goResetPassComponent = (data) => {
      store.commit(`${MODULE_NAME}/setToken`, data)
      return true
    }
    const submitResetPass = async (data) => {
      const res = await store.dispatch(`${MODULE_NAME}/changePassword`, data.newPassword)
      return res
    }

    const components = computed(() => [
      {
        active: component.sendEmail,
        component: SendEmail,
        title: 'Cài đặt lại mật khẩu',
        hint: 'Nhập địa chỉ email bạn đã dùng để đăng ký. Chúng tôi sẽ email cho bạn một liên kết để đăng nhập và đặt lại mật khẩu của bạn.',
        buttonName: 'Gửi',
        action: sendEmail
      }, {
        active: component.checkEmail,
        component: CheckEmail,
        title: 'Kiểm tra lại email của bạn',
        hint: `Chúng tôi đã gửi email đến ${email.value} Vui lòng kiểm tra hộp thư rác nếu bạn không thấy email trong hộp thư đến của mình.`,
        buttonName: 'Tiếp tục',
        action: goResetPassComponent
      }, {
        active: component.confirmPassword,
        component: ConfirmPassword,
        title: 'Cài đặt lại mật khẩu cho',
        subtitle: `(${userName.value})`,
        hint: null,
        buttonName: 'Xác nhận',
        action: submitResetPass
      }
    ])
    const componentActive = computed(() => {
      const component = components.value.find(element => element.active === activeNumber.value)
      return component
    })

    const onClick = async (callBback) => {
      // componentActive.value.action()
      const data = formData.value.data
      const isValid = validate()
      if (isValid) {
        showMask()
        const res = await callBback(data)

        if (res) {
          const MAX_STEP = 3

          if (activeNumber.value < MAX_STEP) {
            activeNumber.value += 1
          }

          if (activeNumber.value === MAX_STEP) {
            router.push('login')
          }
        }
        hideMask()
      }
    }

    return {
      email,
      componentActive,
      onClick,
      container,
      formData
    }
  }

}
</script>

<style lang="scss" scoped>
.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 820px;
  position: relative;

  .back {
    position: absolute;
    top: -8px;
    left: 0px;
    font-size: 24px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgb(236, 236, 236);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.1);
      transition: all .3s;
    }
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }

  .hint {
    background-attachment: fixed;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .el-button {
    width: 200px;
  }
}
</style>
