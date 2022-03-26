
import axios from 'axios'
import { API_PATH } from '@/apis/api'

export default {
  namespaced: true,
  state: {
    account: {
      UserID: null,
      UserName: null,
      Password: null,
      Name: null,
      DOB: null,
      Email: null,
      Phone: null,
      Address: null,
      IsActive: null,
      Avatar: null,
      RoleID: 0
    },

    currentEmail: null,

    token: null
  },
  mutations: {
    setCurrentEmail: (state, email) => {
      state.currentEmail = email
    },

    setToken: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login: async (context, data) => {
      return await axios.post(`${API_PATH}/authenticate`, data)
        .then((res) => res.data)
        .catch(() => {
          return false
        })
    },

    register: async (context, data) => {
      return await axios.post(`${API_PATH}/register`, data)
        .then((res) => res)
        .catch(() => {
          return false
        })
    },

    sendEmail: async (context, data) => {
      return await axios.post(`${API_PATH}/user/forgot_password?email=${data.email}`)
        .then((res) => {
          context.commit('setCurrentEmail', data.email)
          return res
        })
        .catch(() => {
          return false
        })
    },

    changePassword: async (context, data) => {
      return await axios.post(`${API_PATH}/user/change_password?email=${context.state.currentEmail}&token=${context.state.token}&password=${data}`)

        .then((res) => {
          return res.data
        })
        .catch(() => {
          return false
        })
    }

  }
}
