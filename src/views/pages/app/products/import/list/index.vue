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
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :default-page-size="5"
          :pager-count="4"
          layout="prev, pager, next"
          :total="100"
        />
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
    const pageSizes = reactive([5, 10, 15, 20, 25, 30, 35, 40, 50, 55])
    const pageSize = ref(15)

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

    loadData().then(res => {
      tableData.value = res
    })

    const handleSelectionChange = (val) => {
      val.length
        ? checkedSelectProduct.value = true
        : checkedSelectProduct.value = false

      selectedProduct.value = val
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
      pageSizes
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
}
</style>
