import axios from 'axios'
import { getAuthToken, removeAuthToken } from '../utils/auth'
import { redirectToApp } from '@/common/common-fn'
import { App } from '@/common/constant'

const API_PATH = 'http://localhost:8080'

const authAxios = axios.create({
  baseURL: API_PATH,
  headers: {
    Authorization: 'Bearer ' + getAuthToken()?.replaceAll('"', '')
  },
  validateStatus: function (status) {
    if (status === 401) {
      removeAuthToken()
      redirectToApp(App.account)
    }

    return status >= 200 && status <= 300
  }
})

export {
  API_PATH,
  authAxios
}
