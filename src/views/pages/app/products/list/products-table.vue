<template>
  <div class="list-container">
    <div class="header-container">
      <div class="former-half-container" />
      <div class="latter-half-container">
        <el-button
          class="btn-style"
          type="primary"
          @click="handleCreateClick"
        >
          Thêm sản phẩm
        </el-button>
      </div>
    </div>
    <el-tabs
      class="all-product-tab"
      active-name="first"
    >
      <el-tab-pane
        label="Tất cả sản phẩm"
        name="first"
      >
        <div class="search-bar-container">
          <el-input
            v-model="inputSearch"
            placeholder="Tìm kiếm theo mã sản phẩm , tên sản phẩm, barcode"
            class="input-search"
          >
            <template #prepend>
              <el-button :icon="Search" />
            </template>
            <template #append />
          </el-input>
        </div>
        <el-table
          :data="products"
          ref="table"
          style="width: 100%"
          class="table-style"
          table-layout="auto"
          @row-click="handleDetailClick"
        >
          <el-table-column
            prop="date"
            label=""
          />
          <el-table-column
            prop="image"
            label="Ảnh"
            class="cursor-pointer"
          />
          <el-table-column
            prop="productName"
            label="Sản phẩm"
            class="cursor-pointer"
          />
          <el-table-column
            prop="tag"
            label="Loại"
          />
          <el-table-column
            prop="saleQuantity"
            label="Có thể bán"
          />
          <el-table-column
            prop="stockQuantity"
            label="Tồn kho"
          />
          <el-table-column
            prop="createdDate"
            label="Ngày khởi tạo"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import commonFn, { redirectToApp } from '@/common/common-fn'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuthToken } from '@/utils/auth'

const PRODUCT_MODULE = 'product'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const activeName = ref('first')
    const table = ref('table')
    const params = { pageIndex: 0, pageSize: 5 }
    store.dispatch(`${PRODUCT_MODULE}/getProducts`, params)
    const products = store.state.product.products

    // xu li event nut back
    const handleCreateClick = () => {
      router.push('/app/create')
    }

    // xem chi tiet san pham
    const handleDetailClick = (product) => {
      router.push(`/app/detail/${product?.productId}`)
    }

    return {
      products,
      activeName,
      handleCreateClick,
      handleDetailClick
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  margin-bottom: 24px;
  display: flex;
  justify-content: between;
  .former-half-container {
    width: 50%;
  }
  .latter-half-container {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }

  .btn-style {
    float: right;
  }
}
.list-container {
  height: 100%;

  .all-product-tab {
    height: calc(100% - 56px);
    overflow-y: auto;
    background-color: #fff;

    .search-bar-container {
      width: 100%;
    }
    .table-style {
      height: calc(100% - 87px);
      overflow-y: auto;
      .cursor-pointer {
        cursor: pointer;
      }
    }
  }
}
</style>
