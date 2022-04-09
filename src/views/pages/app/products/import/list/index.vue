<template>
  <div class="manage-warehouse">
    <the-header v-model="inputSearch" />
    <header-table
      v-if="!isShowHeaderTable"
      v-model="checkedSelectProduct"
      @changeCBB="changeCBB"
      :selected-number="selectedProduct?.length"
      @clearSelected="clearSelected"
    />
    <the-table
      :data="tableData"
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
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import TheHeader from './the-header.vue'
import HeaderTable from './header-table.vue'
import TheTable from './the-table.vue'
import baseStore from '@/views/pages/base/base-store'
import { useStore } from 'vuex'
import { setImportInfo, getImportsInfo } from '@/utils/import-storage.js'

export default {
  components: { TheHeader, HeaderTable, TheTable },

  setup () {
    const store = useStore()
    const pageSizes = reactive([5, 25, 50, 75, 100])
    const pageSize = ref(500)

    const params = computed(() => {
      return {
        pageIndex: 0,
        pageSize: pageSize.value,
        search: inputSearch.value
      }
    })
    const config = reactive({
      storeConfig: {
        moduleName: 'import',
        entityKey: params,
        entityName: 'Imports'
      }
    })
    const inputSearch = ref('')

    const { loadData } = baseStore(config)
    const tableRef = ref(null)
    const tableData = ref([])
    const selectedProduct = ref([])
    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })
    const checkedSelectProduct = ref(true)

    const changeCBB = (val) => {
      val
        ? tableRef.value.tableRef.toggleAllSelection()
        : tableRef.value.tableRef.clearSelection()
    }

    const clearSelected = () => {
      tableRef.value.tableRef.clearSelection()
    }

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
      store.dispatch('import/getImports', params.value)
    }

    return {
      tableData,
      isShowHeaderTable,
      handleSelectionChange,
      changeCBB,
      selectedProduct,
      inputSearch,
      checkedSelectProduct,
      tableRef,
      clearSelected,
      pageSizes,
      handleChangePageSize,
      pageSize
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-warehouse {
  margin-top: 56px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  margin-bottom: -56px;

  .paging-container {
    display: flex;
    :deep(.el-input) {
      width: 50px;
    }
  }
}
</style>
