<template>
  <div class="left">
    <infor-other />
    <!-- <advanced-setting /> -->
  </div>
</template>

<script>
import InforOther from './components/infor-other.vue'
import AdvancedSetting from './components/advanced-setting.vue'
export default {
  components: { InforOther }
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
