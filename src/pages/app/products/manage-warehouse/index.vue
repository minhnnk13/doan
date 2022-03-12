<template>
  <div class="manage-warehouse">
    <div class="view-products">
      <el-button type="primary">
        Xem danh sách sản phẩm
      </el-button>
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
    <el-table
      table-layout="auto"
      header-cell-class-name="table-head"
      :data="data"
      :max-height="tableHeight"
    >
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column
        label="Ảnh"
        align="center"
        prop="image"
      />
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
import { reactive, ref } from 'vue'
import baseStore from '@/views/pages/base/base-store'
export default {
  setup () {
    const searchIcon = ref(Search)
    const config = reactive({
      storeConfig: {
        moduleName: 'product',
        entityKey: 'id',
        entityName: 'WareHouse'
      }
    })
    const data = ref(null)
    const { loadData } = baseStore(config)
    const tableHeight = ref(
      window.innerHeight - 300
    )
    loadData().then(res => {
      data.value = res
    })
    return {
      searchIcon,
      data,
      tableHeight
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
