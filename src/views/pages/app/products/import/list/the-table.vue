<template>
  <el-table
    table-layout="auto"
    header-cell-class-name="table-head"
    :data="data"
    :max-height="tableHeight"
    @selection-change="$emit('handleSelectionChange', $event)"
    @row-click="handleDetailClick"
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
      prop="importID"
    />

    <el-table-column
      label="Tên nhà cung cấp"
      width="200"
      prop="supplier"
    />
    <!-- <el-table-column
      label="Chi nhánh"
      prop="branchName"
    /> -->
    <el-table-column
      label="Trạng thái"
      prop="status"
    >
      <template #default="prop">
        <div>
          <el-tag
            :type="checkStatus(prop.row).type"
          >
            {{ checkStatus(prop.row).label }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Thanh toán"
      prop="statusPayment"
    >
      <template #default="prop">
        <div>
          <el-tag
            :type="checkPaymentStatus(prop.row).type"
          >
            {{ checkPaymentStatus(prop.row).label }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Nhập kho"
    >
      <template #default="prop">
        <div>
          <el-tag
            :type="checkStoreStatus(prop.row).type"
          >
            {{ checkStoreStatus(prop.row).label }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Giá nhập"
      prop="renderImportPrice"
    />

    <el-table-column
      label="Nhân viên tạo"
      prop="user"
    />

    <template #append>
      <slot name="pagination" />
    </template>
  </el-table>
</template>

<script>

import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import enumeration from '@/common/enumeration.js'

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
    const router = useRouter()
    const store = useStore()

    const tableHeight = ref(
      window.innerHeight - 300
    )
    const tableRef = ref(null)

    const handleDetailClick = (importInfo) => {
      router.push({ name: 'BrowseGoods', params: { id: importInfo.importID } })
    }

    const checkPaymentStatus = (importInfo) => {
      if (importInfo.statusPayment) {
        return {
          type: 'success',
          label: 'Hoàn thành'
        }
      }
      return {
        label: 'Chưa thanh toán'
      }
    }

    const checkStoreStatus = (importInfo) => {
      if (importInfo.sttStore) {
        return {
          type: 'success',
          label: 'Đã nhập kho'
        }
      }
      return {
        label: 'Chưa hoàn thành'
      }
    }

    const checkStatus = (importInfo) => {
      switch (importInfo.status) {
        default: return {
          type: 'danger',
          label: 'Đã hủy'
        }
        case enumeration.status.Finished: return {
          type: 'success',
          label: 'Hoàn thành'
        }
        case enumeration.status.Confirmed:
        case enumeration.status.Trading: return {
          type: 'warning',
          label: 'Đang giao dịch'
        }
      }
    }

    return {
      tableHeight,
      tableRef,
      handleDetailClick,
      checkPaymentStatus,
      checkStoreStatus,
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
