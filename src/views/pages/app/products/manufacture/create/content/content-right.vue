<template>
  <div class="left">
    <infor-other v-model="manufacture" />
    <advanced-setting v-model="manufacture" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import InforOther from './components/infor-other.vue'
import AdvancedSetting from './components/advanced-setting.vue'
export default {
  components: { InforOther, AdvancedSetting },

  setup () {
    const manufacture = reactive({})
    return {
      manufacture
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  height: fit-content ;
}
</style>
