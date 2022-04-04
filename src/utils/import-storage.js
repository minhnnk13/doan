import { localStorage, sessionStorage } from './storage/util'
import { localStorageKey, sessionStorageKey } from './storage/key'

const setImportsInfo = () => {
  sessionStorage.set(sessionStorageKey.IMPORT_INFO, [])
}

const setImportInfo = (importInfo) => {
  if (importInfo) {
    const imports = JSON.parse(sessionStorage.get(sessionStorageKey.IMPORT_INFO))
    const res = imports.findIndex(importInfoInSession => {
      return importInfoInSession.importId === importInfo.importId
    })
    if (res >= 0) {
      imports[res] = importInfo
    } else {
      imports.push(importInfo)
    }
    sessionStorage.set(sessionStorageKey.IMPORT_INFO, imports)
  }
}

const getImportsInfo = () => {
  return JSON.parse(sessionStorage.get(sessionStorageKey.IMPORT_INFO))
}

const getImportInfo = (importId) => {
  const imports = JSON.parse(sessionStorage.get(sessionStorageKey.IMPORT_INFO))

  return imports.find(importProduct => { return importProduct.importId === importId })
}

export { setImportInfo, getImportInfo, setImportsInfo, getImportsInfo }
