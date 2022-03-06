<template>
  <div class="confirm-password">
    <text-field
      label="Mật khẩu mới"
      :show-password="true"
      v-model="data.newPassword"
    />
    <text-field
      label="Xác nhận mật khẩu"
      :show-password="true"
      v-model="data.confirmPassword"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const data = reactive({
      newPassword: null,
      confirmPassword: null
    })

    const validate = () => {
      return true
    }
    return {
      data,
      validate
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-password {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
