<template>
  <div class="right">
    <infor-contact />
    <infor-address />
    <infor-supplement />
  </div>
</template>

<script>
import inforContact from './components/infor-contact.vue'
import InforAddress from './components/infor-address.vue'
import InforSupplement from './components/infor-supplement.vue'
export default {
  components: { inforContact, InforAddress, InforSupplement }
}
</script>

<style lang="scss" scoped>
.right {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    height: fit-content;
}
</style>
