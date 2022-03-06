<template>
  <div class="check-email">
    <text-field
      placeholder="Địa chỉ email"
      v-model="data.email"
    />
    <div
      class="label"
      style="margin-top: 8px"
    >
      ĐỊA CHỈ EMAIL
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const data = reactive({
      email: null
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

<style>

</style>
