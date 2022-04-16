<template>
  <div class="create-order">
    <the-customer />
    <the-product />
  </div>
</template>

<script>
import TheCustomer from './the-customer.vue'
import TheProduct from './the-product.vue'
export default {
  components: { TheCustomer, TheProduct }

}
</script>

<style lang="scss">
.create-order {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>
