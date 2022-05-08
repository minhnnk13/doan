<template>
  <div class="manage-warehouse">
    <div class="manage-warehouse__header">
      <div class="title">
        Nhà cung cấp
      </div>

      <router-link :to="{name: 'CreateManufacture'}">
        <el-button type="primary">
          Thêm nhà cung cấp
        </el-button>
      </router-link>
    </div>
    <div class="manage-warehouse__container">
      <the-header
        v-model="inputSearch"
        @keyup="handleKeyUp"
      />
      <header-table
        v-if="!isShowHeaderTable"
        v-model="checkedSelectProduct"
        @changeCBB="changeCBB"
        :selected-number="selectedProduct?.length"
        @clearSelected="clearSelected"
      />
      <the-table
        :data="filterTableData"
        @handleSelectionChange="handleSelectionChange"
        :is-show-header-table="isShowHeaderTable"
        ref="tableRef"
      >
        <template #pagination>
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
            <div style="margin-right: 12px; margin-left: 12px; margin-top: 6px">
              {{ "Kết quả" }}
            </div>
          </div>
        </template>
      </the-table>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import theHeader from './the-header.vue'
import HeaderTable from './header-table.vue'
import TheTable from './the-table.vue'
import baseStore from '@/views/pages/base/base-store'
import { useStore } from 'vuex'

const PRODUCT_MODULE = 'supplier'

export default {
  components: { theHeader, HeaderTable, TheTable },

  setup () {
    const pageSize = ref(5)
    const params = computed(() => {
      return {
        pageIndex: 0,
        pageSize: pageSize.value,
        search: inputSearch.value
      }
    })

    const inputSearch = ref('')
    const pageSizes = reactive([5, 25, 50, 75, 100])
    const store = useStore()
    const config = reactive({
      storeConfig: {
        moduleName: 'supplier',
        entityKey: params,
        entityName: 'Suppliers'
      }
    })
    const { loadData } = baseStore(config)
    const tableRef = ref(null)
    const tableData = ref([])
    const selectedProduct = ref([])
    const checkedSelectProduct = ref(true)

    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })

    const changeCBB = (val) => {
      val
        ? tableRef.value.tableRef.toggleAllSelection()
        : tableRef.value.tableRef.clearSelection()
    }

    const clearSelected = () => {
      tableRef.value.tableRef.clearSelection()
    }

    const filterTableData = computed(() =>
      tableData.value.filter(
        (data) =>
          !inputSearch.value ||
          data.productName
            .toLowerCase()
            .includes(inputSearch.value.toLowerCase())
      )
    )
    loadData().then((res) => {
      tableData.value = res
    })

    const handleSelectionChange = (val) => {
      val.length
        ? (checkedSelectProduct.value = true)
        : (checkedSelectProduct.value = false)

      selectedProduct.value = val
    }

    const handleChangePageSize = () => {
      store.dispatch(`${PRODUCT_MODULE}/getSuppliers`, params.value)
    }

    const handleKeyUp = () => {
      store.dispatch(`${PRODUCT_MODULE}/getSuppliers`, params.value)
    }

    return {
      filterTableData,
      isShowHeaderTable,
      handleSelectionChange,
      changeCBB,
      selectedProduct,
      checkedSelectProduct,
      tableRef,
      clearSelected,
      pageSizes,
      pageSize,
      handleChangePageSize,
      inputSearch,
      handleKeyUp
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-warehouse {
  height: 100%;
  width: 100%;

  &__header {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: bold;
      font-size: 28px;
    }
  }

  &__container {
    margin-top: 24px;
    width: 100%;
    height: calc(100% - 80px);
    background-color: #fff;

    .paging-container {
      display: flex;
      :deep(.el-input) {
        width: 50px !important;
      }
    }
  }
}
</style>
