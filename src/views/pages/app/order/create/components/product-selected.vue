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
        <div class="image">
          <img
            :src="prop.row.image"
            width="100"
            height="60"
          >

          <el-button
            v-if="prop.row.canExpired"
            type="text"
            @click="onExpired(prop.row)"
          >
            Chọn lô
          </el-button>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Tên sản phẩm"
      prop="productName"
      width="300"
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
          :disabled="prop.row.canExpired || (!editMode && (typeof order.status === 'number'))"
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

  <ChooseBatchPopup ref="popup" />
  <ChooseQuantityPopup
    ref="quantityPopup"
    @onSaved="onSave"
  />
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, reactive, watch, toRefs, nextTick, inject } from 'vue'
import CommonFn, { formatPrice } from '@/common/common-fn.js'
import ChooseBatchPopup from './choose-batch-popup'
import ChooseQuantityPopup from './choose-batch-popup/choose-quantity-popup.vue'

const MODULE_NAME = 'order'
export default {
  components: {
    ChooseBatchPopup,
    ChooseQuantityPopup
  },

  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const store = useStore()

    const products = computed(() => store.state[MODULE_NAME].order.products)
    const toggleBatchQuantityPopup = computed(() => store.state[MODULE_NAME].toggleBatchQuantityPopup)
    const editMode = inject('editMode')
    const container = document.querySelector('.content')
    const popup = ref(null)
    const quantityPopup = ref(null)

    const deleteRow = (index) => {
      products.value.splice(index, 1)
    }

    const onExpired = async (product) => {
      CommonFn.showMask(container)
      await store.dispatch('order/getProductBatch', product.productId).then((res) => {
        popup.value.openPopup()
      })
      CommonFn.hideMask()
    }

    watch(toggleBatchQuantityPopup, () => {
      quantityPopup.value.openPopup()
    })

    const onSave = (batch) => {
      const productIndex = products.value.findIndex(product => product.productId === batch.productId)
      products.value[productIndex].saleQuantity = batch.saleQuantity
      products.value[productIndex].productBatch = batch.productBatchId
      popup.value.closePopup()
    }
    return {
      onExpired,
      products,
      deleteRow,
      formatPrice,
      editMode,
      popup,
      quantityPopup,
      onSave

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

.image {
  display: flex;
  flex-direction: column;
  justify-content: left;

  .el-button {
    width: 52px;
  }
}
</style>
