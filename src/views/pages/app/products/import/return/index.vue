<template>
  <div class="return-goods">
    <the-header :is-show-steps="false">
      <template #toolbar>
        <div class="toolbar">
          <el-button type="primary">
            Hoàn trả
          </el-button>
        </div>
      </template>

      <template #title>
        <div class="title">
          Tạo hoàn trả cho đơn nhập PONO1234
        </div>
      </template>
    </the-header>

    <the-content />
  </div>
</template>

<script>
import TheHeader from '../components/the-header.vue'
import TheContent from './content'
export default {
  components: { TheHeader, TheContent }

}
</script>

<style>

</style>
