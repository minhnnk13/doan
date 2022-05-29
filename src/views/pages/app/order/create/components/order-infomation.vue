<template>
  <div class="information">
    <div class="title">
      Thông tin đơn hàng
    </div>

    <div class="information__content">
      <div class="row">
        <div class="head">
          Bán tại :
        </div>
        <div class="content">
          Chi nhánh mặc định
        </div>
      </div>
      <div class="row">
        <div class="head">
          Bán bởi :
        </div>
        <div class="content">
          {{ user.name }}
        </div>
      </div>
      <div
        class="row"
        v-if="mode === 0"
      >
        <div class="head">
          Áp dụng thuế:
        </div>
        <div class="content">
          Chưa bao gồm thuế
        </div>
      </div>
      <div
        class="row"
        v-if="mode === 0"
      >
        <div class="head">
          Ngày bán:
        </div>
        <div class="content">
          {{ formatDate(order.exportTime) }}
        </div>
      </div>

      <div
        class="row-1"
        v-if="mode === 1"
      >
        <div class="label">
          Áp dụng thuế:
        </div>
        <el-select
          v-model="order.paymentType"
        >
          <el-option
            label="Giá chưa áp dụng thuế"
            :value="1"
          />
          <el-option
            label="Giá đã bao gồm thuế"
            :value="2"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { formatDate } from '@/common/common-fn'
import { getUserInfo } from '@/utils/auth'
const MODULE_NAME = 'order'
const props = defineProps(
  {
    mode: {
      type: Number,
      default: 1
    }
  }
)
const store = useStore()
const user = ref(getUserInfo())
const order = computed(() => store.state[MODULE_NAME].order)
onMounted(() => {
  order.value.employee = user.value.userId
})
</script>

<style lang="scss" scoped>
.information {
  padding: 24px;
  background: #fff;
  @include box-shadow();
  width: 300px;

  .title {
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    .row {
      display: flex;
      gap: 12px;
    }

    .row-1 {
      .label {
        margin-bottom: 8px;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
