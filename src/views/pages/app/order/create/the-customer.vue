<template>
  <div class="customer">
    <div class="customer__title">
      Thông tin khách hàng
    </div>
    <div class="customer__content">
      <empty-customer
        v-if="!hasCustomer"
        @selectCustomer="selectCustomer"
      />
      <customer-selected
        v-else
        :customer="customer"
        @removeCustomer="removeCustomer"
      />
    </div>
  </div>
</template>

<script>
import EmptyCustomer from './components/empty-customer.vue'
import CustomerSelected from './components/customer-selected.vue'
import { computed, ref, watch } from 'vue'
export default {
  components: { EmptyCustomer, CustomerSelected },
  setup () {
    const customer = ref(null)
    const hasCustomer = computed(() => customer.value)

    const selectCustomer = value => {
      customer.value = value
    }

    const removeCustomer = () => {
      customer.value = null
    }
    return {
      hasCustomer,
      customer,
      selectCustomer,
      removeCustomer
    }
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
     font-weight: 500;

   }

   &__content {
     flex: 1;
   }
}
</style>
