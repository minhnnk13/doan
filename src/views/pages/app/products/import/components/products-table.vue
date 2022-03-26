<template>
  <el-table
    table-layout="auto"
    :data="data"
    ref="tableRef"
  >
    <el-table-column label="Mã SKU" />
    <el-table-column label="Tên sản phẩm" />
    <el-table-column label="Đơn vị" />
    <el-table-column label="Số lượng" />
    <el-table-column label="Giá nhập" />
    <el-table-column label="Thuế(%)" />
    <el-table-column label="Thành tiền" />
  </el-table>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
