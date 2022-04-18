<template>
  <div class="left">
    <div class="products">
      <div class="head">
        <div class="label">
          Thông tin sản phẩm trả
        </div>

        <el-checkbox label="Trả toàn bộ sản phẩm" />
      </div>

      <div
        class="list"
      >
        <products-table />
      </div>

      <result-product />
    </div>

    <receive-money />
  </div>
</template>

<script>
import ProductsTable from '../../components/products-table.vue'
import ReceiveMoney from '../../components/receive-money.vue'
import ResultProduct from '../../components/result-product.vue'

export default {
  components: {
    ProductsTable,
    ReceiveMoney,
    ResultProduct

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

    .head {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
