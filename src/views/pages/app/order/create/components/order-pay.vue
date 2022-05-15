<template>
  <div class="pay">
    <div class="head">
      <div class="title">
        <el-icon><credit-card /></el-icon>
        Đơn hàng chờ thanh toán
      </div>

      <el-button>
        Xác nhận thanh toán
      </el-button>
    </div>

    <div class="content">
      <div class="column">
        Khách còn phải trả: 1.333.333
      </div>

      <div class="column">
        Đã thanh toán: 0
      </div>
      <div class="column">
        Còn phải trả: 1.333.333
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreditCard } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.pay {
  padding: 24px;
  @include box-shadow();
  background: #fff;

  .head {
    display: flex;
    justify-content: space-between;
  }

  .content {
    display: flex;
    gap: 40px;
  }
}
</style>
