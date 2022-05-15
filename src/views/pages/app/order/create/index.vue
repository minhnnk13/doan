<template>
  <the-header @onCreateOrder="onCreateOrder" />
  <bot-header
    :order="order"
    v-if="hasOrder"
  />
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
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import CommonFn from '@/common/common-fn'
import { cloneDeep } from 'lodash'
import Enumaration from '@/common/enumeration'
import TheHeader from './components/the-header.vue'
import BotHeader from './components/bot-header.vue'

const MODULE_NAME = 'order'
export default {
  components: {
    TheCustomer,
    TheProduct,
    OrderInfomation,
    TheHeader,
    BotHeader
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
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
        await store.dispatch(`${MODULE_NAME}/addOrder`, value).then(data => {
          router.push({ query: { exportID: data.exportID } })
        })
        CommonFn.hideMask()
      }
    }

    const hasOrder = computed(() => {
      return !!route.query.exportID
    })

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
      newOrder.status = Enumaration.OrderStatus.Create

      return newOrder
    }

    return {
      onExit,
      onCreateOrder,
      order,
      productComp,
      hasOrder
    }
  }
}
</script>

<style lang="scss" scoped>

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
