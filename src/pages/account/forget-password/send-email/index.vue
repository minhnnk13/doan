<template>
  <div class="check-email">
    <text-field
      placeholder="Địa chỉ email"
      v-model="data.email"
      :is-email="true"
      :allow-blank="false"
      :show-require="false"
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

    return {
      data

    }
  }
}
</script>

<style>

</style>
