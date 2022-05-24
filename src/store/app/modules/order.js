import { API_PATH, authAxios } from '@/apis/api'
import { getUserInfo } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    order: {
      products: [],
      paymentType: 1,
      statusPayment: false,
      amountPaid: 0
    },

    orders: []
  },
  getters: {

  },
  mutations: {
    setOrders: (state, data) => {
      state.orders = data
    },

    setOrder: (state, data) => {
      state.order = { ...state.order, ...data }
    },

    clearData: (state) => {
      state.order = {
        products: [],
        paymentType: 1,
        statusPayment: false,
        amountPaid: 0
      }
    }

  },
  actions: {
    getCustomers: ({ commit }) => {
      return new Promise((resolve, reject) => {
        authAxios.get('/customer').then(res => {
          resolve(res.data)
        })
      })
    },

    addOrder: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        if (data.exportID) {
          if (data.customerID) {
            data.customer = data.customerID
          }
          delete data.customerName
          data.products = data.products.map(product => {
            const model = {}

            model.productId = product.productId
            model.saleQuantity = product.saleQuantity
            model.totalPrice = product.saleQuantity * Number(product.unitPrice)

            return model
          })
        }

        authAxios.post('/export', data).then(res => {
          commit('setOrder', res.data)

          resolve(res.data)
        })
      })
    },

    getOrder: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        authAxios.get(`/export/${id}`).then(res => {
          const order = res.data

          if (!order.products?.length) {
            order.products = order.listProduct
          }
          commit('setOrder', order)
          resolve(res.data)
        })
      })
    },

    getOrders: ({ commit }, param) => {
      return new Promise((resolve, reject) => {
        authAxios.get(`/export?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`).then(res => {
          commit('setOrders', res.data)
          resolve(res.data)
        })
      })
    }

  }
}
