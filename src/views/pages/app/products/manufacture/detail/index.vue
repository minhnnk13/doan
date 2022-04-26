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
import { onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { TheHeader, PersonalInformation, DetailInformation },
  setup () {
    const store = useStore()

    onBeforeUnmount(() => {
      store.commit('supplier/setSupplier', {})
    })
  }

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
