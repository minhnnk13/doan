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
    getWareHouse: () => {
      return new Promise((resolve, reject) => {
        const data = [
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          },
          {
            productName: 'productName',
            saleQuantity: 'saleQuantity',
            stockQuantity: 'stockQuantity',
            createDate: 'createDate',
            retailPrice: 'retailPrice',
            whosalePrice: 'whosalePrice',
            unitPrice: 'unitPrice',
            barcode: 232,
            image:
              'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
          }
        ]

        resolve(data)
      })
    },

    getProducts: async (context, params) => {
      const res = await authAxios.get('/product', { params })
      context.commit('setProducts', res)
    },

    getProduct: async (context, params) => {
      const product = context.state.products.find(
        (x) => x.productId === Number(params)
      )
      context.commit('setProduct', product)
    },

    createProduct: async (context, params) => {
      authAxios.post('/product', params)
    }
  }
}
