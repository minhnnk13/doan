<template>
  <div class="right">
    <div class="element">
      <div class="title">
        Nhà cung cấp
      </div>
      <div class="content">
        Tên nhà cung cấp
      </div>
    </div>

    <div class="element">
      <div class="title">
        Chi nhánh hoàn trả
      </div>
      <div class="content">
        Chi nhánh mặc định
      </div>
    </div>

    <div class="element">
      <div class="title">
        Lý do hoàn trả
      </div>
      <el-input type="textarea" />
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
    gap: 24px;

    .title {
        font-weight: bold;
        margin-bottom: 12px;
    }

}
</style>
