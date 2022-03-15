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
      label="Ảnh"
      align="center"
    >
      <template #default="props">
        <img
          :src="props.row.image "
          width="100"
        >
      </template>
    </el-table-column>
    <el-table-column
      label="Tên phiên bản sản phẩm"
      width="200"
      prop="productName"
    />
    <el-table-column
      label="Có thể bán"
      prop="saleQuantity"
    />
    <el-table-column
      label="Tồn kho"
      prop="stockQuantity"
    />
    <el-table-column
      label="Ngày khởi tạo"
      prop="createDate"
    />
    <el-table-column
      label="Giá bán lẻ"
      prop="retailPrice"
    />
    <el-table-column
      label="Giá nhập"
      prop="unitPrice"
    />

    <el-table-column
      label="Giá bán buôn"
      prop="whosalePrice"
    />

    <template #append>
      <slot name="pagination" />
    </template>
  </el-table>
</template>

<script>

import baseStore from '@/views/pages/base/base-store'
import { ref } from 'vue'
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
