<template>
  <div class="header">
    <div
      class="label"
      v-if="!$route.query.exportID"
    >
      Tạo đơn hàng
    </div>

    <div
      class="back"
      v-else
      @click="() => {$router.push({name: 'ListOrder'})}"
    >
      <el-icon><ArrowLeft /></el-icon> Quay lại danh sách đơn hàng
    </div>

    <div class="toolbar">
      <el-button
        @click="$emit(button.onClick)"
        :key="index"
        v-for="(button, index) in activeButtons.items"
        :type="button.type"
      >
        {{ button.label }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, inject, reactive } from 'vue'
import Enumeration from '@/common/enumeration'
import { ArrowLeft } from '@element-plus/icons-vue'
defineEmits([
  'onCreateOrder',
  'onExit',
  'onDestroyOrder',
  'onEditOrder',
  'onBrowseOrder',
  'onExportOrder',
  'onExchangeOrder',
  'onCancelEdit',
  'onSaveEdit'
])
const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})
const buttons = reactive(
  [
    {
      items: [
        {
          label: 'Thoát',
          type: '',
          onClick: 'onExit'
        },
        {
          label: 'Tạo đơn hàng',
          type: 'primary',
          onClick: 'onCreateOrder'
        }
      ]
    },
    {
      displayStatus: [Enumeration.OrderStatus.Create],
      items: [
        {
          label: 'Hủy đơn hàng',
          type: 'danger',
          onClick: 'onDestroyOrder'
        },
        {
          label: 'Sửa đơn hàng',
          type: '',
          onClick: 'onEditOrder'
        },
        {
          label: 'Duyệt đơn hàng',
          type: 'primary',
          onClick: 'onBrowseOrder'
        }
      ]
    },
    {
      displayStatus: [Enumeration.OrderStatus.Browse],
      items: [
        {
          label: 'Hủy đơn hàng',
          type: 'danger',
          onClick: 'onDestroyOrder'
        },
        {
          label: 'Xuất kho',
          type: 'primary',
          onClick: 'onExportOrder'
        }
      ]
    },
    {
      displayStatus: [Enumeration.OrderStatus.Complete, Enumeration.OrderStatus.Export],
      items: [
        {
          label: 'Đổi trả hàng',
          type: 'primary',
          onClick: 'onExchangeOrder'
        }
      ]
    }
  ]
)

const editMode = inject('editMode')
const activeButtons = computed(() => {
  const index = buttons.findIndex(item => item.displayStatus?.includes(props.order?.status))
  if (editMode.value) {
    return {
      items: [
        {
          type: '',
          label: 'Hủy ',
          onClick: 'onCancelEdit'
        },
        {
          label: 'Sửa',
          type: 'primary',
          onClick: 'onSaveEdit'
        }
      ]
    }
  }
  let data = null
  if (index === -1) {
    data = buttons[0]
  } else {
    data = buttons[index]
  }
  return data
})

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  background: #fff;
  margin: 0 -24px;
  margin-bottom: 24px;

  .label {
    color: #2D3748;
    font-weight: 700;
    font-size: 30px;
  }

  .back {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
