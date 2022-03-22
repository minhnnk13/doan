<template>
  <div class="dialog-body">
    <div
      class="form"
    >
      <text-field
        label="Mật khẩu cũ"
        v-model="data.oldPassword"
        type="password"
      />
      <text-field
        label="Mật khẩu mới"
        v-model="data.newPassword"
        type="password"
      />
      <text-field
        label="Nhập lại mật khẩu mới"
        v-model="data.confirmPassword"
        :confirm-password="passwordConfirm"
        type="password"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'

export default {
  setup () {
    const data = reactive({
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    })
    const passwordConfirm = computed(() => data.newPassword)
    return {
      data,
      passwordConfirm
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
    .form {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 24px;
    }
}
</style>
