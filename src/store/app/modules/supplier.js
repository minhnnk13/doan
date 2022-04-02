import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: { suppliers: [], importSupplier: {} },
  getters: {},
  mutations: {
    setSuppliers (state, suppliers) {
      state.suppliers = suppliers
    },
    setImportSupplier (state, supplier) {
      state.importSupplier = supplier
    }
  },
  actions: {

    getSuppliers: async (context) => {
      const res = await authAxios.get('/supplier')
      context.commit('setSuppliers', res.data)
    }
  }
}
