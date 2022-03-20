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
          Tạo phiếu kiểm
        </el-button>
      </div>
    </div>
    <el-tabs
      class="all-product-tab"
      active-name="first"
    >
      <el-tab-pane
        label="Tất cả"
        name="first"
      >
        <div class="search">
          <text-field
            v-model="inputSearch"
            class="w-50 m-2"
            size="large"
            placeholder="Tìm kiếm theo mã phiếu kiểm hàng"
            :prefix-icon="searchIcon"
          />
        </div>
        <el-table
          :data="products"
          ref="table"
          style="width: 100%"
          class="table-style"
          table-layout="auto"
          @row-click="handleDetailClick"
          @selection-change="handleSelectionChange"
          :show-header="isShowHeaderTable"
          header-cell-class-name="table-head"
          :max-height="tableHeight"
        >
          <el-table-column
            type="selection"
            align="center"
          />
          <el-table-column
            prop="code"
            label="Mã phiếu"
            class="cursor-pointer"
          />

          <el-table-column
            prop="storeName"
            label="Kho kiểm hàng"
            class="cursor-pointer"
          />
          <el-table-column
            prop="status"
            label="Trạng thái"
          />
          <el-table-column
            prop="createdDate"
            label="Ngày tạo"
          />
          <el-table-column
            prop="checkDate"
            label="Ngày kiểm"
          />
          <el-table-column
            prop="user"
            label="Nhân viên tạo"
          />
          <el-table-column
            prop="note"
            label="ghi chú"
          />
          <template #append>
            <el-pagination
              v-model:currentPage="currentPage4"
              v-model:page-size="pageSize4"
              :page-sizes="5"
              :default-page-size="5"
              :pager-count="4"
              layout="sizes, prev, pager, next"
              :total="400"
            />
          </template>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import commonFn, { redirectToApp } from '@/common/common-fn'
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuthToken } from '@/utils/auth'
import { Search } from '@element-plus/icons-vue'

const PRODUCT_MODULE = 'product'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const activeName = ref('first')
    const table = ref('table')
    const searchIcon = ref(Search)
    const selectedHeader = ref(true)
    const selectedAction = ref(null)

    const selectedProduct = ref([])
    const params = { pageIndex: 0, pageSize: 5 }
    store.dispatch(`${PRODUCT_MODULE}/getProducts`, params)
    const products = computed(() => store.state.product.products)
    const tableHeight = ref(window.innerHeight - 300)

    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })

    // xu li event nut back
    const handleCreateClick = () => {
      router.push('/app/create')
    }

    // xem chi tiet san pham
    const handleDetailClick = (product) => {
      router.push(`/app/detail/${product?.productId}`)
    }

    const handleSelectionChange = (val) => {
      selectedProduct.value = val
    }

    const selectAll = (value) => {
      value ? table.value.toggleAllSelection() : table.value.clearSelection()
    }

    return {
      products,
      activeName,
      handleCreateClick,
      handleDetailClick,
      searchIcon,
      tableHeight,
      selectedAction,
      selectedHeader,
      handleSelectionChange,
      table,
      isShowHeaderTable,
      selectAll,
      selectedProduct
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
  .search {
    margin: 12px;
    width: 400px;
  }

  .header-table {
    height: 40px;
    display: flex;
    align-items: center;
    gap: 24px;
    padding-left: 16px;
    background: rgba(217, 218, 218, 0.8);
  }
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

    :deep(.el-table__inner-wrapper) {
      .table-head {
        background: rgba(217, 218, 218, 0.8);
      }

      .el-table__append-wrapper {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        right: 24px;
        bottom: 24px;
      }
    }
  }
}
</style>
