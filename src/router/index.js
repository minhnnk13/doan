import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from '@/pages/index.vue'
import NotFound from '@/pages/common/not-found.vue'
import { getAuthToken } from '@/utils/auth'
import { redirectToApp } from '@/common/common-fn'
import { App } from '@/common/constant'

const routes = [
  {
    path: '/app',

    redirect (to) {
      return {
        path: `${to.path}/dashboard`
      }
    },
    component: PageIndex,
    children: [
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          pageName: 'Thông tin tài khoản'
        },
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/pages/app/profile')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          pageName: 'Tổng quan'
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/pages/app/dashboard')
      },
      {
        path: 'report',
        name: 'Report',
        meta: {
          pageName: 'Báo cáo'
        },
        component: () =>
          import(/* webpackChunkName: "report" */ '@/pages/app/report')
      },

      // #region Sản phẩm
      {
        path: 'list-product',
        name: 'ListProduct',
        meta: {
          pageName: 'Danh sách sản phẩm'
        },
        component: () =>
          import(
            /* webpackChunkName: "list-product" */ '@/pages/app/products/list'
          )
      },
      {
        path: 'create',
        name: 'CreateProduct',
        meta: {
          pageName: 'Thêm sản phẩm'
        },
        component: () =>
          import(
            /* webpackChunkName: "create-product" */ '@/pages/app/products/list/create'
          )
      },
      {
        path: 'edit/:productId',
        name: 'EditProduct',
        meta: {
          pageName: 'Sửa sản phẩm'
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-product" */ '@/pages/app/products/list/edit'
          )
      },
      {
        path: 'detail/:productId',
        name: 'ProductDetail',
        meta: {
          pageName: 'Chi tiết sản phẩm'
        },
        component: () =>
          import(
            /* webpackChunkName: "create-product" */ '@/pages/app/products/list/detail'
          )
      },
      {
        path: 'manage-warehouse',
        name: 'ManageWarehouse',
        meta: {
          pageName: 'Quản lý kho'
        },
        component: () =>
          import(
            /* webpackChunkName: "manage-warehouse" */ '@/pages/app/products/manage-warehouse'
          )
      },
      {
        path: 'import',
        name: 'Import',
        meta: {
          pageName: 'Nhập hàng'
        },
        component: () =>
          import(/* webpackChunkName: "import" */ '@/pages/app/products/import'),
        children: [
          {
            path: '',
            name: 'ListGoods',
            meta: {
              pageName: 'Đơn nhập hàng'
            },
            component: () =>
              import(/* webpackChunkName: "import-goods" */ '@/pages/app/products/import/list')
          },
          {
            path: 'create',
            name: 'CreateGoods',
            meta: {
              excludeHeader: true
            },
            component: () =>
              import(/* webpackChunkName: "create-goods" */ '@/pages/app/products/import/create')
          },

          {
            path: 'returns',
            name: 'ReturnGoods',
            props: true,
            meta: {
              excludeHeader: true
            },
            component: () =>
              import(/* webpackChunkName: "return-goods" */ '@/pages/app/products/import/return')
          },

          {
            path: ':id',
            name: 'BrowseGoods',
            props: true,
            meta: {
              excludeHeader: true
            },
            component: () =>
              import(/* webpackChunkName: "browse-goods" */ '@/pages/app/products/import/browse')
          }

        ]
      },
      {
        path: 'control',
        name: 'Control',
        meta: {
          pageName: 'Kiểm hàng'
        },
        component: () =>
          import(
            /* webpackChunkName: "control" */ '@/pages/app/products/control'
          )
      },
      {
        path: 'manufacture',
        name: 'Manufacture',
        meta: {
          pageName: 'Nhà cung cấp'
        },
        component: () =>
          import(
            /* webpackChunkName: "manufacture" */ '@/pages/app/products/manufacture'
          )
      },
      {
        path: 'capital',
        name: 'Capital',
        meta: {
          pageName: 'Điều chỉnh giá vốn'
        },
        component: () =>
          import(
            /* webpackChunkName: "capital" */ '@/pages/app/products/capital'
          )
      },

      // #endregion

      {
        path: 'warehouse',
        name: 'WareHouse',
        meta: {
          pageName: 'Thiết lập kho'
        },
        component: () =>
          import(/* webpackChunkName: "warehouse" */ '@/pages/app/warehouse')
      },

      // #region Đối tác và khách hàng
      {
        path: 'list-customer',
        name: 'ListCustomer',
        meta: {
          pageName: 'Danh sách khách hàng'
        },
        component: () =>
          import(
            /* webpackChunkName: "list-customer" */ '@/pages/app/customers/list'
          )
      },
      {
        path: 'group-customer',
        name: 'GroupCustomer',
        meta: {
          pageName: 'Nhóm khách hàng'
        },
        component: () =>
          import(
            /* webpackChunkName: "group-customer" */ '@/pages/app/customers/group'
          )
      },
      // #endregion

      // #region Sổ quỹ
      {
        path: 'cash-book',
        name: 'CashBook',
        meta: {
          pageName: 'Sổ quỹ'
        },
        component: () =>
          import(/* webpackChunkName: "cash-book" */ '@/pages/app/cash-book')
      },

      {
        path: 'receipt',
        name: 'Receipt',
        meta: {
          pageName: 'Phiếu thu'
        },
        component: () =>
          import(
            /* webpackChunkName: "receipt" */ '@/pages/app/cash-book/receipt'
          )
      },
      {
        path: 'payment',
        name: 'Payment',
        meta: {
          pageName: 'Phiếu chi'
        },
        component: () =>
          import(
            /* webpackChunkName: "payment" */ '@/pages/app/cash-book/payment'
          )
      },

      // #endregion
      {
        path: 'chatting',
        name: 'Chatting',
        component: () =>
          import(/* webpackChunkName: "chatting" */ '@/pages/app/chatting')
      }
    ]
  },

  {
    path: '/account',
    alias: '/',
    name: 'Account',
    redirect: '/account/login',
    component: PageIndex,
    meta: {
      ignoreAuth: true
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: {
          ignoreAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "login" */ '@/pages/account/login')
      },

      {
        path: 'register',
        name: 'Register',
        meta: {
          ignoreAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "register" */ '@/pages/account/register')
      },
      {
        path: 'forget-password',
        name: 'ForgetPassword',
        meta: {
          ignoreAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "forget-password" */ '@/pages/account/forget-password'
          )
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getAuthToken()
  if (to.matched.some((record) => !record.meta.ignoreAuth)) {
    if (!token) {
      next()
      redirectToApp(App.account)
    } else {
      // redirectToApp(App.app)
      next()
    }
  } else {
    if (token) {
      redirectToApp(App.app)
    }
    next()
  }
})
export default router
