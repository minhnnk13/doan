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
          Thêm khách hàng
        </el-button>
      </div>
    </div>
    <div
      class="all-product-tab"
      active-name="first"
    >
      <div class="title">
        Tất cả khách hàng
      </div>
      <div class="search">
        <text-field
          v-model="inputSearch"
          class="w-50 m-2"
          size="large"
          placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode"
          :prefix-icon="searchIcon"
          @keyup="handleSearch"
        />
      </div>
      <div
        class="header-table"
        v-if="!isShowHeaderTable"
      >
        <el-checkbox
          @change="selectAll"
          :model-value="selectedHeader"
        />
        Đã chọn {{ selectedProduct?.length }} trên trang này
        <el-select
          v-model="selectedAction"
          @change="selectAction"
          placeholder="Chọn thao tác"
        >
          <el-option
            v-for="(action, index) in actions"
            :key="index"
            :label="action.lable"
            :value="action.value"
          />
        </el-select>
      </div>
      <el-table
        :data="customers"
        ref="table"
        style="width: 100%"
        class="table-style"
        table-layout="auto"
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
          label="Mã khách hàng"
          align="center"
        >
          <template #default="prop">
            <el-button type="text">
              {{ prop.row.customerId }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="Tên khách hàng"
        />
        <el-table-column
          prop="customerPhone"
          label="Số điện thoại"
        />
        <el-table-column
          prop="customerAddress"
          label="Địa chỉ"
        />
        <el-table-column
          prop="debt"
          label="Công nợ hiện tại"
        />
        <el-table-column
          prop="debt"
          label="Tổng chi tiêu "
        />

        <el-table-column
          prop="debt"
          label="Tổng SL đơn hàng"
        />
      </el-table>
    </div>
  </div>

  <create-customer ref="createCustomer" />
</template>

<script>
import { useStore } from 'vuex'
import commonFn, { redirectToApp } from '@/common/common-fn'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuthToken } from '@/utils/auth'
import { Search } from '@element-plus/icons-vue'
import { debounce } from 'lodash'
import CreateCustomer from './create'

const MODULE_NAME = 'customer'

export default {

  components: {
    CreateCustomer
  },

  setup () {
    const store = useStore()
    const router = useRouter()
    const activeName = ref('first')
    const table = ref('table')
    const searchIcon = ref(Search)
    const selectedHeader = ref(true)
    const selectedAction = ref(null)
    const inputSearch = ref('')
    const selectedProduct = ref([])
    const createCustomer = ref(null)

    onMounted(async () => {
      await loadData()
    })

    const customers = computed(() => store.state[MODULE_NAME].customers)
    const tableHeight = ref(window.innerHeight - 300)
    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })

    // xu li event nut back
    const handleCreateClick = () => {
      createCustomer.value.openPopup()
    }

    const handleSelectionChange = (val) => {
      selectedProduct.value = val
    }

    const selectAll = (value) => {
      value ? table.value.toggleAllSelection() : table.value.clearSelection()
    }

    const loadData = async () => {
      await store.dispatch(`${MODULE_NAME}/getCustomers`)
    }

    return {
      customers,
      activeName,
      handleCreateClick,
      searchIcon,
      tableHeight,
      selectedAction,
      selectedHeader,
      handleSelectionChange,
      table,
      isShowHeaderTable,
      selectAll,
      selectedProduct,
      inputSearch,
      createCustomer
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

    :deep(.el-table__inner-wrapper) {
      .table-head {
        background: rgba(217, 218, 218, 0.8);
      }

      .el-table__append-wrapper {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        right: 24px;
        bottom: 27px;
        .paging-container {
          display: flex;
          .el-input {
            width: 50px;
          }
        }
      }
    }
  }
}
</style>
