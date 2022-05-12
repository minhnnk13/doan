import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'
import { getUserInfo } from '@/utils/auth/index.js'
import { setImportInfo, getImportsInfo } from '@/utils/import-storage.js'
import enumeration from '@/common/enumeration.js'
import { formatPrice } from '@/common/common-fn.js'

export default {
  namespaced: true,

  state: {
    import: {},
    product: {},
    productsToImport: [],
    importList: [],
    importSupplier: {},
    importCreateStep: 0,
    isTaxed: false,
    importsOfSupplier: []
  },

  getters: {},

  mutations: {
    setImportProductsFromResponse (state, productsToImport) {
      state.productsToImport = productsToImport
    },
    setImportProducts (state, importProducts) {
      state.import = importProducts
      setImportInfo(state.import)
    },

    setDefaultImportProducts (state) {
      state.import = {}
    },

    setProduct (state, product) {
      state.product = product
    },

    setProductsToImport (state, importProduct) {
      importProduct.unitName = importProduct.unitId.unitName
      state.productsToImport.push(importProduct)

      state.import.productsToImport = state.productsToImport
    },

    setDefaultProductsToImport (state) {
      state.productsToImport = []
    },

    calculateTotalPrice (state) {
      state.import.importPrice = 0
      state.import.saleQuantity = 0
      state.import.renderImportPrice = 0
      state.import.productsToImport.map((product) => {
        state.import.importPrice += product.price
        state.import.saleQuantity += Number(product.saleQuantity)
      })

      state.import.renderImportPrice = formatPrice(
        Number(state.import.importPrice)
      )
    },

    setImportList (state, importList) {
      state.importList = importList
    },

    setImportSupplier (state, supplier) {
      state.importSupplier = supplier
      state.import.supplierId = supplier.supplierId
      state.import.supplier = supplier.supplierName
    },

    pushCreatingImport (state, newImport) {
      state.importList.push(newImport)
    },

    setImportCreateStep (state, importCreateStep) {
      state.importCreateStep = importCreateStep
    },

    setIsTaxed (state, isTaxed) {
      state.isTaxed = isTaxed
    },

    setImportsOfSupplier (state, importsOfSupplier) {
      state.importsOfSupplier = importsOfSupplier
    }
  },

  actions: {
    getImports: (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get('/import', { params })
          .then((res) => {
            const pendingImports = getImportsInfo()
            if (pendingImports.length > 0 && res.data) {
              pendingImports.map((importFromClient) => {
                const findImport = res.data.find((importInfo) => {
                  return importInfo.importID === importFromClient.importID
                })
                if (findImport) {
                  pendingImports.pop(importFromClient)
                }
              })

              res.data = [...res.data, ...pendingImports]
            }
            res.data.forEach((importInfo) => {
              importInfo.renderImportPrice = formatPrice(
                Number(importInfo.importPrice)
              )
            })
            context.commit('setImportList', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    },

    createImport: async (context, payload) => {
      payload.branchId = 1
      payload.paymentType = 1
      payload.employee = getUserInfo().userId
      payload.products = payload.productsToImport
      return new Promise((resolve, reject) => {
        authAxios.post('/import', payload).then((res) => {
          if (res) context.commit('setImportCreateStep', 3)
        })
      })
    },

    getImportDetail: async (context, payload) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get(`/import/${payload}`)
          .then((res) => {
            if (res.data) {
              res.data.statusImport = res.data.status
              res.data.statusStore = res.data.sttStore
              res.data.productsToImport = res.data.listProduct
              res.data.productsToImport.forEach((productInfo) => {
                productInfo.renderPrice = formatPrice(
                  Number(productInfo.price)
                )
                productInfo.renderUnitPrice = formatPrice(
                  Number(productInfo.unitPrice)
                )
              })
              res.data.renderImportPrice = formatPrice(res.data.importPrice)
              context.commit('setImportProducts', res.data)
              context.commit(
                'setImportProductsFromResponse',
                res.data.listProduct
              )
              context.commit('setImportCreateStep', 3)
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    getImportsBySupplierId: async (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios.get('import/supplier', { params }).then(res => {
          context.commit('setImportsOfSupplier', res.data)
          resolve(res.data)
        }).catch(err => reject(err))
      })
    }
  }
}
