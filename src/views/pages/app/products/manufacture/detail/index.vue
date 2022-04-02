<template>
  <div class="detail">
    <the-header />
    <personal-information />
    <detail-information />
  </div>
</template>

<script>
import DetailInformation from './detail-information.vue'
import PersonalInformation from './personal-information.vue'
import TheHeader from './the-header.vue'
export default {
  components: { TheHeader, PersonalInformation, DetailInformation }

}
</script>

<style lang="scss" scoped>
.detail {
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
</style>
