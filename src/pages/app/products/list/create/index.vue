<template>
  <div class="create-form-container">
    <create-form />
  </div>
</template>
<script>
import CreateForm from '@/views/pages/app/products/list/create/create-product.vue'
export default {
  components: { CreateForm },
  setup () {}
}
</script>
<style lang="scss" scoped>
.create-form-container {
  height: 100%;
}
</style>
