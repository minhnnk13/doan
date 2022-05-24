<template>
  <div class="pay">
    <div
      class="head"
      v-if="order.status === $enumeration.OrderStatus.Complete"
    >
      <div class="title">
        <el-icon class="complete">
          <CircleCheck />
        </el-icon>
        Đơn hàng đã được thanh toán toàn bộ
      </div>
    </div>

    <div
      class="head"
      v-else
    >
      <div class="title">
        <el-icon><credit-card /></el-icon>
        Đơn hàng chờ thanh toán
      </div>

      <el-button @click="$emit('onPay')">
        Xác nhận thanh toán
      </el-button>
    </div>

    <div
      class="content"
      v-if="order.status === $enumeration.OrderStatus.Complete"
    >
      <div class="column">
        Xấc nhận thanh toán: <div class="price">
          {{ formatPrice(order.exportPrice) }}
        </div>
      </div>

      <div class="column">
        thành công
      </div>
    </div>
    <div
      class="content"
      v-else
    >
      <div class="column">
        Khách còn phải trả: <div class="price">
          {{ formatPrice(order.exportPrice) }}
        </div>
      </div>

      <div class="column">
        Đã thanh toán: <div class="price">
          0
        </div>
      </div>
      <div class="column">
        Còn phải trả: <div class="price">
          {{ formatPrice(order.exportPrice) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreditCard, CircleCheck } from '@element-plus/icons-vue'
import { defineProps } from 'vue'
import { formatPrice, defineEmits } from '@/common/common-fn'

defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})

defineEmits(['onPay'])
</script>

<style lang="scss" scoped>
.pay {
  padding: 24px;
  @include box-shadow();
  height: fit-content;
  background: #fff;

  .head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid #ccc;

    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      .el-icon {
        font-size: 32px;
      }

      .complete {
        color: rgb(96, 202, 105);
      }
    }
  }

  .content {
    display: flex;
    gap: 80px;
    padding-top: 12px;

    .column {
      display: flex;
      gap: 8px;

      .price {
        font-weight: 500;
      }
    }
  }
}
</style>
