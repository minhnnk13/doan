<template>
  <div
    class="warehouse"
    @click="$emit('handleOpenPopoverClick')"
  >
    <el-popover
      placement="bottom-start"
      :width="200"
      trigger="click"
      popper-class="popper-warehouse"
      ref="popperWarehouse"
    >
      <template #reference>
        <div>Nhập số lô</div>
      </template>
      <div
        class="add-option-container"
        @click="$emit('handleShowAddWarehouseClick')"
      >
        <el-icon class="icon-container">
          <plus />
        </el-icon>
        Thêm lô hạn sử dụng
      </div>
      <div
        class="warehouses-container"
        v-for="(warehouse, index) in warehouses"
        :key="index"
        @click="$emit('handleSelectExistedWarehouse', warehouse)"
      >
        <div class="warehouse-code">
          {{ `${warehouse.productBatchId} |` }}
        </div>
        <div class="created-date">
          {{ `${warehouse.createdDate} |` }}
        </div>
        <div class="quantity">
          {{ warehouse.quantity }}
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'
import { mapState } from 'vuex'
export default {
  components: {
    Plus
  },
  emits: ['handleShowAddWarehouseClick', 'handleOpenPopoverClick', 'handleSelectExistedWarehouse'],
  computed: {
    ...mapState('warehouse', ['warehouses'])
  }
}
</script>

<style lang="scss">
.add-option-container {
  cursor: pointer;
}

.warehouses-container {
  display: flex;
  cursor: pointer;

  div {
    margin-left: 4px;
  }
}
</style>
