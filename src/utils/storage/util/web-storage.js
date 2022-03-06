export default class WebStorage {
    storage = null

    constructor (driver) {
      this.storage = this.resolveDriver(driver)
    }

    resolveDriver (driver) {
      switch (driver) {
        case 'local':
          return localStorage
        case 'session':
          return sessionStorage
        default:
          throw new Error(`unknown${driver}`)
      }
    }

    set (key, value) {
      return this.storage.setItem(key, JSON.stringify(value))
    }

    get (key) {
      const item = this.storage.getItem(key)
      let storageValue = null
      if (typeof item === 'object') {
        storageValue = JSON.parse(storageValue)
      } else {
        storageValue = item
      }

      return storageValue
    }

    remove (key) {
      this.storage.removeItem(key)
    }

    clear () {
      this.storage.clear()
    }
}
