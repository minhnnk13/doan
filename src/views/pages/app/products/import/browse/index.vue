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
          <!-- to-do: thêm hàm check điều kiện để convert status -->
          <!-- v-if="!importInfo?.statusPayment?.toLowerCase().includes('đã thanh toán')" -->
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
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import enumeration from '@/common/enumeration.js'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import messageBox from '@/utils/message-box'
// to-do: Nếu sản phẩm chưa được lưu vào DB thì sẽ case theo status trong action để hiển thị đúng step
export default {
  components: { TheHeader, TheContent },
  setup () {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()

    if (!Number.isNaN(Number(route.params.id))) {
      store.dispatch('import/getImportDetail', route.params.id)
    }
    let importInfo = computed(() => {
      return store.state.import.import
    })

    if (!importInfo.value) {
      importInfo = getImportInfo(route.params.id)
    }

    const importCreateStep = computed(() => {
      return store.state.import.importCreateStep
    })

    // to-do: sửa lại format hiển thị id và ngày tháng
    onMounted(() => {
      // importProducts.value.statusImport = importProducts.value.status
      // importProducts.value.statusStore = importProducts.value.sttStore
    })

    const handleConfirmClick = () => {
      importInfo.value.status = enumeration.status.Trading
      importInfo.value.statusPayment = enumeration.status.Trading
      store.commit('import/setImportProducts', importInfo.value)
      setImportInfo(importInfo.value)
    }

    const handlePaymentClick = () => {
      if (!importInfo.value.readyForPayment) {
        store.commit('import/setImportCreateStep', 3)
        importInfo.value.readyForPayment = true
      } else {
        messageBox.showConfirm(
          'Bạn có đồng ý xác nhận thanh toán cho sản phẩm này?',
          callBackMessageBox,
          {
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Không'
          }
        )
      }
    }

    const callBackMessageBox = (action) => {
      if (action === 'cancel') return
      importInfo.value.status = enumeration.status.Finished
      importInfo.value.statusPayment = enumeration.status.Payment
      importInfo.value.statusImport = enumeration.status.Finished
      store.dispatch('import/createImport', importInfo.value)
    }

    const handleImportClick = () => {
      store.commit('import/setImportCreateStep', 3)
      importInfo.value.status = 11
      importInfo.value.statusStore = enumeration.status.Imported
      importInfo.value.readyForPayment = true
      store.commit('import/setImportProducts', importInfo.value)
      setImportInfo(importInfo.value)
    }

    onBeforeUnmount(() => {
      store.commit('import/setImportCreateStep', 1)
      store.commit('import/setDefaultImportProducts')
      store.commit('import/setImportSupplier', {})
      store.commit('import/setDefaultProductsToImport')
    })

    return { handleConfirmClick, importInfo, handleImportClick, handlePaymentClick, importCreateStep }
  }

}
</script>

<style>

</style>
