<template>
  <el-table
    table-layout="auto"
    :data="products"
    ref="tableRef"
  >
    <el-table-column label="Mã SKU">
      <template #default="prop">
        <div class="product-code-container">
          {{ prop.row.productCode }}
        </div>
        <div
          class="add-warehouse"
          v-if="prop.row.canExpired && isWarehouseSelected(prop.row.productId)"
        >
          <el-tag
            closable
            @close="handleDeleteBatch(prop.row)"
          >
            {{
              `${warehouse(prop.row.productId).productBatchId} | ${
                warehouse(prop.row.productId).createdDate
              } | ${warehouse(prop.row.productId).quantity}`
            }}
          </el-tag>
        </div>
        <div
          class="add-warehouse"
          v-if="prop.row.canExpired && !importCreateStep"
        >
          <!-- <el-icon class="icon-container">
            <plus @click="handleShowAddWarehouseClick" />
          </el-icon> -->
          <warehouse-popover
            @handleOpenPopoverClick="handleOpenPopoverClick(prop.row)"
            @handleShowAddWarehouseClick="handleShowAddWarehousePopupClick"
            @handleSelectExistedWarehouse="handleSelectExistedWarehouse"
          />
        </div>
      </template>
    </el-table-column>
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
      width="150"
      v-if="!importProducts.status && importProducts.status !== 0"
    >
      <template #default="prop">
        <text-field
          :only-border-bottom="true"
          v-model="prop.row.saleQuantity"
          @keyup="calculateSalePrice(prop.row)"
          :is-number="true"
          :disabled="prop.row.canExpired"
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
      width="150"
      v-if="!importProducts.status && importProducts.status !== 0"
    >
      <template #default="prop">
        <text-field
          :only-border-bottom="true"
          v-model="prop.row.unitPrice"
          @keyup="calculateSalePrice(prop.row)"
          :is-number="true"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="Giá nhập"
      width="100"
      prop="unitPrice"
      v-else
    />

    <el-table-column label="Thuế(%)">
      10%
    </el-table-column>
    <el-table-column
      label="Thành tiền"
      prop="renderPrice"
    />
    <el-table-column v-if="importCreateStep === 0">
      <template #default="prop">
        <el-icon
          class="delete-icon"
          @click="handleDeleteProductClick(prop.row)"
        >
          <close-bold />
        </el-icon>
      </template>
    </el-table-column>
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
        <div>
          {{ "VNĐ" }}
        </div>
      </div>
      <!-- <div class="amount">Tiền cần trả {{importProducts.saleQuantity}}</div> -->
    </div>
  </div>
  <warehouse-popup
    ref="showWarehousePopup"
    @calculatePrice="calculateSalePrice"
  />
  <existed-warehouse-popup
    ref="showExistedWarehousePopup"
    @calculatePrice="calculateSalePrice"
  />
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, reactive, watch } from 'vue'
import { formatPrice } from '@/common/common-fn.js'
import WarehousePopup from '@/views/pages/app/products/import/components/popup/warehouse-popup.vue'
import WarehousePopover from '@/views/pages/app/products/import/components/popover/warehouse-popover.vue'
import ExistedWarehousePopup from '@/views/pages/app/products/import/components/popup/existed-warehouse-popup.vue'
import { CloseBold } from '@element-plus/icons-vue'

export default {
  components: {
    WarehousePopup,
    WarehousePopover,
    ExistedWarehousePopup,
    CloseBold
  },
  setup () {
    const store = useStore()
    const products = computed(() => {
      return store.state.import.productsToImport
    })
    const showWarehousePopup = ref(null)
    const showExistedWarehousePopup = ref(null)

    const importProducts = computed(() => {
      return store.state.import.import
    })

    const warehouse = (productId) => {
      return warehouses.value.find((batch) => {
        return batch.productId === productId
      })
    }

    const warehouses = computed(() => {
      return store.state.warehouse.selectedWarehouses
    })

    const importCreateStep = computed(
      () => store.state.import.importCreateStep
    )

    const isWarehouseSelected = (productId) => {
      const batchCheck = warehouse(productId)
      return (
        batchCheck &&
        Object.keys(batchCheck).length !== 0 &&
        Object.getPrototypeOf(batchCheck) === Object.prototype
      )
    }

    const calculateSalePrice = (product) => {
      product.price = 0
      let tax = 0.1
      if (store.state.import.isTaxed) tax = 0
      if (product.saleQuantity) {
        product.price = product.unitPrice * Number(product.saleQuantity)
        product.price += product.price * tax
      }
      product.renderPrice = `${formatPrice(product.price)} VNĐ`
      store.commit('import/calculateTotalPrice')
    }

    const handleShowAddWarehousePopupClick = () => {
      showWarehousePopup.value.handleOpenPopupClick()
    }

    const handleSelectExistedWarehouse = (warehouse) => {
      showExistedWarehousePopup.value.handleOpenPopupClick()
      store.commit('warehouse/setSelectedWarehouse', warehouse)
    }

    const handleOpenPopoverClick = (product) => {
      store.commit('import/setProductPopover', product)
      store.dispatch('warehouse/getWarehouses', product.productId)
    }

    const handleDeleteBatch = (product) => {
      store.dispatch('warehouse/getWarehouses', product.productId)
      store.commit('import/setDefaultSaleQuantity', product.productId)
      calculateSalePrice(product)
      store.commit('warehouse/deleteSelectedWarehouse', product.productId)
    }

    const handleDeleteProductClick = (product) => {
      store.commit('import/deleteProductsToImport', product.productId)
    }

    watch(
      () => store.state.import.isTaxed,
      (newVal, oldVal) => {
        products.value.forEach((product) => {
          calculateSalePrice(product)
        })
      }
    )
    return {
      products,
      calculateSalePrice,
      importProducts,
      handleShowAddWarehousePopupClick,
      showWarehousePopup,
      showExistedWarehousePopup,
      handleOpenPopoverClick,
      handleSelectExistedWarehouse,
      isWarehouseSelected,
      warehouse,
      handleDeleteBatch,
      importCreateStep,
      handleDeleteProductClick
    }
  }
}
</script>

<style lang="scss" scoped>
.product-code-container {
  margin-top: 24px;
  margin-left: 12px;
  margin-right: 12px;
}

.add-warehouse {
  margin-left: 12px;
  color: gray;
  cursor: pointer;
}

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

.delete-icon {
  cursor: pointer;
}
</style>
