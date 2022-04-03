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
          {{ importProducts?.importId }}
        </div>
        <div class="date">
          {{ importProducts?.createdDate }}
        </div>
      </template>
    </the-header>

    <the-content />
  </div>
</template>

<script>
import TheHeader from '../components/the-header.vue'
import TheContent from './content'
import { setImportInfo, getImportInfo } from '@/utils/import-storage.js'
import { useRoute } from 'vue-router'
export default {
  components: { TheHeader, TheContent },
  setup () {
    const route = useRoute()
    const importProducts = getImportInfo(route.params.id)
    // to-do: sửa lại format hiển thị id và ngày tháng

    return { importProducts }
  }

}
</script>

<style>

</style>
