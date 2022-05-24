import axios from 'axios'
import { API_PATH, authAxios } from '@/apis/api'
import { getUserInfo, getAuthToken } from '@/utils/auth'

export default {
  namespaced: true,
  actions: {

    checkToken: (context) => {
      const token = getAuthToken()?.replaceAll('"', '')
      const userID = getUserInfo().userId
      return new Promise((resolve) => {
        axios.get(`${API_PATH}/user/token?token=${token}&userId=${userID}`).then(res => {
          resolve(res)
        })
      })
    }
  }
}
