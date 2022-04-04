<template>
  <div class="create-goods">
    <the-header>
      <template #toolbar>
        <div class="toolbar">
          <el-button
            type="primary"
            @click="handleOrderClick"
          >
            Đặt hàng
          </el-button>
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
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'
import { setImportInfo, getImportInfo } from '@/utils/import-storage.js'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'

const PRODUCT_MODULE = 'product'

export default {
  components: { TheHeader, TheContent },

  setup () {
    const inputSearch = ref('')
    const store = useStore()
    const router = useRouter()

    const params = computed(() => {
      return {
        pageIndex: 0,
        pageSize: 100,
        search: inputSearch.value
      }
    })

    const importProducts = computed(() => {
      return store.state.import.import
    })

    const importCode = (length = 7) => {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    }

    store.dispatch(`${PRODUCT_MODULE}/getProducts`, params.value)
    store.dispatch('supplier/getSuppliers')

    const handleOrderClick = async () => {
      if (!importProducts.value.importId) {
        importProducts.value.importId = importCode()
        importProducts.value.status = 0
        importProducts.value.createdDate = dayjs(new Date()).format('DD/MM/YYYY HH:mm')
      }

      await setImportInfo(importProducts.value)
      router.push({ name: 'BrowseGoods', params: { id: importProducts.value?.importId } })
      store.commit('multiple-screen-data/setImportCreateStep', 2)
    }

    return { handleOrderClick }
  }
}
</script>

<style>
</style>
