import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    import: {
      productsToImport: [],
      totalPrice: 0,
      saleQuantity: 0,
      isTaxed: false
    },
    product: {},
    productsToImport: []
  },
  getters: {},
  mutations: {
    setImportProducts (state, importProducts) {
      state.importProducts = importProducts
    },
    setProduct (state, product) {
      state.product = product
    },
    setProductsToImport (state, product) {
      state.productsToImport.push(product)
      state.import.productsToImport = state.productsToImport
    },
    calculateTotalPrice (state) {
      state.import.totalPrice = 0
      state.import.saleQuantity = 0
      state.import.productsToImport.map(product => {
        if (!state.import.isTaxed) {
          product.productImportPrice += (product.productImportPrice * 0.1)
        } else {
          product.productImportPrice += product.productImportPrice
        }
        state.import.totalPrice += product.productImportPrice
        state.import.saleQuantity += Number(product.quantity)
      })
    },
    reCalculateAllPrice (state) {
      state.import.totalPrice = 0
      state.import.saleQuantity = 0
      state.import.productsToImport.map(product => {
        if (!state.import.isTaxed) {
          product.productImportPrice += (product.productImportPrice * 0.1)
        } else {
          product.productImportPrice -= (product.productImportPrice / 11)
        }
        state.import.totalPrice += product.productImportPrice
      })
    }
  },
  actions: {

    getImport: () => {
      return new Promise((resolve, reject) => {
        const data = [
          {
            importId: 1,
            productCode: 'MF368',
            supplierName: 'product 1',
            branchName: 'CHi nhánh mặc định',
            statusName: 'Hoàn thành',
            paymentName: 'Đã hoàn thành',
            importPrice: '30.000.000',
            userName: 'LHLong'
          },
          {
            importId: 2,
            productCode: 'MF368',
            supplierName: 'product 1',
            branchName: 'CHi nhánh mặc định',
            statusName: 'Hoàn thành',
            paymentName: 'Đã hoàn thành',
            importPrice: '30.000.000',
            userName: 'LHLong'
          },
          {
            importId: 3,
            productCode: 'MF368',
            supplierName: 'product 1',
            branchName: 'CHi nhánh mặc định',
            statusName: 'Hoàn thành',
            paymentName: 'Đã hoàn thành',
            importPrice: '30.000.000',
            userName: 'LHLong'
          }
        ]

        resolve(data)
      })
    }

  }
}
