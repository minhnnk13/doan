import { localStorage } from '../storage/util'
import { localStorageKey } from '../storage/key'
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

export { setAuthToken, getAuthToken, removeAuthToken }
