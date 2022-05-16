<template>
  <div class="list-container">
    <div class="header-container">
      <div class="former-half-container" />
      <div class="latter-half-container">
        <el-button
          class="btn-style"
          type="primary"
          @click="onCreateBtnClick"
        >
          Thêm Chi nhánh
        </el-button>
      </div>
    </div>
    <div
      class="all-product-tab"
      active-name="first"
    >
      <div class="title">
        Tất cả chi nhánh
      </div>
      <el-table
        :data="brands"
        ref="table"
        style="width: 100%"
        class="table-style"
        table-layout="auto"
        header-cell-class-name="table-head"
        :max-height="tableHeight"
      >
        <el-table-column
          prop="brandName"
          label="Tên chi nhánh"
        />

        <el-table-column
          prop="brandCode"
          label="Mã CN"
        />
        <el-table-column
          prop="address"
          label="Địa chỉ"
        />
        <el-table-column
          prop="saleQuantity"
          label="Quận/Huyện"
        />
        <el-table-column
          prop="city"
          label="Thành phố"
        />
        <el-table-column
          prop="status"
          label="Trạng thái"
        />

        <el-table-column
          prop="status"
          label="Chi nhánh mặc định"
          align="center"
        >
          <template #default>
            <el-icon><check /></el-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <create-popup
    ref="createPopup"
  />
</template>

<script setup>
import { useStore } from 'vuex'
import { reactive, ref, computed, onMounted } from 'vue'
import CreatePopup from './create/index.vue'

const MODULE_NAME = 'brand'
const store = useStore()
const createPopup = ref(null)

const brands = computed(() => store.state[MODULE_NAME].brands)
const tableHeight = ref(window.innerHeight - 300)

// xu li event nut back
const onCreateBtnClick = () => {
  createPopup.value.openPopup()
}

onMounted(async () => {
  await store.dispatch(`${MODULE_NAME}/getBrands`)
})
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
