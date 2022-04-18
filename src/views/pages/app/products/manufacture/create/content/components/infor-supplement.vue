<template>
  <div class="supplement">
    <div class="supplement__title">
      Thông tin bổ sung
    </div>
    <div />
    <div class="supplement__fax">
      <text-field
        label="Số fax"
        v-model="fax"
      />
    </div>
    <div class="supplement__taxCode">
      <text-field
        label="Mã số thuế"
        v-model="taxCode"
      />
    </div>
    <div class="supplement__website">
      <text-field
        label="Website"
        v-model="website"
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
    const fax = computed({
      get: () => modelValue.value.fax,

      set: (value) => {
        const model = { ...modelValue.value }
        model.fax = value
        emit(UPDATE, model)
      }
    })

    const taxCode = computed({
      get: () => modelValue.value.taxCode,

      set: (value) => {
        const model = { ...modelValue.value }
        model.taxCode = value
        emit(UPDATE, model)
      }
    })

    const website = computed({
      get: () => modelValue.value.website,

      set: (value) => {
        const model = { ...modelValue.value }
        model.website = value
        emit(UPDATE, model)
      }
    })

    return {
      fax,
      taxCode,
      website

    }
  }
}
</script>

<style lang="scss" scoped>
.supplement {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fff;
  padding: 24px;
  gap: 24px;

  &__title {
      font-weight: bold;
  }

}
</style>
