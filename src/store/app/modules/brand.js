import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: { brands: [] },
  getters: {},
  mutations: {
    setBrands (state, brands) {
      state.brands = brands
    }
  },
  actions: {

    getBrands: async (context) => {
      const res = await authAxios.get('/brand')
      context.commit('setBrands', res.data)
    },

    getProduct: async (context, params) => {
      const product = context.state.products.find(
        (x) => x.productId === Number(params)
      )
      context.commit('setProduct', product)
    }
  }
}
