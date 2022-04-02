<template>
  <div class="navigation">
    <div class="header">
      CompanyName
    </div>
    <div class="items">
      <el-menu
        class=""
        default-active="/app/dashboard"
        :router="true"
        text-color="#fff"
        background-color="#021266"
        active-text-color="#3182CE"
      >
        <sub-nav
          v-for="(subNav, index) in items"
          :key="index"
          :sub-nav="subNav"
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
      <router-link to="chatting">
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
          name: 'Báo cáo',
          icon: 'report',
          to: '/app/report'
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
              name: 'Kiểm hàng',
              to: '/app/control'
            },
            {
              name: 'Nhà cung cấp',
              to: '/app/manufacture'
            },
            {
              name: 'Điều chỉnh giá vốn',
              to: '/app/capital'
            }

          ]
        },
        {
          name: 'Thiết lập kho',
          icon: 'warehouse',
          to: '/app/warehouse'
        },
        {
          name: 'Đối tác và khách hàng',
          icon: 'customer',
          to: '/app/customer',
          subs: [
            {
              name: 'Danh sách khách hàng',
              to: 'list-customer'
            },
            {
              name: 'Nhóm khách hàng',
              to: 'group-customer'
            }
          ]
        },
        {
          name: 'Sổ quỹ',
          icon: 'cash-book',
          to: '/app/cash-book',
          // to: 'cash-book',
          subs: [
            {
              name: 'Phiếu thu',
              to: 'receipt'
            },
            {
              name: 'Phiếu chi',
              to: 'payment'
            },
            {
              name: 'Sổ quỹ',
              to: 'cash-book'
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
  width: 320px;
  height: 100vh;
  background: $color--bg1;
  text-align: center;
  color: #fff;
  font-weight: 700;
  padding-bottom: 40px;
  overflow-y: auto;
  overflow-x: hidden;

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
  }

  .chatting {
    padding-top: 20px;
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

    .thumbnail {
      margin-top: 24px;
      cursor: pointer;
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
