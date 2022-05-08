import { API_PATH, authAxios } from '@/apis/api'
import { getUserInfo } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    customers: [],
    customer: {

    }
  },
  getters: {

  },
  mutations: {
    setCustomers: (state, data) => {
      state.customers = data
    },

    setCustomer: (state, data) => {
      state.customers.push(data)
      state.customer = data
    },

    clearCustomer: (state) => {
      state.customer = null
    }
  },
  actions: {
    getCustomers: ({ commit }) => {
      return new Promise((resolve, reject) => {
        authAxios.get('/customer').then(res => {
          commit('setCustomers', res.data)

          resolve(res.data)
        })
      })
    },

    addCustomer: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        authAxios.post('/customer', data).then(res => {
          commit('setCustomer', res.data)

          resolve(res.data)
        })
      })
    }
  }
}
