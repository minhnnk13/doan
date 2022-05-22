<template>
  <el-dialog
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :append-to-body="true"
    :show-close="false"
    v-model="dialogVisible"
    :title="`Thêm lô sản phẩm: ${product?.productId}`"
    ref="dialog"
  >
    <div class="input-title">
      <div class="created-date">
        Ngày sản xuất
      </div>
      <div class="created-date">
        Ngày hết hạn
      </div>
      <div class="created-date">
        Số lượng
      </div>
    </div>
    <div class="input-value">
      <div class="created-date">
        <el-date-picker
          v-model="warehouse.createdDate"
          type="date"
          :autofocus="false"
        />
      </div>
      <div class="expired-date">
        <el-date-picker
          v-model="warehouse.expiredDate"
          type="date"
        />
      </div>

      <div class="created-date">
        <text-field
          :only-border-bottom="true"
          v-model="warehouse.quantity"
        />
      </div>
      <div
        class="delete-icon"
        @click="handleDeleteClick"
      >
        <el-icon><delete :style="{ height: '100%' }" /></el-icon>
      </div>
    </div>
    <div class="button-container">
      <span class="dialog-footer">
        <el-button @click="handleClosePopupClick">Thoát</el-button>
        <el-button
          type="primary"
          @click="handleSaveClick"
        > Thêm </el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
import { ref, computed, reactive, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
export default {
  components: { Delete },
  emits: ['calculatePrice'],
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    const store = useStore()
    const product = computed(() => store.state.import.productPopover)
    const supplier = computed(() => store.state.import.importSupplier)
    const currentWarehouseProduct = computed(() => store.state.warehouse.selectedProduct)
    const warehouse = reactive({
      createdDate: '',
      expiredDate: '',
      quantity: ''
    })

    const handleClosePopupClick = () => {
      dialogVisible.value = false
    }

    const handleOpenPopupClick = () => {
      dialogVisible.value = true
    }

    const handleSaveClick = () => {
      warehouse.price = product.value.unitPrice
      warehouse.productId = product.value.productId
      warehouse.supplierId = supplier.value.supplierId

      store.commit('import/setDateProduct', warehouse)
      store.commit('import/setSelectedWarehouse', warehouse)
      emit('calculatePrice', currentWarehouseProduct.value)
      handleClosePopupClick()
      ElMessage({
        type: 'success',
        message: 'Lưu thành công'
      })
    }

    const handleDeleteClick = () => {}

    return {
      handleSaveClick,
      handleOpenPopupClick,
      handleClosePopupClick,
      handleDeleteClick,
      dialogVisible,
      warehouse,
      product
    }
  }
}
</script>

<style lang="scss" scoped>
.add-info-title {
  font-weight: 700;
}
.input-title {
  display: flex;
  background-color: #f3f3f3;
  line-height: 24px;
  padding: 12px;

  div {
    width: 33%;
  }
}

.input-value {
  display: flex;
  div {
    margin-top: 12px;
    margin-right: 12px;
  }

  .delete-icon {
    height: 100%;
    cursor: pointer;
  }
}

.button-container {
  display: flex;
  margin-top: 12px;
  justify-content: flex-end;
}

:deep(.el-icon) {
  height: 24px;
  width: 24px;
}
</style>
