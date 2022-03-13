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
          sale: true,
          image:
            'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
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
          sale: true,
          image:
          'https://toigingiuvedep.vn/wp-content/uploads/2021/01/hinh-anh-cute-de-thuong.jpg'
        }
      ]
      context.commit('setProducts', data)
    },

    getProduct: async (context, params) => {
      const product = context.state.products.find(x => x.productId === Number(params))
      context.commit('setProduct', product)
    }
  }
}
