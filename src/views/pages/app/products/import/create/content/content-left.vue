<template>
  <div class="left">
    <div class="manufacture">
      <div
        class="label"
      >
        Thông tin nhà cung cấp
      </div>
      <div
        class="search"
        v-if="false"
      >
        <el-autocomplete placeholder="Tìm kiếm nhà cung câp theo SĐT, tên, mã nhà cung cấp" />
      </div>

      <result-manufacture v-else />
    </div>

    <div class="products">
      <div class="search">
        <div class="label">
          Thông tin sản phẩm
        </div>

        <el-autocomplete placeholder="Tìm kiếm nhà cung câp theo SĐT, tên, mã nhà cung cấp" />
      </div>

      <div
        class="list"
      >
        <products-table />
      </div>

      <result-product />
    </div>

    <div class="ware-house">
      <div class="text">
        Nhập kho
      </div>
      <el-checkbox label="Nhập hàng vào kho" />
    </div>
  </div>
</template>

<script>
import ProductsTable from '../../components/products-table.vue'
import ResultManufacture from '../../components/result-manufacture.vue'

export default {
  components: {
    ResultManufacture,
    ProductsTable

  }

}
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;

  .manufacture {
    background: #fff;
    padding: 24px;
    .label {
      margin-bottom: 16px;
    }

    .search {
      :deep(.el-autocomplete) {
        width: 100%;
      }
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

  .ware-house {
    padding: 24px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
