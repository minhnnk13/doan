<template>
  <el-table
    table-layout="auto"
    :data="products"
    ref="tableRef"
  >
    <el-table-column
      label="Mã SKU"
      prop="productCode"
    />
    <el-table-column
      label="Tên sản phẩm"
      prop="productName"
    />
    <el-table-column
      label="Đơn vị"
      prop="unitName"
    />
    <el-table-column
      label="Số lượng"
      width="100"
      v-if="!importProducts.status && importProducts.status !== 0"
    >
      <template #default="prop">
        <text-field
          :only-border-bottom="true"
          v-model="prop.row.saleQuantity"
          @keyup="calculateSalePrice(prop.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="Số lượng"
      width="100"
      prop="saleQuantity"
      v-else
    />
    <el-table-column
      label="Giá nhập"
      width="100"
      v-if="!importProducts.status && importProducts.status !== 0"
    >
      <template #default="prop">
        <text-field
          :only-border-bottom="true"
          v-model="prop.row.unitPrice"
          @keyup="calculateSalePrice(prop.row)"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="Giá nhập"
      width="100"
      prop="unitPrice"
      v-else
    />
    <!-- <el-table-column
      label="Giá nhập"
      prop="renderUnitPrice"
    /> -->

    <el-table-column label="Thuế(%)">
      10%
    </el-table-column>
    <el-table-column
      label="Thành tiền"
      prop="renderPrice"
    />
  </el-table>
  <div class="final-info-wrapper">
    <div class="final-info-container">
      <div class="amount">
        <div class="key">
          Số lượng
        </div>
        <div class="value">
          {{ importProducts.saleQuantity }}
        </div>
      </div>
      <div class="amount">
        <div class="key">
          Thuế
        </div>
        <div class="value">
          10%
        </div>
      </div>
      <div class="amount">
        <div class="key">
          Tổng tiền
        </div>
        <div class="value">
          {{ importProducts.renderImportPrice }}
        </div>
      </div>
      <!-- <div class="amount">Tiền cần trả {{importProducts.saleQuantity}}</div> -->
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'
import { formatPrice } from '@/common/common-fn.js'

export default {
  setup () {
    const store = useStore()
    const products = computed(() => {
      return store.state.import.import.productsToImport
    })

    const importProducts = computed(() => {
      return store.state.import.import
    })

    const calculateSalePrice = (product) => {
      product.price = 0
      if (product.saleQuantity) {
        product.price = product.unitPrice * Number(product.saleQuantity)
      }
      product.renderPrice = formatPrice(product.price)
      store.commit('import/calculateTotalPrice')
    }
    return { products, calculateSalePrice, importProducts }
  }
}
</script>

<style lang="scss" scoped>
.final-info-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .final-info-container {
    height: 160px;
    width: 30%;
    float: left;

    div {
      float: left;
      width: 100%;
      display: flex;
      margin-top: 12px;
    }
  }
}
</style>
