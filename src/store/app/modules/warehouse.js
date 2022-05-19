import { authAxios } from '@/apis/api'
import { getUserInfo } from '@/utils/auth/index.js'
export default {
  namespaced: true,
  state: { warehouses: [], selectedWarehouse: {}, selectedProduct: {} },
  getters: {},
  mutations: {
    setWarehouses (state, warehouses) {
      state.warehouses = warehouses
    },

    setSelectedWarehouse (state, selectedWarehouse) {
      state.selectedWarehouse = selectedWarehouse
    },

    setSelectedProduct (state, selectedProduct) {
      state.selectedProduct = selectedProduct
    }
  },
  actions: {
    addWarehouse: async (context, payload) => {
      payload.createdBy = getUserInfo().userId
      payload.updatedBy = getUserInfo().userId
      const res = await authAxios.post('/warehouse', payload)
      context.dispatch('getWarehouses', payload.productId)
      return res
    },

    getWarehouses: async (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get(`/warehouse/${params}`)
          .then((res) => {
            context.commit('setWarehouses', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    }
  }
}
