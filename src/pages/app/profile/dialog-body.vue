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
        type="password"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const data = reactive({
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    })
    return {
      data
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
