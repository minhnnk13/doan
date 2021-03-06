import { authAxios } from '@/apis/api'

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
    },

    addUnit: async (context, payload) => {
      const res = await authAxios.post('/unit', payload)
      context.dispatch('getUnits')
      return res
    }
  }
}
