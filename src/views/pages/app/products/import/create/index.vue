<template>
  <div class="create-goods">
    <the-header>
      <template #toolbar>
        <div class="toolbar">
          <router-link :to="{ name: 'BrowseGoods', params: { id: '1' } }">
            <el-button
              type="primary"
              @click="handleOrderClick"
            >
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
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'

const PRODUCT_MODULE = 'product'

export default {
  components: { TheHeader, TheContent },

  setup () {
    const inputSearch = ref('')
    const store = useStore()
    const params = computed(() => {
      return {
        pageIndex: 0,
        pageSize: 100,
        search: inputSearch.value
      }
    })

    store.dispatch(`${PRODUCT_MODULE}/getProducts`, params.value)
    store.dispatch('supplier/getSuppliers')

    const handleOrderClick = () => {
      // to-do: xử lí gen mã đơn hàng tự động + lưu sessionStorage
    }

    return { }
  }
}
</script>

<style>
</style>
