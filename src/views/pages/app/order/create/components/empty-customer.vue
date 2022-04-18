<template>
  <div class="customer-empty">
    <text-field
      placeholder="Tìm kiếm khách hàng theo SĐT, tên, mã khách hàng"
      v-model="textSearch"
    />

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
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const textSearch = ref(null)
    const emptyIcon = ref(require('@/assets/images/app/order/empty-customer.png'))
    return {
      textSearch,
      emptyIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-empty {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
