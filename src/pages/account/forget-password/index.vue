<template>
  <the-container>
    <div class="reset-password">
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

      <div class="form">
        <component
          :is="componentActive.component"
          ref="form"
        />
      </div>

      <el-button
        type="info"
        @click="onClick"
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
const component = {
  sendEmail: 0,
  checkEmail: 1,
  confirmPassword: 2
}
export default {

  components: {
    TheContainer,
    CheckEmail
  },

  setup () {
    const router = useRouter()
    const email = ref('abcdfads@mail.com')
    const userName = ref('userName')
    const activeNumber = ref(0)
    const form = ref({})

    const sendEmail = () => {
      //
    }

    const goResetPassComponent = () => {

    }
    const submitResetPass = () => {

    }

    const components = reactive([
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
      const component = components.find(element => element.active === activeNumber.value)
      return component
    })

    const onClick = () => {
      // componentActive.value.action()
      const MAX_STEP = 3
      if (activeNumber.value < MAX_STEP) {
        activeNumber.value += 1
      }

      if (activeNumber.value === MAX_STEP) {
        router.push('login')
      }
    }

    return {
      email,
      form,
      componentActive,
      onClick

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
