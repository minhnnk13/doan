<template>
  <div class="information">
    <div class="title">
      Thông tin đơn hàng
    </div>

    <div class="content">
      <div class="row">
        <div class="head">
          Bán tại :
        </div>
        <div class="content">
          Chi nhánh mặc định
        </div>
      </div>
      <div class="row">
        <div class="head">
          Bán bởi :
        </div>
        <div class="content">
          (Tên nhân viên)
        </div>
      </div>
      <div class="row">
        <div class="head">
          Áp dụng thuế
        </div>
        <div class="content">
          Chưa áp dụng thuế
        </div>
      </div>
      <div class="row">
        <div class="head">
          Ngày bán
        </div>
        <div class="content">
          {{ new Date() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.information {
  padding: 24px;
  background: #fff;
  @include box-shadow();

  .title {
    font-weight: 500;
    margin-bottom: 12px;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
