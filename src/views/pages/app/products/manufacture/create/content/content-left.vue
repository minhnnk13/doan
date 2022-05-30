<template>
  <div class="right">
    <infor-contact v-model="manufacture" />
    <infor-address v-model="manufacture" />
    <infor-supplement v-model="manufacture" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import inforContact from './components/infor-contact.vue'
import InforAddress from './components/infor-address.vue'
import InforSupplement from './components/infor-supplement.vue'
export default {
  components: { inforContact, InforAddress, InforSupplement },

  setup () {
    const manufacture = reactive({})
    return {
      manufacture
    }
  }
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
