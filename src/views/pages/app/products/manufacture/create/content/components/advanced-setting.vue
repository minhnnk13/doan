<template>
  <div class="setting">
    <div class="setting__title">
      Cài đặt nâng cao
    </div>

    <div class="setting__default-cost">
      <div class="label">
        Giá mặc định
      </div>
      <el-select>
        <el-option>Giá nhập</el-option>
      </el-select>
    </div>

    <div class="setting__default-tax">
      <div class="label">
        Thuế mặc định
      </div>
      <el-select>
        <el-option>Chọn thuế mặc định</el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.setting {
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
  padding: 24px;
  gap: 24px;

  &__title {
      font-weight: bold;
  }

  .label {
    margin-bottom: 4px;
  }
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
