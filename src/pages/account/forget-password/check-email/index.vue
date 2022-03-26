<template>
  <text-field
    v-model="data"
  />
</template>

<script>
import { ref } from 'vue'

export default {

  setup (props, { emit }) {
    const data = ref(null)

    return {
      data
    }
  }
}
</script>

<style>

</style>
