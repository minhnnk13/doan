import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: { suppliers: [] },
  getters: {},
  mutations: {
    setSuppliers (state, suppliers) {
      state.suppliers = suppliers
    }

  },
  actions: {

    getSuppliers: async (context) => {
      const res = await authAxios.get('/supplier')
      context.commit('setSuppliers', res.data)
    }
  }
}
