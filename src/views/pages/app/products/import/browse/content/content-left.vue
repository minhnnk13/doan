<template>
  <div class="left">
    <div class="manufacture">
      <div
        class="label"
      >
        Thông tin nhà cung cấp
      </div>

      <result-manufacture />
    </div>

    <div class="products">
      <div class="search">
        <div class="label">
          Thông tin sản phẩm
        </div>

        <!-- <el-autocomplete placeholder="Tìm kiếm nhà cung câp theo SĐT, tên, mã nhà cung cấp" /> -->
      </div>

      <div
        class="list"
      >
        <products-table />
      </div>

      <result-product />
    </div>

    <the-payment v-if="!(currentStatus === 0)" />

    <the-warehouse v-if="!(currentStatus === 0)" />
  </div>
</template>

<script>
import ProductsTable from '../../components/products-table.vue'
import ResultManufacture from '../../components/result-manufacture.vue'
import ThePayment from '../../components/the-payment.vue'
import TheWarehouse from '../../components/the-warehouse.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { setImportInfo, getImportInfo } from '@/utils/import-storage.js'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    ResultManufacture,
    ProductsTable,
    ThePayment,
    TheWarehouse

  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const importProduct = getImportInfo(route.params.id)

    const currentStatus = importProduct.status
    return {
      currentStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  height: calc(100vh - 200px);
  overflow: auto;

  .manufacture {
    background: #fff;
    padding: 24px;
    .label {
      margin-bottom: 16px;
    }

  }

  .products {
    background: #fff;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .search {
      :deep(.el-autocomplete) {
        margin-top: 8px;
        width: 100%;
      }
    }
  }
}
</style>
