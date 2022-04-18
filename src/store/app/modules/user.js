import { API_PATH, authAxios } from '@/apis/api'

export default {
  namespaced: true,
  state: {
    users: []
  },
  getters: {},
  mutations: {
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    getUsers: async ({ commit }) => {
      return new Promise((resolve, reject) => {
        authAxios.get('/user').then((res) => {
          commit('setUsers', res.data)
          resolve(res.data)
        })
      })
    }
  }
}
