<template>
  <el-table
    table-layout="auto"
    :data="products"
    ref="tableRef"
  >
    <el-table-column
      type="index"
      width="50"
      label="STT"
    />
    <el-table-column
      label="Ảnh"
    >
      <template #default="prop">
        <img
          :src="prop.row.image"
          width="100"
          height="60"
        >
      </template>
    </el-table-column>
    <el-table-column
      label="Tên sản phẩm"
      prop="productName"
    />
    <el-table-column
      label="Số lượng"
      width="150"
    >
      <template #default="prop">
        <text-field
          :only-border-bottom="true"
          v-model="prop.row.saleQuantity"
          :is-number="true"
        />
      </template>
    </el-table-column>
    <!-- <el-table-column
      label="Số lượng"
      width="100"
      prop="saleQuantity"
      v-else
    /> -->
    <el-table-column
      label="Giá nhập"
      width="150"
    >
      <template #default="prop">
        <text-field
          :only-border-bottom="true"
          v-model="prop.row.unitPrice"
          :is-number="true"
          :disabled="true"
        />
      </template>
    </el-table-column>

    <el-table-column
      label="Thành tiền"
      width="300"
    >
      <template #default="prop">
        {{ `${formatPrice(prop.row.unitPrice * prop.row.saleQuantity)} VNĐ` }}
      </template>
    </el-table-column>

    <el-table-column
      width="50"
    >
      <template #default="scope">
        <el-button
          type="text"
          @click.prevent="deleteRow(scope.$index)"
        >
          X
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, reactive, watch, toRefs, nextTick } from 'vue'
import { formatPrice } from '@/common/common-fn.js'
const MODULE_NAME = 'order'
export default {

  setup (props) {
    const store = useStore()

    const products = computed(() => store.state[MODULE_NAME].order.products)

    const deleteRow = (index) => {
      products.value.splice(index, 1)
    }
    return {
      products,
      deleteRow,
      formatPrice
    }
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
