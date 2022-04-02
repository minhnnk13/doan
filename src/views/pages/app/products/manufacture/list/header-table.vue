<template>
  <div
    class="header-table"
  >
    <el-checkbox
      v-model="checkedSelectProduct"
      @change="$emit('changeCBB', $event)"
    />

    Đã chọn {{ selectedNumber }} trên trang này

    <el-select
      v-model="selectedAction"
      placeholder="Chọn thao tác"
      @change="actionSelected($event)"
      ref="select"
    >
      <el-option
        v-for="(action, index) in actions"
        :key="index"
        :label="action.lable"
        :value="action.value"
      />
    </el-select>
  </div>

  <el-dialog
    title="Cập nhật tình trạng áp dụng thuế"
    width="500px"
    ref="dialog"
    custom-class="manage-warehouse-popup"
    :show-close="true"
    v-model="dialogVisible"
  >
    <p>Thao tác này sẽ cập nhật áp dụng thuế cho {{ selectedNumber }} sản phẩm.</p>
    <div>
      Chọn trạng thái muốn cập nhật:
      <el-select
        v-model="selectedDialogAction"
        placeholder="Chọn trạng thái"
        @change="actionSelected($event)"
      >
        <el-option
          v-for="(action, index) in actionDialogs"
          :key="index"
          :label="action.lable"
          :value="action.value"
        />
      </el-select>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="() => {dialogVisible = false}">Hủy</el-button>
        <el-button
          type="primary"
          @click="onSave"
        >
          Lưu
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, reactive, ref, toRefs, h } from 'vue'
import enumeration from '@/common/enumeration'
import messageBox from '@/utils/message-box'
import { ElMessage } from 'element-plus'

export default {
  emits: ['update:modelValue', 'changeCBB', 'clearSelected'],

  props: {
    selectedNumber: {
      type: Number,
      default: 0
    },

    modelValue: {
      type: Boolean,
      default: true
    }

  },

  setup (props, { emit }) {
    const { modelValue, selectedNumber } = toRefs(props)

    const selectedAction = ref(enumeration.actionManageWarehouse.None)
    const selectedDialogAction = ref(null)
    const dialogVisible = ref(false)
    const select = ref(null)

    const actions = reactive([
      {
        lable: 'Chọn thao tác',
        value: enumeration.actionManageWarehouse.None
      },
      {
        lable: 'Đang giao dịch',
        value: enumeration.actionManageWarehouse.ApplyTax
      },
      {
        lable: 'Ngừng giao dịch',
        value: enumeration.actionManageWarehouse.AllowSell
      },
      {
        lable: 'Xóa sản phẩm',
        value: enumeration.actionManageWarehouse.DeleteProduct
      }

    ])

    const actionDialogs = reactive([
      {
        lable: 'Áp dụng thuế',
        value: 0
      },
      {
        lable: 'Không áp dụng thuế',
        value: 1
      }
    ])
    const checkedSelectProduct = computed({
      get: () => {
        return modelValue.value
      },
      set: (value) => {
        emit('update:modelValue', value)
      }
    })

    const callbackMessageBox = (action) => {
      if (action === 'confirm') {
        ElMessage.success('Xóa thành công')
        emit('clearSelected')
      }

      selectedAction.value = enumeration.actionManageWarehouse.None
    }
    const actionSelected = (value) => {
      if (value === enumeration.actionManageWarehouse.ApplyTax) {
        dialogVisible.value = true
      } else if (value === enumeration.actionManageWarehouse.DeleteProduct) {
        messageBox.showConfirm(
          `Thao tác này sẽ xóa ${selectedNumber.value} bạn đã chọn. Thao tác này không thể khôi phục`,
          callbackMessageBox,
          {
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Thoát'
          }
        )
      }
    }

    return {
      actions,
      selectedAction,
      checkedSelectProduct,
      actionSelected,
      dialogVisible,
      actionDialogs,
      selectedDialogAction,
      select
    }
  }
}
</script>

<style lang="scss" scoped>
.header-table {
    height: 40px;
    display: flex;
    align-items: center;
    gap: 24px;
    padding-left: 16px;
    background: rgba(217, 218, 218, 0.8);;
  }
</style>
<style lang="scss">
.manage-warehouse-popup {
  .el-dialog__body {
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
