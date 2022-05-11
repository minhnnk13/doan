<template>
  <div class="header">
    <div class="label">
      Tạo đơn hàng
    </div>

    <div class="toolbar">
      <el-button @click="onExit">
        Thoát
      </el-button>

      <el-button
        type="primary"
        @click="onCreateOrder"
      >
        Tạo đơn hàng
      </el-button>
    </div>
  </div>
  <div class="create">
    <div class="create__left">
      <the-customer />
      <the-product ref="productComp" />
    </div>

    <div class="create__right">
      <order-infomation :mode="1" />
    </div>
  </div>
</template>

<script >
import OrderInfomation from './components/order-infomation.vue'
import TheCustomer from './the-customer.vue'
import TheProduct from './the-product.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import CommonFn from '@/common/common-fn'
import { cloneDeep } from 'lodash'
const MODULE_NAME = 'order'
export default {
  components: { TheCustomer, TheProduct, OrderInfomation },

  setup () {
    const store = useStore()
    const router = useRouter()
    const productComp = ref(null)
    const order = computed(() => store.state[MODULE_NAME].order)
    const onExit = () => {
      router.push({ name: 'ListProduct' })
    }

    const onCreateOrder = async () => {
      if (!order.value.customer || !order.value.products.length) {
        ElMessage.error('Vui lòng chọn thông tin khách hàng và sản phẩm vào đơn hàng')
      } else {
        const value = handleOrder()
        const container = document.querySelector('.content')
        CommonFn.showMask(container)
        await store.dispatch(`${MODULE_NAME}/addOrder`, value)
        CommonFn.hideMask()
      }
    }

    const handleOrder = () => {
      const newOrder = cloneDeep(order.value)
      newOrder.products = newOrder.products.map(product => {
        const model = {}
        model.totalPrice = product.unitPrice * product.saleQuantity
        model.productId = product.productId
        model.saleQuantity = Number(product.saleQuantity)
        return model
      })

      newOrder.exportPrice = productComp.value.totalPay
      return newOrder
    }
    return {
      onExit,
      onCreateOrder,
      productComp
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  background: #fff;
  margin: 0 -24px;
  margin-bottom: 24px;

  .label {
    color: #2D3748;
    font-weight: 700;
    font-size: 30px;
  }
}
.create {
  display: flex;
  gap: 24px;
  &__left {
    flex: 1;
    height: calc(100% - 56px - 24px);
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
  }

  &__right {

  }
}
</style>
