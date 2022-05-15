<template>
  <div class="customer-empty">
    <div class="head">
      <el-autocomplete
        v-model="textSearch"
        :fetch-suggestions="querySearchAsync"
        placeholder="Tìm kiếm khách hàng theo SĐT, tên, mã khách hàng"
        @select="handleSelect"
        :prefix-icon="searchIcon"
        :popper-append-to-body="true"
      >
        <template #default="{ item }">
          <div class="customer">
            <div class="customer__avatar">
              <img
                :src="avatar"
                width="42"
              >
            </div>
            <div class="customer__info">
              <div class="customer__info__name">
                {{ item.customerName }}
              </div>

              <div class="customer__info__phone">
                {{ item.customerPhone }}
              </div>
            </div>
          </div>
        </template>
      </el-autocomplete>

      <div
        class="add"
        @click="addCustomer"
      >
        <el-icon><circle-plus /></el-icon>
      </div>
    </div>
    <!-- <text-field
      placeholder="Tìm kiếm khách hàng theo SĐT, tên, mã khách hàng"
      v-model="textSearch"
      :prefix-icon="searchIcon"
    /> -->

    <div class="content">
      <div class="icon">
        <img
          :src="emptyIcon"
          width="100"
        >
      </div>

      <div class="hint">
        Chưa có thông tin khách hàng
      </div>
    </div>
  </div>

  <create-customer
    ref="customerCreate"
    @added="onAddedCustomer"
  />
</template>

<script>
import { onMounted, ref } from 'vue'
import { Search, CirclePlus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import CreateCustomer from '@/views/pages/app/customers/list/create'
const CUSTOMER_MODULE = 'customer'

export default {
  components: {
    CirclePlus,
    CreateCustomer
  },

  emits: ['selectCustomer'],

  setup (props, { emit }) {
    const store = useStore()
    const searchIcon = ref(Search)
    const textSearch = ref('')
    const emptyIcon = ref(require('@/assets/images/app/order/empty-customer.png'))
    const customers = ref(null)
    const avatar = require('@/assets/images/app/app-header/default-avatar.png')
    const customerCreate = ref(null)
    const handleSelect = (customer) => {
      emit('selectCustomer', customer)
    }

    const loadCustomers = () => {
      return store.dispatch(`${CUSTOMER_MODULE}/getCustomers`)
    }
    onMounted(() => {
      loadCustomers().then(data => {
        customers.value = data
      })
    })

    const createFilter = (queryString, customer) => {
      const FIELD_SEARCH = ['customerName', 'customerPhone', 'customerId']
      for (const key in customer) {
        if (FIELD_SEARCH.includes(key)) {
          const result = customer[key].toString().toLowerCase().includes(queryString.toLowerCase())

          if (result) {
            return true
          }
        }
      }
    }

    const querySearchAsync = (queryString, cb) => {
      const results = queryString
        ? customers.value.filter(customer => createFilter(queryString, customer))
        : customers.value
      cb(results)
    }

    const addCustomer = () => {
      customerCreate.value.openPopup()
    }

    const onAddedCustomer = (customer) => {
      emit('selectCustomer', customer)
    }

    return {
      avatar,
      handleSelect,
      textSearch,
      emptyIcon,
      searchIcon,
      querySearchAsync,
      addCustomer,
      customerCreate,
      onAddedCustomer
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-empty {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .head {
    display: flex;
    gap: 12px;

    :deep(.el-autocomplete) {
      flex: 1;
    }

    .add {
      font-size: 32px;
      cursor: pointer;
    }
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }

}

.customer {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #ccc;
  padding: 4px 0;

  &__avatar {
    height: 42px;
  }

  &__info {
    &__name,
    &__phone {
      line-height: 24px;
    }
  }
}
</style>
