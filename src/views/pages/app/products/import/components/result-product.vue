<template>
  <div class="result-product">
    <div class="table">
      <div>Số lượng</div>
      <div>(num)</div>

      <div>VAT(... %)</div>
      <div>(num)</div>

      <div>Tổng tiền</div>
      <div>(money)</div>

      <div>Tiền cần trả</div>
      <div>(money)</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.result-product {
    display: flex;
    justify-content: flex-end;
    .table {
    width: 200px;
    display: grid;
    column-gap: 12px;
    row-gap: 8px;
    grid-template-columns: 1fr 1fr;
    }
}
</style>
