import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'
import { getUserInfo } from '@/utils/auth/index.js'
import { setImportInfo, getImportsInfo } from '@/utils/import-storage.js'
export default {
  namespaced: true,

  state: {
    import: {},
    product: {},
    productsToImport: [],
    importList: [],
    importSupplier: {}
  },

  getters: {},

  mutations: {
    setImportProducts (state, importProducts) {
      state.import = importProducts
      setImportInfo(state.import)
    },

    setProduct (state, product) {
      state.product = product
    },

    setProductsToImport (state, importProduct) {
      const findExisted = state.productsToImport.findIndex(product => {
        return product.productId === importProduct.productId
      })
      if (findExisted >= 0) {
        state.productsToImport[findExisted].quantity = Number(state.productsToImport[findExisted].saleQuantity) + 1
        state.productsToImport[findExisted].totalPrice += Number(importProduct.unitPrice)
        state.import.importPrice = 0
        state.import.saleQuantity = 0
        state.import.productsToImport.map(product => {
          if (!state.import.isTaxed) {
            product.totalPrice += (product.totalPrice * 0.1)
          } else {
            product.totalPrice += product.totalPrice
          }
          state.import.importPrice += product.totalPrice
          state.import.saleQuantity += Number(product.saleQuantity)
        })
      } else {
        state.productsToImport.push(importProduct)
      }
      state.import.productsToImport = state.productsToImport
    },

    calculateTotalPrice (state) {
      state.import.importPrice = 0
      state.import.saleQuantity = 0
      state.import.productsToImport.map(product => {
        if (!state.import.isTaxed) {
          product.totalPrice += (product.totalPrice * 0.1)
        } else {
          product.totalPrice += product.totalPrice
        }
        state.import.importPrice += product.totalPrice
        state.import.saleQuantity += Number(product.saleQuantity)
      })
    },

    reCalculateAllPrice (state) {
      state.import.importPrice = 0
      state.import.saleQuantity = 0
      state.import.productsToImport.map(product => {
        if (!state.import.isTaxed) {
          product.totalPrice += (product.totalPrice * 0.1)
        } else {
          product.totalPrice -= (product.totalPrice / 11)
        }
        state.import.importPrice += product.totalPrice
      })
    },

    setImportList (state, importList) {
      state.importList = importList
    },

    setImportSupplier (state, supplier) {
      state.importSupplier = supplier
      state.import.supplierId = supplier.supplierId
    },

    pushCreatingImport (state, newImport) {
      state.importList.push(newImport)
    }
  },

  actions: {

    getImports: (context, params) => {
      return new Promise((resolve, reject) => {
        authAxios
          .get('/import', { params })
          .then((res) => {
            context.commit('setImportList', res.data)

            const pendingImports = getImportsInfo()
            if (pendingImports.length > 0 && res.data) {
              res.data = [...res.data, ...pendingImports]
            }

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
        authAxios.post('/import', payload)
      })
    }

  }
}
