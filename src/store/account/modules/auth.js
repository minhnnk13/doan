
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
    }
  },
  mutations: {},
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
    }

  }
}
