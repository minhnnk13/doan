<template>
  <div class="browse-goods">
    <the-header>
      <template #toolbar>
        <div class="toolbar">
          <el-button>
            Duyệt đơn
          </el-button>
        </div>
      </template>

      <template #title>
        <div class="title">
          PONO1234
        </div>
        <div class="date">
          23/02/20222 22:34
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
