import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: { categories: [] },
  getters: {},
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {

    getCategories: async (context) => {
      const res = await authAxios.get('/category')
      context.commit('setCategories', res.data)
    },

    getProduct: async (context, params) => {
      const product = context.state.products.find(
        (x) => x.productId === Number(params)
      )
      context.commit('setProduct', product)
    }
  }
}
