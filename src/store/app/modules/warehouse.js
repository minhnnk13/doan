import { authAxios } from '@/apis/api'
import { getUserInfo } from '@/utils/auth/index.js'
export default {
  namespaced: true,
  state: { warehouses: [], selectedWarehouse: {}, selectedProduct: {}, selectedWarehouses: [], allWarehouse: [] },
  getters: {},
  mutations: {
    setWarehouses (state, warehouses) {
      state.warehouses = warehouses
    },

    setSelectedWarehouses (state, selectedWarehouse) {
      state.selectedWarehouses.push(selectedWarehouse)
    },

    setSelectedWarehouse (state, selectedWarehouse) {
      state.selectedWarehouse = selectedWarehouse
    },

    setSelectedProduct (state, selectedProduct) {
      state.selectedProduct = selectedProduct
    },

    setDefaultAddedQuantity (state) {
      state.selectedWarehouse.addedQuantity = ''
    },

    deleteSelectedWarehouse (state, productId) {
      const index = state.selectedWarehouses.findIndex(warehouse => {
        return warehouse.productId === productId
      })
      state.selectedWarehouses.splice(index, 1)
    },

    setAllWarehouse (state, allWarehouse) {
      state.allWarehouse = allWarehouse
    }
  },
  actions: {
    addWarehouse: async (context, payload) => {
      payload.createdBy = getUserInfo().userId
      payload.updatedBy = getUserInfo().userId
      p
      const res = await authAxios.post('/product_batch', payload)
      context.dispatch('getAllWarehouses')
      return res.data
    },

    getWarehouses: async (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get(`/product_batch/${params}`)
          .then((res) => {
            context.commit('setWarehouses', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    },

    getAllWarehouses: async (context) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get('/product_batch')
          .then((res) => {
            context.commit('setAllWarehouse', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    }
  }
}
