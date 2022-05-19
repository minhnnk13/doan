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
          Tạo đơn hàng
        </el-button>
      </div>
    </div>
    <div
      class="all-product-tab"
      active-name="first"
    >
      <div class="title">
        <div
          class="tab"
          :class="{'active': tabActive === 1}"
        >
          Tất cả đơn hàng
        </div>
        <div
          class="tab"
          :class="{'active': tabActive === 2}"
        >
          Đang giao dịch
        </div>
      </div>
      <div class="search">
        <text-field
          v-model="inputSearch"
          class="w-50 m-2"
          size="large"
          placeholder="Tìm kiếm theo mã đơn hàng, vận đơn, tên khách hàng"
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
        :data="orders"
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
          label="Mã Đơn hàng"
          align="center"
        >
          <template #default="prop">
            <el-button
              type="text"
              @click="onClickOrder(prop.row.exportID)"
            >
              {{ prop.row.exportID }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="Ngày tạo đơn"
        >
          <template #default="prop">
            {{ formatDate(prop.row.exportTime) }}
          </template>
        </el-table-column>

        <el-table-column
          label="Tên khách hàng"
        >
          <template #default="prop">
            {{ getCustomerName(prop.rowcustomerID) }}
          </template>
        </el-table-column>

        <el-table-column
          label="Trạng thái đơn hàng"
          align="center"
        >
          <template #default="prop">
            <el-tag

              :type="getTag(prop.row.status)?.type"
              class="mx-1"
              effect="light"
            >
              {{ getTag(prop.row.status)?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Thanh toán"
          align="center"
        >
          <template #default="prop">
            <div
              class="done"
              v-if="prop.row.status === $enumeration.OrderStatus.Complete"
            >
              <el-icon><Check /></el-icon>
            </div>

            <div class="not-done">
              <el-icon><CloseBold /></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column

          label="Khách phải trả"
        >
          <template #default="prop">
            {{ formatPrice(prop.row.exportPrice) }}
          </template>
        </el-table-column>

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

<script setup>
import { useStore } from 'vuex'
import commonFn, { formatDate, formatPrice } from '@/common/common-fn'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuthToken } from '@/utils/auth'
import { Search, CloseBold, Check } from '@element-plus/icons-vue'
import { debounce } from 'lodash'
import Enumaration from '@/common/enumeration'
const MODULE_NAME = 'order'
const CUSTOMER_MODULE_NAME = 'customer'

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
const tabActive = ref(1)
const pageSize = ref(5)
const pageSizes = reactive([5, 25, 50, 75, 100])
const params = computed(() => {
  return {
    pageIndex: 0,
    pageSize: pageSize.value
  }
})
onMounted(async () => {
  await loadData()
})

const orders = computed(() => store.state[MODULE_NAME].orders)
const customers = computed(() => store.state[CUSTOMER_MODULE_NAME].customers)
const tableHeight = ref(window.innerHeight - 300)
const isShowHeaderTable = computed(() => {
  return !selectedProduct.value?.length
})

const handleChangePageSize = () => {
  store.dispatch(`${MODULE_NAME}/getOrders`, params.value)
}

// xu li event nut back
const handleCreateClick = () => {
  router.push({ name: 'CreateOrder' })
}

const handleSelectionChange = (val) => {
  selectedProduct.value = val
}

const selectAll = (value) => {
  value ? table.value.toggleAllSelection() : table.value.clearSelection()
}

const loadData = async () => {
  await store.dispatch(`${CUSTOMER_MODULE_NAME}/getCustomers`)
  await store.dispatch(`${MODULE_NAME}/getOrders`, params.value)
}

const onClickOrder = (id) => {
  router.push({ name: 'CreateOrder', query: { exportID: id } })
}

const getCustomerName = (id) => {
  const customer = customers.value.find(element => element.customerID === id)
  return customer.customerName
}

const getTag = (status) => {
  const data = {
    type: '',
    label: 'Đặt hàng'
  }

  switch (status) {
    case Enumaration.OrderStatus.Create:
      data.type = ''
      data.label = 'Đặt hàng '
      break
    case Enumaration.OrderStatus.Browse:
    case Enumaration.OrderStatus.Export:
      data.type = 'warning'
      data.label = 'Đang giao dịch'
      break

    case Enumaration.OrderStatus.Complete:
      data.type = 'success'
      data.label = 'Hoàn thành'
      break
  }

  return data
}

</script>

<style lang="scss" scoped>
:deep(.el-tag) {
  width: 100px;
}
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
      padding-left: 12px;
      line-height: 40px;
      display: flex;
      gap: 12px;
      border-bottom: 1px solid #ccc;
      font-weight: 500;

      .tab {
        cursor: pointer;

        &.active {
          position: relative;
          color: $color--green;

          &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background: $color--green;
            font-weight: 700;
          }
        }
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

    :deep(.el-table__body) {
      .done {
        color: #00d111;
      }

      .not-done {
        color: rgb(177, 0, 0);
      }
    }
  }
}
</style>
