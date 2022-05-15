<template>
  <div class="bot-header">
    <div class="bot-header__left">
      <div class="bot-header__left__exportID">
        {{ order.exportID }}
      </div>
      <div class="bot-header__left__tag">
        <el-tag

          :type="tag.type"
          class="mx-1"
          effect="light"
        >
          {{ tag.label }}
        </el-tag>
      </div>
    </div>

    <div class="bot-header__right">
      <div class="bot-header__right__steps">
        <el-steps
          :active="1"
          align-center
        >
          <el-step title="Đặt hàng" />
          <el-step title="Duyệt" />
          <el-step title="Xuất kho" />
          <el-step title="Hoàn thành" />
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import Enumaration from '@/common/enumeration'
const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})

const tag = computed(() => {
  const data = {
    type: '',
    label: 'Đặt hàng'
  }

  switch (props.order.status) {
    case Enumaration.OrderStatus.Create:
      data.type = ''
      data.label = 'Đặt hàng '
      break
    case Enumaration.OrderStatus.Browse:
    case Enumaration.OrderStatus.Export:
      data.type = 'warning'
      data.label = 'Đang giao dịch'
      break

    case Enumaration.OrderStatus.Complete:
      data.type = 'success'
      data.label = 'Hoàn thành'
      break
  }

  return data
})
</script>

<style lang="scss" scoped>
.bot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  &__right {
    width: 400px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;

    &__exportID {
      font-weight: 700;
      font-size: 20px;
    }

  }
}
</style>
