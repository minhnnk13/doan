<template>
  <div class="navigation">
    <div class="header">
      Aquarium
    </div>
    <div class="items">
      <el-menu
        class=""
        default-active="/app/list-product"
        :router="true"
        text-color="#fff"
        background-color="#353b76"
        active-text-color="#3182CE"
      >
        <sub-nav
          v-for="(subNav, index) in items"
          :key="index"
          :sub-nav="subNav"
          :class="subNav.class"
        >
          <template
            v-if="subNav.subs?.length"
            #default
          >
            <nav-item
              v-for="(item, subIndex) in subNav.subs"
              :key="`${index}-${subIndex}`"
              :item="item"
            />
          </template>
        </sub-nav>
      </el-menu>
    </div>

    <div class="chatting">
      <router-link to="/app/chatting">
        <div class="title">
          Chatting Space
        </div>
        <div class="thumbnail">
          <img
            :src="chattingIcon"
          >
        </div>
      </router-link>
    </div>

    <div class="version">
      Version 1.0
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import NavItem from './nav-item.vue'
import SubNav from './sub-nav.vue'
export default {
  components: { NavItem, SubNav },

  setup () {
    const items = computed(() => {
      let data = [
        {
          name: 'Tổng quan',
          icon: 'dashboard',
          to: '/app/dashboard'
        },
        {
          name: 'Đơn hàng',
          icon: 'order',
          class: 'order',
          to: '/app/orders',
          subs: [
            {
              name: 'Tạo đơn hàng',
              to: '/app/orders/create'
            },
            {
              name: 'Danh sách đơn hàng',
              to: '/app/orders'
            }
          ]
        },

        {
          name: 'Sản phẩm',
          icon: 'product',
          to: '/app/product',
          subs: [
            {
              name: 'Danh sách sản phẩm',
              to: '/app/list-product'
            },
            {
              name: 'Quản lý kho',
              to: '/app/manage-warehouse'
            },
            {
              name: 'Nhập hàng',
              to: '/app/import'
            },
            {
              name: 'Nhà cung cấp',
              to: '/app/manufacture'
            }
            // {
            //   name: 'Điều chỉnh giá vốn',
            //   to: '/app/capital'
            // }

          ]
        },

        {
          name: 'Khách hàng',
          icon: 'customer',
          to: '/app/customer',
          subs: [
            {
              name: 'Danh sách khách hàng',
              to: '/app/list-customer'
            }
          ]
        },
        {
          name: 'Sổ quỹ',
          icon: 'cash-book',
          class: 'cash-book',
          to: '/app/cash-book',
          // to: 'cash-book',
          subs: [
            // {
            //   name: 'Phiếu thu',
            //   to: 'receipt'
            // },
            // {
            //   name: 'Phiếu chi',
            //   to: 'payment'
            // },
            {
              name: 'Sổ quỹ',
              to: '/app/cash-book/cash-book'
            }
          ]
        },
        {
          name: 'Báo cáo',
          icon: 'report',
          to: '/app/report',
          subs: [
            {
              name: 'Báo cáo kho',
              to: '/app/report/ware-house'
            },
            {
              name: 'Báo cáo khách hàng',
              to: '/app/report/customer'
            }
          ]
        },
        {
          name: 'Thiết lập kho',
          icon: 'warehouse',
          class: 'warehouse',
          to: '/app/warehouse',
          subs: [
            // {
            //   name: 'Quản lý chi nhánh',
            //   to: '/app/brands'
            // },
            {
              name: 'Quản lý thuế',
              to: '/app/thue'
            },
            {
              name: 'Quản lý nhân viên',
              to: '/app/nhanvien'
            },
            {
              name: 'Phân quyền vai trò',
              to: '/app/warehouse/branch-management'
            },
            {
              name: 'Phân quyền vai trò',
              to: '/app/warehouse/role-management'
            }
          ]
        }

      ]

      data = data.map((item) => {
        item.icon = require(`@/assets/icons/nav/${item.icon}.svg`)
        return item
      })
      return data
    })
    const chattingIcon = require('@/assets/icons/nav/chatting.svg')

    return {
      items,
      chattingIcon
    }
  }

}
</script>

<style lang="scss" scoped>
.navigation {
  // width: 320px;
  height: 100%;
  background: $color--bg1;
  text-align: center;
  color: #fff;
  font-weight: 700;
  padding-bottom: 40px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 270px;

  .header {
    padding: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }
  }

  .el-menu {
    background: $color--bg1;

    :deep(.cash-book) {
      .el-icon:first-child {
        position: relative;
        left: -8px;
          img {
            width: 50px;
            height: 50px;
          }
        }
    }
  }

  .chatting {
    padding-top: 20px;
    position: relative;
    padding-bottom: 12px;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
    }

    .thumbnail {
      margin-top: 12px;
      cursor: pointer;

      img {
        width: 120px;
      }
    }

    a {
      display: block;
      .title {
        height: 56px;
        line-height: 56px;
        color: #fff;
      }

      &.router-link-active  {
        display: block;
        .title {

          background: $color--gradient
        }
      }

    }

  }

  .version {
    padding-top: 20px;
  }
}
</style>
