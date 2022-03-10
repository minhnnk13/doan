import axios from 'axios'

export default {
  namespaced: true,
  state: { products: [] },
  getters: {},
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    getProducts: async (context, params) => {
      const data = [
        {
          productId: 1,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 2,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 3,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 4,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 5,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 6,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 7,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 8,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 9,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 10,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 11,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        },
        {
          productId: 12,
          productName: '2121',
          createdDate: '2022-03-05T15:05:19.000+0000',
          productCode: '2121',
          barCode: 1,
          unitPrice: 212.0,
          retailPrice: 121.0,
          wholesalePrice: 21.0,
          modifyCreate: '2022-03-05T15:05:24.000+0000',
          description: 'aaaa',
          tag: '212',
          saleQuantity: 21,
          stockQuantity: 212,
          brandId: {
            brandId: 1,
            brandName: 'aaaaaa'
          },
          unitId: {
            unitId: 1,
            unitName: 'test'
          },
          userId: {
            userId: 1,
            username: 'dodv',
            password: 'password',
            name: null,
            dob: null,
            email: null,
            phone: null,
            address: null,
            avatar: null,
            roleId: 0,
            active: false
          },
          supplierId: {
            supplierId: 1,
            supplierName: 'aa',
            supplierCode: 323,
            group: 'a',
            email: 'a',
            phone: 'a',
            status: true,
            taxIdentificationNumber: 43
          },
          sale: true
        }
      ]
      context.commit('setProducts', data)
    }
  }
}
