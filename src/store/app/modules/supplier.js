import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    suppliers: [],
    supplier: {
    }
  },
  getters: {},
  mutations: {
    setSuppliers (state, suppliers) {
      state.suppliers = suppliers
    }

  },
  actions: {

    getSuppliers: async (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get('/supplier', { params })
          .then((res) => {
            context.commit('setSuppliers', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    },

    addSupplier: async (context, payload) => {
      const res = await authAxios.post('/supplier', payload)
    }

  }
}
