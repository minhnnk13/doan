import { localStorage, sessionStorage } from '../storage/util'
import { localStorageKey, sessionStorageKey } from '../storage/key'

const setAuthToken = (token) => {
  if (token) {
    localStorage.set(localStorageKey.TOKEN, token)
  }
}

const getAuthToken = () => {
  return localStorage.get(localStorageKey.TOKEN)
}

const removeAuthToken = () => {
  localStorage.remove(localStorageKey.TOKEN)
}

const setUserInfo = (userInfo) => {
  if (userInfo) {
    localStorage.set(localStorageKey.USER_INFO, userInfo)
  }
}

const getUserInfo = () => {
  return JSON.parse(localStorage.get(localStorageKey.USER_INFO))
}

const setImportInfo = (importInfo) => {
  if (importInfo) {
    sessionStorage.set(sessionStorageKey.IMPORT_INFO, importInfo)
  }
}

const getImportInfo = () => {
  return sessionStorage.get(sessionStorageKey.IMPORT_INFO)
}

export { setAuthToken, getAuthToken, removeAuthToken, setUserInfo, getUserInfo, setImportInfo, getImportInfo }
