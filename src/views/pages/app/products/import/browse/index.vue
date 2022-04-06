<template>
  <div class="browse-goods">
    <the-header>
      <template #toolbar>
        <div
          class="toolbar"
          v-if="importInfo.status === 0"
        >
          <el-button
            type="primary"
            @click="handleConfirmClick"
          >
            Duyệt đơn
          </el-button>
        </div>
        <div
          class="toolbar"
          v-else
        >
          <el-button
            @click="handlePaymentClick"
          >
            Xác nhận thanh toán
          </el-button>
          <el-button
            type="primary"
            v-if="importCreateStep === 2"
            @click="handleImportClick"
          >
            Nhập kho
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
import { useStore } from 'vuex'
import enumeration from '@/common/enumeration.js'
import { computed } from 'vue'

export default {
  components: { TheHeader, TheContent },
  setup () {
    const route = useRoute()
    const store = useStore()
    const importProducts = getImportInfo(route.params.id)
    const importInfo = computed(() => {
      return store.state.import.import
    })
    const importCreateStep = computed(() => {
      return store.state['multiple-screen-data'].importCreateStep
    })
    // to-do: sửa lại format hiển thị id và ngày tháng

    const handleConfirmClick = () => {
      importProducts.status = enumeration.status.Trading
      importProducts.statusStore = enumeration.status.Trading
      store.commit('import/setImportProducts', importProducts)
      setImportInfo(importProducts)
    }

    const handlePaymentClick = () => {
      if (!importProducts.readyForPayment) {
        store.commit('multiple-screen-data/setImportCreateStep', 3)
        importProducts.readyForPayment = true
      } else {
        store.commit('multiple-screen-data/setImportCreateStep', 4)
        importProducts.status = enumeration.status.Finished
        importProducts.statusStore = enumeration.status.Finished
        store.commit('import/setImportProducts', importProducts)
        store.dispatch('import/createImport', importProducts)
      }
    }

    const handleImportClick = () => {
      store.commit('multiple-screen-data/setImportCreateStep', 3)
      importProducts.status = 11
      importProducts.statusImport = 11
      importProducts.readyForPayment = true
      store.commit('import/setImportProducts', importProducts)
      setImportInfo(importProducts)
    }

    return { importProducts, handleConfirmClick, importInfo, handleImportClick, handlePaymentClick, importCreateStep }
  }

}
</script>

<style>

</style>
