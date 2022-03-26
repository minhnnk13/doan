import { API_PATH, authAxios } from '@/apis/api'
import axios from 'axios'

export default {
  namespaced: true,
  state: { products: [], product: {} },
  getters: {},
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    setProduct (state, product) {
      state.product = product
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
