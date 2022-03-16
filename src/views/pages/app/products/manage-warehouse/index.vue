<template>
  <div class="manage-warehouse">
    <the-header v-model="productSearchValue" />
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
import theHeader from './the-header.vue'
import HeaderTable from './header-table.vue'
import TheTable from './the-table.vue'
import baseStore from '@/views/pages/base/base-store'
export default {
  components: { theHeader, HeaderTable, TheTable },

  setup () {
    const config = reactive({
      storeConfig: {
        moduleName: 'product',
        entityKey: 'id',
        entityName: 'WareHouse'
      }
    })
    const { loadData } = baseStore(config)
    const tableRef = ref(null)
    const tableData = ref([])
    const selectedProduct = ref([])
    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })
    const productSearchValue = ref(null)
    const checkedSelectProduct = ref(true)

    const changeCBB = (val) => {
      val
        ? tableRef.value.tableRef.toggleAllSelection()
        : tableRef.value.tableRef.clearSelection()
    }

    const clearSelected = () => {
      tableRef.value.tableRef.clearSelection()
    }

    const filterTableData = computed(() => tableData.value.filter(data =>
      !productSearchValue.value || data.productName.toLowerCase().includes(productSearchValue.value.toLowerCase())
    ))
    loadData().then(res => {
      tableData.value = res
    })

    const handleSelectionChange = (val) => {
      val.length
        ? checkedSelectProduct.value = true
        : checkedSelectProduct.value = false

      selectedProduct.value = val
    }

    // const selectAll = (value) => {
    //   value
    //
    // }

    return {
      filterTableData,
      isShowHeaderTable,
      handleSelectionChange,
      changeCBB,
      selectedProduct,
      productSearchValue,
      checkedSelectProduct,
      tableRef,
      clearSelected
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
