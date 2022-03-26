<template>
  <component
    :is="components"
    @onCreateClick="handleCreateClick"
    @onConfirmListClick="handleConfirmListClick"
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
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'

const LIST = 0
const CREATE_STEP_1 = 1
const CREATE_STEP_2 = 2
const CREATE_STEP_3 = 3
const CREATE_STEP_4 = 4

export default {
  components: {
    ImportControl
  },
  setup () {
    // #data
    const step = ref(CREATE_STEP_2)
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
    // #endmethods
    return {
      components,
      handleCreateClick,
      handleConfirmListClick
    }
  }
}
</script>

<style>

</style>
