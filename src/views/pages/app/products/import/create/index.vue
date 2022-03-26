<template>
  <div class="create-goods">
    <the-header>
      <template #toolbar>
        <div class="toolbar">
          <router-link :to="{name: 'BrowseGoods', params: {id: '1'}}">
            <el-button type="primary">
              Đặt hàng
            </el-button>
          </router-link>
        </div>
      </template>

      <template #title>
        Tạo đơn hàng
      </template>
    </the-header>
    <the-content />
  </div>
</template>

<script>
import TheContent from './content'
import TheHeader from '../components/the-header.vue'
export default {
  components: { TheHeader, TheContent }

}
</script>

<style>

</style>
