<template>
  <div class="create-form-container">
    <edit-form />
  </div>
</template>
<script>
import EditForm from '@/views/pages/app/products/list/create/create-product.vue'
export default {
  components: { EditForm },
  setup () {}
}
</script>
<style lang="scss" scoped>
.create-form-container {
  height: 100%;
}
</style>
