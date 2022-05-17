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
        Tạo đơn nhập hàng
      </template>
    </the-header>
    <the-content />
  </div>
</template>

<script>
import TheContent from './content'
import TheHeader from '../components/the-header.vue'
import { useStore } from 'vuex'
import { computed, ref, reactive, onBeforeUnmount } from 'vue'
import { setImportInfo, getImportInfo } from '@/utils/import-storage.js'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import enumeration from '@/common/enumeration.js'

const PRODUCT_MODULE = 'product'

export default {
  components: { TheHeader, TheContent },

  setup () {
    const inputSearch = ref('')
    const store = useStore()
    const router = useRouter()
    const orderConfirmed = false
    const params = computed(() => {
      return {
        pageIndex: 0,
        pageSize: 100,
        search: inputSearch.value
      }
    })

    const supplierParams = {
      pageIndex: 0,
      pageSize: 100,
      search: ''
    }

    const importProducts = computed(() => {
      return store.state.import.import
    })

    store.dispatch(`${PRODUCT_MODULE}/getProductsToImport`, params.value)
    store.dispatch('supplier/getSuppliers', supplierParams)

    const handleOrderClick = async () => {
      if (!importProducts.value.importId) {
        importProducts.value.importId = 1
        importProducts.value.status = 0
        importProducts.value.createdDate = dayjs(new Date()).format('DD/MM/YYYY HH:mm')
        importProducts.value.statusPayment = false
        importProducts.value.statusStore = false
        importProducts.value.statusImport = enumeration.status.Trading

        // to-do: xử lí đổi enum thành text
      }

      await setImportInfo(importProducts.value)
      router.push({ name: 'BrowseGoods', params: { id: importProducts.value?.importId } })
      store.commit('import/setImportCreateStep', 1)
    }

    return { handleOrderClick }
  }
}
</script>

<style>
</style>
