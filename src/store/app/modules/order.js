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
      state.order = data
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

    addOrder: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        authAxios.post('/export', data).then(res => {
          debugger
          commit('setOrder', res.data)

          resolve(res.data)
        })
      })
    }
  }
}
