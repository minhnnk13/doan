<template>
  <div class="customer-selected">
    <div class="customer-selected__head">
      <div class="customer-selected__head__name">
        {{ customer.customerName }}
      </div>
      -

      <div class="customer-selected__head__phone">
        {{ customer.customerPhone }}
      </div>

      <div
        v-if="!$route.query.exportID || editMode"
        class="customer-selected__head__remove"
        @click="$emit('removeCustomer')"
      >
        <el-icon><close-bold /></el-icon>
      </div>
    </div>
    <div class="customer-selected__ship">
      Địa chỉ giao hàng
      <!-- <el-button type="text">
        Thay đổi
      </el-button> -->
    </div>
    <div class="customer-selected__content">
      <div>
        <div class="customer-selected__content__phone">
          {{ customer.customerPhone }}
        </div>

        <div class="customer-selected__content__address">
          {{ customer.customerAddress }}
        </div>
      </div>

      <div class="history">
        <div class="row">
          <div class="head">
            Nợ phải thu
          </div>
          <div class="content text-red">
            0
          </div>
        </div>

        <div class="row">
          <div class="head">
            Tổng chi tiêu
          </div>

          <div class="content">
            500.000
          </div>
        </div>

        <div class="row">
          <div class="head">
            Đơn mua
          </div>

          <div class="content">
            1
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, inject } from 'vue'
import { useStore } from 'vuex'
import { CloseBold } from '@element-plus/icons-vue'
const MODULENAME = 'customer'

const store = useStore()
const props = defineProps({
  customer: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['removeCustomer'])

const editMode = inject('editMode')
</script>

 <style lang="scss" scoped>
.customer-selected {
  &__head {
    display: flex;
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px solid;

    &__name {
      color: #409eff;
    }

    &__remove {
      color: #409eff;
      cursor: pointer;
    }
  }

  &__ship {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }

  &__content {
    display: flex;
    justify-content: space-between;

    .history {
      width: 220px;
      border: 1px dashed ;
      margin-right: 40px;
      display: grid;
      grid-template-rows: 1fr;
      gap: 8px;
      padding: 12px;

      .row {
        display: flex;
        justify-content: space-between;
        padding: 8 px;

        .content {
          color: #409eff;
        }

        .text-red {
          color: red ;
        }

        &:last-child {
          background: #D4E8FF;
        }
      }
    }

    &__phone {
      margin-bottom: 12px;
      margin-top: 4px;
    }
  }
}
 </style>
