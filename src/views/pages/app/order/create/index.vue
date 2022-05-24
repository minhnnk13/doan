<template>
  <the-header
    @onCreateOrder="onCreateOrder"
    @onDestroyOrder="onDestroyOrder"
    @onEditOrder="onEditOrder"
    @onBrowseOrder="onBrowseOrder"
    @onExportOrder="onExportOrder"
    @onExchangeOrder="onExchangeOrder"
    @onSaveEdit="onSaveEdit"
    @onCancelEdit="onCancelEdit"
    @onExit="onExit"
    :order="order"
  />
  <bot-header
    :order="order"
    v-if="$route.query.exportID"
  />
  <div class="create">
    <div class="create__left">
      <the-customer ref="customerComp" />
      <order-pay
        :order="order"
        v-if="order.status !== undefined && order.status !== $enumeration.OrderStatus.Create"
        @onPay="onPay"
      />
      <the-product ref="productComp" />
    </div>

    <div class="create__right">
      <order-infomation :mode="order.status === undefined ? 1 : 0" />
    </div>
  </div>
</template>

<script >
import OrderInfomation from './components/order-infomation.vue'
import TheCustomer from './the-customer.vue'
import TheProduct from './the-product.vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, provide, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import CommonFn from '@/common/common-fn'
import { cloneDeep } from 'lodash'
import Enumaration from '@/common/enumeration'
import TheHeader from './components/the-header.vue'
import BotHeader from './components/bot-header.vue'
import OrderPay from './components/order-pay.vue'

const MODULE_NAME = 'order'
const CUSTOMER_MODULE_NAME = 'customer'
export default {
  components: {
    TheCustomer,
    TheProduct,
    OrderInfomation,
    TheHeader,
    BotHeader,
    OrderPay
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const productComp = ref(null)
    const customerComp = ref(null)
    const order = computed(() => store.state[MODULE_NAME].order)
    const container = document.querySelector('.content')
    const onExit = () => {
      router.push({ name: 'ListOrder' })
    }
    const editMode = ref(false)
    provide('editMode', editMode)

    const onCreateOrder = async () => {
      let res = false
      if (!(order.value.customer || order.value.customerID) || !order.value.products.length) {
        ElMessage.error('Vui lòng chọn thông tin khách hàng và sản phẩm vào đơn hàng')
      } else {
        const value = handleOrder()

        CommonFn.showMask(container)
        await store.dispatch(`${MODULE_NAME}/addOrder`, value).then(data => {
          router.push({ query: { exportID: data.exportID } })
          res = true
        })
        CommonFn.hideMask()
      }

      return res
    }

    const hasOrder = computed(() => !!route.query.exportID)

    const handleOrder = () => {
      const newOrder = cloneDeep(order.value)
      newOrder.products = newOrder.products.map(product => {
        const model = {}
        model.totalPrice = product.unitPrice * Number(product.saleQuantity)
        model.productId = product.productId
        model.saleQuantity = Number(product.saleQuantity)
        return model
      })

      newOrder.exportPrice = productComp.value.totalPay
      newOrder.status = Enumaration.OrderStatus.Create

      return newOrder
    }

    onBeforeRouteUpdate((to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.query.exportID !== from.query.exportID) {
        store.commit(`${MODULE_NAME}/clearData`)
        customerComp.value.customer = null
      }
    })
    onMounted(async () => {
      store.commit(`${MODULE_NAME}/clearData`)
      if (hasOrder.value) {
        CommonFn.showMask(container)
        const orderID = route.query.exportID
        const data = await store.dispatch(`${MODULE_NAME}/getOrder`, orderID)
        if (!customerComp.value.customer) {
          const customer = await store.dispatch(`${CUSTOMER_MODULE_NAME}/getCustomer`, data.customerID)
          customerComp.value.customer = customer
        }
        CommonFn.hideMask()
      }
    })

    const onBrowseOrder = async () => {
      const newOrder = cloneDeep(order.value)
      newOrder.status = Enumaration.OrderStatus.Browse
      CommonFn.showMask(container)
      await store.dispatch(`${MODULE_NAME}/addOrder`, newOrder)
      CommonFn.hideMask()
    }

    const onEditOrder = () => {
      editMode.value = true
    }

    const onSaveEdit = async () => {
      await onCreateOrder().then((res) => {
        if (res) {
          editMode.value = false
        }
      })
    }

    const onCancelEdit = () => {
      editMode.value = false
    }

    const onExportOrder = async () => {
      const newOrder = cloneDeep(order.value)
      newOrder.status = Enumaration.OrderStatus.Export
      CommonFn.showMask(container)
      await store.dispatch(`${MODULE_NAME}/addOrder`, newOrder)
      CommonFn.hideMask()
    }

    const onPay = async () => {
      const newOrder = cloneDeep(order.value)
      newOrder.status = Enumaration.OrderStatus.Complete
      newOrder.statusPayment = true
      CommonFn.showMask(container)
      await store.dispatch(`${MODULE_NAME}/addOrder`, newOrder)
      CommonFn.hideMask()
    }

    return {
      onExit,
      onCreateOrder,
      order,
      productComp,
      customerComp,
      hasOrder,
      onBrowseOrder,
      onEditOrder,
      onSaveEdit,
      onCancelEdit,
      onExportOrder,
      onPay
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
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__right {

  }
}
</style>
