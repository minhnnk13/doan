<template>
  <div class="overview">
    <div class="lable">
      Tổng tiền ({{ totalProduct }} sản phẩm)
    </div>
    <div class="content">
      {{ totalPay }}
    </div>
    <div class="lable">
      Khách phải trả
    </div>
    <div class="content">
      {{ totalPay }}
    </div>
    <div class="lable">
      Tổng tiền ({{ totalProduct }} sản phẩm)
    </div>
    <div class="content">
      {{ totalPay }}
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
