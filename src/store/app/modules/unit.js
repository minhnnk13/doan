import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: { units: [] },
  getters: {},
  mutations: {
    setUnits (state, units) {
      state.units = units
    }
  },
  actions: {
    getUnits: async (context) => {
      const res = await authAxios.get('/unit')
      context.commit('setUnits', res.data)
    }
  }
}
