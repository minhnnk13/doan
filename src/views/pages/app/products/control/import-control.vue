<template>
  <div class="list-container">
    <div class="header-container">
      <div class="former-half-container" />
      <div class="latter-half-container">
        <el-button
          class="btn-style"
          type="primary"
          @click="$emit('onCreateClick')"
        >
          Tạo phiếu kiểm
        </el-button>
      </div>
    </div>
    <div
      class="all-product-tab"
      active-name="first"
    >
      <div class="title">
        Tất cả
      </div>
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
          label="Ghi chú"
        />
        <template #append>
          <div class="paging-container">
            <div style="margin-right: 12px; margin-top: 6px">
              {{ "Hiển thị" }}
            </div>
            <el-select
              v-model="pageSize"
              @change="handleChangePageSize"
              size="small"
            >
              <el-option
                v-for="(pageSizeIndex, index) in pageSizes"
                :key="index"
                :label="pageSizeIndex"
                :value="pageSizeIndex"
              />
            </el-select>
            <div
              style="margin-right: 12px; margin-left: 12px; margin-top: 6px"
            >
              {{ "Kết quả" }}
            </div>
          </div>
        </template>
      </el-table>
    </div>
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
  emits: ['onCreateClick'],

  setup () {
    // #declare
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const activeName = ref('first')
    const table = ref('table')
    const searchIcon = ref(Search)
    const selectedHeader = ref(true)
    const selectedAction = ref(null)
    const pageSize = ref(5)
    const selectedProduct = ref([])
    const products = computed(() => store.state.product.products)
    const tableHeight = ref(window.innerHeight - 300)
    const pageSizes = reactive([5, 10, 15, 20, 25, 30, 35, 40, 50, 55])
    // #enddeclare

    // #Computed
    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })

    const params = computed(() => { return { pageIndex: 0, pageSize: pageSize.value, search: '' } })
    // #endComputed

    // #region Methods
    // xu li event nut back

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

    const handleChangePageSize = () => {
      store.dispatch(`${PRODUCT_MODULE}/getProducts`, params.value)
    }

    // #endregion

    store.dispatch(`${PRODUCT_MODULE}/getProducts`, params.value)

    return {
      products,
      activeName,
      handleDetailClick,
      searchIcon,
      tableHeight,
      selectedAction,
      selectedHeader,
      handleSelectionChange,
      table,
      isShowHeaderTable,
      selectAll,
      selectedProduct,
      pageSize,
      pageSizes,
      handleChangePageSize
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

    .title {
      height: 40px;
      position: relative;
      text-transform: uppercase;
      color: $color--green;
      font-weight: 700 ;
      padding-left: 12px;
      line-height: 40px;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 250px;
        background: $color--green;
      }
    }

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
        bottom: 32px;
        .paging-container {
          display: flex;
          .el-select {
            width: 50px !important;
          }
        }
      }
    }
  }
}
</style>
