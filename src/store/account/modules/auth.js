
import axios from 'axios'
const HOST = 'http://localhost:8087'
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
        .then((res) => {
          return res.data
        })
        .catch(() => {
          return false
        })
    },

    register: async (context, data) => {
      return await axios.post(`${HOST}/user/register`, data)
        .then((res) => res)
        .catch(() => {
          return false
        })
    }

  }
}
