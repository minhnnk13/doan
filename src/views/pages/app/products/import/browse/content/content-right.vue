<template>
  <div class="right">
    <product-information />
  </div>
</template>

<script>
import productInformation from '../../components/product-information.vue'
export default {
  components: { productInformation }

}
</script>

<style lang="scss" scoped>
.right {
    width: 310px;
    background: #fff;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .title {
        font-weight: bold;
    }

    .col {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

}
</style>
