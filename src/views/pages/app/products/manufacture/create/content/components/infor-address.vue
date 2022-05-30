<template>
  <div class="address">
    <div class="address__title">
      Thông tin địa chỉ
    </div>
    <div />
    <div class="address__tag">
      <text-field
        label="Nhãn"
        placeholder="VD: nơi thanh toán, nơi giao hàng"
        v-model="tag"
      />
    </div>
    <div class="address__area">
      <div class="label">
        Khu vực
      </div>
      <el-select>
        <el-option>Chọn tỉnh thành quận huyện</el-option>
      </el-select>
    </div>
    <div class="address__address">
      <text-field
        label="Địa chỉ"
        :allow-blank="false"
        v-model="address"
      />
    </div>
    <div class="address__wards">
      <div class="label">
        Phường xã
      </div>
      <el-select>
        <el-option>Chọn phường xã</el-option>
      </el-select>
    </div>
    <div class="address__next">
      <text-field
        label="Địa chỉ 2"
        v-model="nextAddress"
      />
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

const UPDATE = 'update:modelValue'

export default {

  emits: [UPDATE],

  props: {
    modelValue: {
      type: Object,
      default: () => {}
    }
  },

  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const tag = computed({
      get: () => modelValue.value.tag,

      set: (value) => {
        const model = { ...modelValue.value }
        model.tag = value
        emit(UPDATE, model)
      }
    })

    const area = computed({
      get: () => modelValue.value.area,

      set: (value) => {
        const model = { ...modelValue.value }
        model.area = value
        emit(UPDATE, model)
      }
    })

    const address = computed({
      get: () => modelValue.value.address,

      set: (value) => {
        const model = { ...modelValue.value }
        model.address = value
        emit(UPDATE, model)
      }
    })

    const nextAddress = computed({
      get: () => modelValue.value.nextAddress,

      set: (value) => {
        const model = { ...modelValue.value }
        model.nextAddress = value
        emit(UPDATE, model)
      }
    })
    return {
      tag,
      area,
      address,
      nextAddress
    }
  }
}
</script>

<style lang="scss" scoped>
.address {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
  padding: 24px;
  gap: 24px;

  &__title {
    font-weight: bold;
  }

  .label {
    margin-bottom: 4px;
  }
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
