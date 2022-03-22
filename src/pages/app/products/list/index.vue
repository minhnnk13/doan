<template>
  <products-table class="product-table" />
</template>

<script>
import ProductsTable from '@/views/pages/app/products/list/products-table.vue'
import { useStore } from 'vuex'
import commonFn, { redirectToApp } from '@/common/common-fn'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const PRODUCT_MODULE = 'product'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductsTable },

  setup () {
    const store = useStore()
    const route = useRoute()
    return {}
  }
}
</script>

<style lang="scss" scoped>
.product-table {
  width: 100%;
  height: 100%;
}
</style>
