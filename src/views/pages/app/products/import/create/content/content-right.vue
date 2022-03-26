<template>
  <div class="right">
    <div class="title">
      Thông tin đơn hàng
    </div>

    <div class="col">
      <div class="label">
        Mã đơn hàng
      </div>
      <text-field />
    </div>

    <div class="col">
      <div class="label">
        Chi nhánh
      </div>
      <el-select placeholder="Chi nhánh mặc định">
        <el-option />
      </el-select>
    </div>
    <div class="col">
      <div class="label">
        Chính sách giá
      </div>
      <el-select placeholder="Giá nhập">
        <el-option />
      </el-select>
    </div>
    <div class="col">
      <div class="label">
        Thuế
      </div>
      <el-select placeholder="Thuế">
        <el-option />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {

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
