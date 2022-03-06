import WebStorage from './web-storage'
const LOCAL_STORAGE = 'local'
const SESSION_STORAGE = 'session'

const localStorage = new WebStorage(LOCAL_STORAGE)
const sessionStorage = new WebStorage(SESSION_STORAGE)

export { localStorage, sessionStorage }
