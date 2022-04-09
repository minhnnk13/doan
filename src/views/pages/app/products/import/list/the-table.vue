<template>
  <el-table
    table-layout="auto"
    header-cell-class-name="table-head"
    :data="data"
    :max-height="tableHeight"
    @selection-change="$emit('handleSelectionChange', $event)"
    :show-header="isShowHeaderTable"
    ref="tableRef"
  >
    <el-table-column
      type="selection"
      align="center"
    />
    <el-table-column
      label="Mã đơn"
      align="center"
      prop="importId"
    />

    <el-table-column
      label="Tên nhà cung cấp"
      width="200"
      prop="supplierName"
    />
    <el-table-column
      label="Chi nhánh"
      prop="branchName"
    />
    <el-table-column
      label="Trạng thái"
      prop="statusStore"
    />
    <el-table-column
      label="Thanh toán"
      prop="paymentName"
    />
    <el-table-column
      label="Nhập kho"
      prop="statusName"
    />
    <el-table-column
      label="Giá nhập"
      prop="importPrice"
    />

    <el-table-column
      label="Nhân viên tạo"
      prop="userName"
    />

    <template #append>
      <slot name="pagination" />
    </template>
  </el-table>
</template>

<script>

import baseStore from '@/views/pages/base/base-store'
import { ref, toRefs } from 'vue'
export default {
  emits: ['handleSelectionChange'],

  props: {
    data: {
      type: Array,
      default: () => []
    },

    isShowHeaderTable: {
      type: Boolean,
      default: true
    }
  },

  setup () {
    const tableHeight = ref(
      window.innerHeight - 300
    )
    const tableRef = ref(null)
    return {
      tableHeight,
      tableRef
    }
  }
}
</script>

<style lang="scss" scoped>

:deep(.el-table__inner-wrapper) {
    .table-head {
      background: rgba(217, 218, 218, 0.8);
    }

    .el-table__append-wrapper {
      display: flex;
      justify-content: flex-end;
      position: fixed;
      right: 24px;
      bottom: 24px;
    }
  }
</style>
