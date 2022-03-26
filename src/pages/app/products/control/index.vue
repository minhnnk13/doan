<template>
  <the-header
    @onBackClick="handleBackClick"
    v-if="step != 0"
  />
  <component
    :is="components"
    @onCreateClick="handleCreateClick"
    @onConfirmListClick="handleConfirmListClick"
    @onCheckClick="handleCheckClick"
    @onFinishClick="handleFinishClick"
    @onBalanceClick="handleBalanceClick"
    @onConfirmBalanceClick="handleConfirmBalanceClick"
  />
</template>

<script>
// to do: sử dụng emits trong thằng con để thay đổi dữ liệu ở thằng cha
// tạo computed cho dynamic component
// viết hàm switch - case để đổi component
// truyền vào hàm emits
// computed lưu dữ liệu
import ImportControl from '@/views/pages/app/products/control/import-control.vue'
import CreateStep1 from '@/views/pages/app/products/control/create-step-1.vue'
import CreateStep2 from '@/views/pages/app/products/control/create-step-2.vue'
import CreateStep3 from '@/views/pages/app/products/control/create-step-3.vue'
import CreateStep4 from '@/views/pages/app/products/control/create-step-4.vue'
import CreateStep5 from '@/views/pages/app/products/control/create-step-5.vue'
import CreateStep6 from '@/views/pages/app/products/control/create-step-6.vue'
import TheHeader from '@/views/pages/app/products/control/the-header.vue'

import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'

const LIST = 0
const CREATE_STEP_1 = 1
const CREATE_STEP_2 = 2
const CREATE_STEP_3 = 3
const CREATE_STEP_4 = 4
const CREATE_STEP_5 = 5
const CREATE_STEP_6 = 6
export default {
  components: {
    ImportControl,
    TheHeader
  },
  setup () {
    // #data
    const step = ref(LIST)
    // #end-data

    // #computed
    const components = computed(() => {
      switch (step.value) {
        default:
          return ImportControl
        case CREATE_STEP_1:
          return CreateStep1
        case CREATE_STEP_2:
          return CreateStep2
        case CREATE_STEP_3:
          return CreateStep3
        case CREATE_STEP_4:
          return CreateStep4
        case CREATE_STEP_5:
          return CreateStep5
        case CREATE_STEP_6:
          return CreateStep6
      }
    })
    // #end-computed

    // #methods
    const handleCreateClick = () => {
      step.value = CREATE_STEP_1
    }

    const handleConfirmListClick = () => {
      step.value = CREATE_STEP_2
    }

    const handleCheckClick = () => {
      step.value = CREATE_STEP_3
    }

    const handleFinishClick = () => {
      step.value = CREATE_STEP_4
    }

    const handleBalanceClick = () => {
      step.value = CREATE_STEP_5
    }

    const handleConfirmBalanceClick = () => {
      step.value = CREATE_STEP_6
    }

    const handleBackClick = () => {
      step.value = LIST
    }

    // #endmethods
    return {
      components,
      handleCreateClick,
      handleConfirmListClick,
      handleCheckClick,
      handleFinishClick,
      handleBalanceClick,
      handleConfirmBalanceClick,
      step,
      handleBackClick
    }
  }
}
</script>

<style>

</style>
