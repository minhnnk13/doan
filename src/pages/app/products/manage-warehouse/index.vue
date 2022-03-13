<template>
  <div class="manage-warehouse">
    <div class="view-products">
      <router-link
        to="list-product"
      >
        <el-button type="primary">
          Xem danh sách sản phẩm
        </el-button>
      </router-link>
    </div>

    <div class="title">
      Tất cả phiên bản sản phẩm
    </div>
    <div class="search">
      <text-field
        v-model="input1"
        class="w-50 m-2"
        size="large"
        placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode"
        :prefix-icon="searchIcon"
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
      table-layout="auto"
      header-cell-class-name="table-head"
      :data="data"
      :max-height="tableHeight"
      @selection-change="handleSelectionChange"
      :show-header="isShowHeaderTable"
      ref="tableRef"
    >
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column
        label="Ảnh"
        align="center"
      >
        <template #default="props">
          <img
            :src="props.row.image "
            width="100"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="Tên phiên bản sản phẩm"
        width="200"
        prop="productName"
      />
      <el-table-column
        label="Có thể bán"
        prop="saleQuantity"
      />
      <el-table-column
        label="Tồn kho"
        prop="stockQuantity"
      />
      <el-table-column
        label="Ngày khởi tạo"
        prop="createDate"
      />
      <el-table-column
        label="Giá bán lẻ"
        prop="retailPrice"
      />
      <el-table-column
        label="Giá nhập"
        prop="unitPrice"
      />

      <el-table-column
        label="Giá bán buôn"
        prop="whosalePrice"
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
  </div>
</template>

<script >
import { Search } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import baseStore from '@/views/pages/base/base-store'
export default {
  setup () {
    const searchIcon = ref(Search)
    const tableRef = ref(null)
    const config = reactive({
      storeConfig: {
        moduleName: 'product',
        entityKey: 'id',
        entityName: 'WareHouse'
      }
    })

    const actions = reactive([
      {
        lable: 'Đang giao dịch',
        value: 0
      },
      {
        lable: 'Ngừng giao dịch',
        value: 1
      },
      {
        lable: 'Xóa sản phẩm',
        value: 2
      }

    ])

    const selectedAction = ref(null)

    const selectedProduct = ref([])
    const data = ref(null)
    const { loadData } = baseStore(config)
    const tableHeight = ref(
      window.innerHeight - 300
    )

    const selectedHeader = ref(true)

    const isShowHeaderTable = computed(() => {
      return !selectedProduct.value?.length
    })
    loadData().then(res => {
      data.value = res
    })
    const handleSelectionChange = (val) => {
      selectedProduct.value = val
    }

    const selectAll = (value) => {
      value
        ? tableRef.value.toggleAllSelection()
        : tableRef.value.clearSelection()
    }

    return {
      searchIcon,
      data,
      isShowHeaderTable,
      tableHeight,
      handleSelectionChange,
      tableRef,
      selectAll,
      selectedProduct,
      actions,
      selectedAction,
      selectedHeader
    }
  },

  methods: {

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

  .view-products {
    position: absolute;
    top: -56px;
    right: 0;
    z-index: 9;
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
    background: rgba(217, 218, 218, 0.8);;
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
</style>
