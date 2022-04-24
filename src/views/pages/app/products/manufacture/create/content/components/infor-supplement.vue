<template>
  <div class="supplement">
    <div class="supplement__title">
      Thông tin bổ sung
    </div>
    <div />
    <div class="supplement__taxCode">
      <text-field
        label="Mã số thuế"
        :is-number="true"
        v-model="supplier.taxIdentificationNumber"
      />
    </div>
    <div class="supplement__website">
      <text-field
        label="Website"
        v-model="supplier.website"
      />
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {

  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const store = useStore()

    const supplier = computed(() => {
      return store.state.supplier.supplier
    })

    return {
      supplier
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
