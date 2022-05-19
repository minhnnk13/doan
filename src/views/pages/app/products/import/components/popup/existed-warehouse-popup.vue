<template>
  <el-dialog
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :append-to-body="true"
    :show-close="false"
    v-model="dialogVisible"
    :title="`Nhập hàng cho lô: ${warehouse.warehouseId}`"
    ref="dialog"
  >
    <div class="id-created-container">
      <div class="created-date">
        <text-field
          v-model="warehouse.warehouseId"
          :label="'Số lô'"
          disabled
        />
      </div>
      <div class="created-date">
        <text-field
          v-model="warehouse.createdDate"
          :label="'Ngày sản xuất'"
          disabled
        />
      </div>
    </div>
    <div class="expired-container">
      <div class="created-date">
        <text-field
          :label="'Tồn kho'"
          v-model="warehouse.quantity"
          disabled
        />
      </div>
      <div class="created-date">
        <text-field
          :label="'Hạn sử dụng'"
          v-model="warehouse.expiredDate"
          disabled
        />
      </div>
    </div>

    <div class="quantity">
      <text-field
        :label="'Số lượng nhập'"
        v-model="warehouse.addedQuantity"
        :is-number="true"
        :alow-blank="false"
      />
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

export default {
  emits: ['calculatePrice'],
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    const store = useStore()

    const warehouse = computed(() => store.state.warehouse.selectedWarehouse)
    const supplier = computed(() => store.state.import.importSupplier)
    const currentWarehouseProduct = computed(() => store.state.warehouse.selectedProduct)
    const handleClosePopupClick = () => {
      dialogVisible.value = false
    }

    const handleOpenPopupClick = () => {
      dialogVisible.value = true
    }

    const handleSaveClick = () => {
      warehouse.value.supplierId = supplier.value.supplierId

      ElMessage({
        type: 'success',
        message: 'Lưu thành công'
      })
      if (warehouse.value.addedQuantity) warehouse.value.quantity = Number(warehouse.value.quantity) + Number(warehouse.value.addedQuantity)
      store.commit('import/setDateProduct', warehouse.value)
      emit('calculatePrice', currentWarehouseProduct.value)

      handleClosePopupClick()
    }

    const handleDeleteClick = () => {}

    return {
      handleSaveClick,
      handleOpenPopupClick,
      handleClosePopupClick,
      handleDeleteClick,
      dialogVisible,
      warehouse
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
    // margin-right: 80px;
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

.id-created-container, .expired-container, .quantity {
 display: flex;
 div {
   margin-top: 12px;
   margin-right: 12px;
 }
}
</style>
