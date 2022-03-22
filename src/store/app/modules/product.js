import { API_PATH, authAxios } from '@/apis/api'
import dayjs from 'dayjs'
import firebase from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  namespaced: true,
  state: { products: [], product: {} },
  getters: {},
  mutations: {
    setProducts (state, products) {
      state.products = products.map((product) => {
        product.createdDate = dayjs(product.createdDate).format('YYYY-MM-DD')
        product.modifyCreate = dayjs(product.modifyCreate).format('YYYY-MM-DD')
        product.productName = `${product.productName} ${product.productCode}`
        product.categoryName = product.categoryId?.categoryName
        return product
      })
    },
    setProduct (state, product) {
      product.createdDate = dayjs(product.createdDate).format('YYYY-MM-DD')
      product.modifyCreate = dayjs(product.modifyCreate).format('YYYY-MM-DD')
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

    createProduct: async (context, payload) => {
      if (typeof payload.image === 'object') {
        const storage = getStorage()
        const storageRef = ref(storage, payload.image.name)
        const img = await fetch(payload.image.url)
        await uploadBytes(storageRef, await img.blob())
        payload.image = await getDownloadURL(storageRef)
      }

      return authAxios.post('/product', payload)
    },

    deleteProduct: async (context, payload) => {
      return await authAxios.delete(`/product/${payload}`)
    }
  }
}
