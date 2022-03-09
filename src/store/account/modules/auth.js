
import axios from 'axios'
const HOST = 'https://62248def6c0e396620415932.mockapi.io'
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
      return await axios.post(`${HOST}/authenticate`, data)
        .then((res) => res.data)
        .catch(() => {
          return false
        })
    },

    register: async (context, data) => {
      return await axios.post(`${HOST}/register`, data)
        .then((res) => res)
        .catch(() => {
          return false
        })
    }

  }
}
