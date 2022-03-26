import { API_PATH, authAxios } from '@/apis/api'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: { products: [], product: {} },
  getters: {},
  mutations: {
    setProducts (state, products) {
      state.products = products.map((product) => {
        product.createdDate = dayjs(product.createdDate).format('DD/MM/YYYY')
        product.productName = `${product.productName} ${product.productCode}`
        return product
      })
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
      return new Promise((resolve, reject) => {
        authAxios
          .get('/product', { params })
          .then((res) => {
            context.commit('setProducts', res.data)
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    },

    getProduct: async (context, params) => {
      const res = await authAxios.get(`/product/${params}`)
      context.commit('setProduct', res.data)
    },

    createProduct: async (context, params) => {
      authAxios.post('/product', params)
    },

    deleteProduct: async (context, params) => {
      console.log('DELETED: ' + params)
    }
  }
}
