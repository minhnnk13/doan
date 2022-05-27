<template>
  <div class="browse-goods">
    <the-header>
      <template #toolbar>
        <div
          class="toolbar"
          v-if="
            importCreateStep === 1 &&
              importInfo.status === $enumeration.status.Trading
          "
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
            v-if="importCreateStep !== 4"
          >
            Xác nhận thanh toán
          </el-button>
          <el-button
            @click="handleEditClick"
            v-if="isLastStep"
          >
            Chỉnh sửa đơn nhập hàng
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
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import messageBox from '@/utils/message-box'
import { formatPrice } from '@/common/common-fn.js'
import { ElMessage } from 'element-plus'

// to-do: Nếu sản phẩm chưa được lưu vào DB thì sẽ case theo status trong action để hiển thị đúng step
export default {
  components: { TheHeader, TheContent },
  setup () {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()

    let importInfo = computed(() => {
      return store.state.import.import
    })

    if (!importInfo.value) {
      importInfo = getImportInfo(route.params.id)
    }

    const importCreateStep = computed(() => {
      return store.state.import.importCreateStep
    })

    const products = computed(() => {
      return store.state.import.productsToImport
    })

    const isLastStep = computed(() => {
      return (
        importInfo.value.status === enumeration.status.Finished ||
        importInfo.value.statusImport === enumeration.status.Finished
      )
    })

    const calculateSalePrice = (product) => {
      product.price = 0
      let tax = 0.1
      if (store.state.import.isTaxed) tax = 0
      if (product.saleQuantity) {
        product.price = product.unitPrice * Number(product.saleQuantity)
        product.price += product.price * tax
      }
      product.renderPrice = `${formatPrice(product.price)} VNĐ`
      store.commit('import/calculateTotalPrice')
    }

    // to-do: sửa lại format hiển thị id và ngày tháng
    onMounted(() => {
      // importProducts.value.statusImport = importProducts.value.status
      // importProducts.value.statusStore = importProducts.value.sttStore
      store.dispatch('import/getImportDetail', route.params.id).then((res) => {
        if (res) {
          res.productsToImport.forEach((product) => {
            calculateSalePrice(product)
          })
        }
      })
    })

    const handleConfirmClick = () => {
      importInfo.value.status = enumeration.status.Confirmed
      store.commit('import/setImportProducts', importInfo.value)

      store.dispatch('import/createImport', importInfo.value).then((res) => {
        if (res) store.commit('import/setImportCreateStep', 2)
      })
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
      importInfo.value.statusPayment = true

      store.dispatch('import/createImport', importInfo.value).then((res) => {
        if (res) store.commit('import/setImportCreateStep', 4)
      })
    }

    const handleImportClick = () => {
      store.commit('import/setImportCreateStep', 3)
      importInfo.value.statusStore = true
      importInfo.value.readyForPayment = true
      store.commit('import/setImportProducts', importInfo.value)
      store.dispatch('import/createImport', importInfo.value).then((res) => {
        if (res) store.commit('import/setImportCreateStep', 3)
      })
    }

    const handleEditClick = () => {
      ElMessage({
        type: 'warning',
        message: 'Tính năng đang phát triển'
      })
    }

    onBeforeUnmount(() => {
      store.commit('import/setImportCreateStep', 0)
      store.commit('import/setDefaultImportProducts')
      store.commit('import/setImportSupplier', {})
      store.commit('import/setDefaultProductsToImport')
    })

    watch(
      () => store.state.import.isTaxed,
      (newVal, oldVal) => {
        products.value.forEach((product) => {
          calculateSalePrice(product)
        })
      }
    )

    return {
      handleConfirmClick,
      importInfo,
      handleImportClick,
      handlePaymentClick,
      importCreateStep,
      isLastStep,
      handleEditClick
    }
  }
}
</script>

<style>
</style>
