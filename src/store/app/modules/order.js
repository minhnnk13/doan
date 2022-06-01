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

    orders: [],

    batchs: [],

    batch: {},

    toggleBatchQuantityPopup: false
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
    },

    setBatchs: (state, data) => {
      state.batchs = data
    },

    setBatch: (state, batch) => {
      state.batch = batch
    },

    setToggleBatchQuantityPopup: (state) => {
      state.toggleBatchQuantityPopup = !state.toggleBatchQuantityPopup
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

    addOrder: (context, data) => {
      return new Promise((resolve, reject) => {
        if (data.exportID) {
          if (data.customerID) {
            data.customer = data.customerID
          }
          delete data.customerName
          data.products = data.products.map(product => {
            const { productBranchId, productId, saleQuantity, productBatch } = product
            const model = { productId, saleQuantity, price: product.saleQuantity * Number(product.unitPrice) }
            if (productBranchId) {
              model.productBranchId = productBranchId
            }

            if (productBatch) {
              model.productBatchId = productBatch
            }

            return model
          })
        }

        authAxios.post('/export', data).then(res1 => {
          const order = res1.data
          context.dispatch('getOrder', order.exportID).then(order => {
            resolve(order)
          })
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
          order.products = order.products.map(product => {
            product.unitPrice = Number(product.unitPrice) / Number(product.saleQuantity)
            return product
          })
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
    },

    deleteOrder: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        authAxios.delete(`/export/${id}`).then(res => {
          commit('clearData')
          resolve(res)
        })
      })
    },

    getProductBatch: ({ commit }, productId) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get(`/product_batch/${productId}`)
          .then((res) => {
            commit('setBatchs', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    }

  }
}
