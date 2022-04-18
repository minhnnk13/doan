<template>
  <div class="other">
    <div class="other__title">
      Thông tin khác
    </div>

    <div class="other__imployees">
      <div class="label">
        Nhân viên phụ trách
      </div>
      <el-select v-model="employee">
        <el-option>Chọn nhân viên</el-option>
      </el-select>
    </div>

    <div class="other__description">
      <div class="label">
        Mô tả
      </div>
      <text-field
        type="textarea"
        v-model="description"
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

    const employee = computed({
      get: () => modelValue.value.employee,

      set: (value) => {
        const model = { ...modelValue.value }
        model.employee = value
        emit(UPDATE, model)
      }
    })

    const description = computed({
      get: () => modelValue.value.description,

      set: (value) => {
        const model = { ...modelValue.value }
        model.description = value
        emit(UPDATE, model)
      }
    })

    return {
      employee,
      description
    }
  }
}
</script>

<style lang="scss" scoped>
.other {
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
  padding: 24px;
  gap: 24px;

.label {
    margin-bottom: 4px;
  }
  :deep(.el-select) {
    width: 100%;
  }

  &__title {
      font-weight: bold;
  }

}
</style>
