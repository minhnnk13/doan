<template>
  <el-table
    table-layout="auto"
    header-cell-class-name="table-head"
    :data="data"
    :max-height="tableHeight"
    :show-header="isShowHeaderTable"
    @row-click="handleDetailClick"
    ref="tableRef"
  >
    <el-table-column
      label="Mã nhà cung cấp"
      prop="supplierCode"
    />
    <el-table-column
      label="Tên nhà cung cấp"
      prop="supplierName"
    />
    <el-table-column
      label="Email"
      prop="email"
    />
    <el-table-column
      label="Số điện thoại"
      prop="phone"
    />
    <el-table-column
      label="Trạng thái"
    >
      <template #default="prop">
        <div>
          <el-tag
            effect="dark"
            :type="checkStatus(prop.row).type"
          >
            {{ checkStatus(prop.row).label }}
          </el-tag>
        </div>
      </template>
    </el-table-column>

    <template #append>
      <slot name="pagination" />
    </template>
  </el-table>
</template>

<script>
import baseStore from '@/views/pages/base/base-store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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

  setup (props) {
    const tableHeight = ref(window.innerHeight - 300)
    const tableRef = ref(null)

    const router = useRouter()

    const handleDetailClick = (supplier) => {
      router.push({ name: 'DetailManufacture', params: { id: supplier?.supplierId } })
    }

    // to-do: check điều kiện hiển thị status
    const checkStatus = (supplier) => {
      if (supplier.status) {
        return {
          type: 'success',
          label: 'Đang giao dịch'
        }
      }
      return {
        type: 'danger',
        label: 'Ngừng giao dịch'
      }
    }

    return {
      tableHeight,
      tableRef,
      handleDetailClick,
      checkStatus
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
