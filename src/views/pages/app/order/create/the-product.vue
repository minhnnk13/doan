<template>
  <div class="customer">
    <div class="customer__head">
      <div class="customer__head__left">
        <div class="title">
          Thông tin khách hàng
        </div>
        <div class="content">
          <text-field
            placeholder="Tìm kiếm khách hàng theo SĐT, tên, mã khách hàng"
            v-model="textSearch"
          />
        </div>
      </div>
      <div class="customer__head__right">
        Thông tin khách hàng
      </div>
    </div>
    <div class="customer__content">
      <empty-customer />
    </div>
  </div>
</template>

<script>
import emptyCustomer from './components/empty-customer.vue'
export default {
  components: { emptyCustomer },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.customer {
   background: #fff;
   padding: 24px;
   display: flex;
   flex-direction: column;

   &__title {
     margin-bottom: 12px;

   }

   &__content {
     flex: 1;
   }
}
</style>
