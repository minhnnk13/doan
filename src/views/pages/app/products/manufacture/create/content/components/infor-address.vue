<template>
  <div class="address">
    <div class="address__title">
      Thông tin địa chỉ
    </div>
    <div />
    <div class="address__tag">
      <text-field
        label="Nhãn"
        placeholder="VD: nơi thanh toán, nơi giao hàng"
        v-model="supplier.tag"
      />
    </div>
    <div class="address__address">
      <text-field
        label="Địa chỉ"
        :allow-blank="false"
        v-model="supplier.address"
      />
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {

  setup (props, { emit }) {
    const store = useStore()
    const supplier = computed(() => {
      return store.state.supplier.supplier
    })

    return {
      supplier
    }
  }
}
</script>

<style lang="scss" scoped>
.address {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
  padding: 24px;
  gap: 24px;

  &__title {
    font-weight: bold;
  }

  .label {
    margin-bottom: 4px;
  }
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
