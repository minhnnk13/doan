<template>
  <div class="create-product-container">
    <div class="product-name-container">
      {{ "Tạo phiếu hàng" }}
    </div>
    <div class="create-content-container">
      <div class="content-wrapper info-container">
        <div class="title-container">
          Thông tin phiếu kiểm hàng
        </div>
        <el-form
          :model="form"
          label-position="top"
        >
          <div class="content-container">
            <div class="product-code-unit-container">
              <div class="branch-contaienr">
                <el-form-item
                  label="Chi nhánh kiểm"
                  label-position="top"
                >
                  <el-select
                    placeholder="Chi nhánh mặc định"
                    v-model="product.unitId"
                  >
                    <el-option
                      :label="unit.unitName"
                      :value="unit.unitId"
                      v-for="(unit, index) in units"
                      :key="index"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="employee-contaienr">
                <el-form-item
                  label="Nhân viên kiểm hàng"
                  label-position="top"
                >
                  <el-input
                    placeholder="Tên nhân viên"
                    v-model="product.employeeName"
                    disabled
                  />
                </el-form-item>
              </div>
              <div class="note-container">
                <el-form-item
                  label="Ghi chú"
                  label-position="top"
                >
                  <el-input v-model="product.note" />
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="content-wrapper list-container">
        <div class="title-container">
          Danh sách sản phẩm
        </div>
        <div class="search">
          <text-field
            v-model="inputSearch"
            class="w-50 m-2"
            size="large"
            placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode"
            :prefix-icon="searchIcon"
          />
        </div>
        <el-table
          :data="products"
          ref="table"
          style="width: 100%"
          class="table-style"
          table-layout="auto"
          header-cell-class-name="table-head"
          :max-height="tableHeight"
        >
          <el-table-column
            prop="image"
            label="STT"
            class="cursor-pointer"
          >
            <template #default="props">
              <img
                :src="props.row?.image"
                width="100"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="Mã SKU"
            class="cursor-pointer"
          />
          <el-table-column
            prop="categoryName"
            label="Tên sản phẩm"
          />
          <el-table-column
            prop="saleQuantity"
            label="Đơn vị"
          />
          <el-table-column
            prop="stockQuantity"
            label="Tồn chi nhánh"
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
      <div class="confirm-btn-container">
        <el-button
          class="btn-style"
          type="primary"
          @click="$emit('onConfirmListClick')"
        >
          Xác nhận danh sách
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>

import { useRouter, useRoute } from 'vue-router'
import { useStore, mapState, mapActions, mapMutations } from 'vuex'
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { getUserInfo } from '@/utils/auth'
import messageBox from '@/utils/message-box'
import dayjs from 'dayjs'

const PRODUCT_MODULE = 'product'

export default {
  emits: ['onConfirmListClick'],

  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    let isEdit = ref(false)
    const searchIcon = ref(Search)
    const pageSize = ref(5)
    const pageSizes = reactive([5, 10, 15, 20, 25, 30, 35, 40, 50, 55])
    const inputSearch = ref('')
    const params = computed(() => {
      return {
        pageIndex: 0,
        pageSize: pageSize.value,
        search: inputSearch.value
      }
    })
    if (route.params?.productId) {
      store.dispatch(`${PRODUCT_MODULE}/getProduct`, route.params.productId)
      isEdit = true
    }

    const product = computed(() => store.state.product.product)

    // quay lai man danh sach san pham
    const handleBackClick = () => {
      router.push('/app/list-product')
    }

    // xu li xoa san pham
    const handleSaveClick = () => {
      messageBox.showConfirm(
        'Bạn có đồng ý lưu sản phẩm này?',
        callbackMessageBox,
        {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Thoát'
        }
      )
    }

    // confirm xoa
    const callbackMessageBox = (action) => {
      if (action === 'confirm') {
        product.value.userId = getUserInfo().userId
        if (!product.value.productId) {
          product.value.createdDate = dayjs(new Date()).format('YYYY-MM-DD')
        }
        product.value.modifyCreate = dayjs(new Date()).format('YYYY-MM-DD')
        product.value.supplierId = 1

        if (isEdit.value) {
          product.value.isSale = product.value.sale

          if (typeof product.value.brandId === 'object') {
            product.value.brandId = product.value.brandId.brandId
          }

          if (typeof product.value.categoryId === 'object') {
            product.value.categoryId = product.value.categoryId.categoryId
          }

          if (typeof product.value.unitId === 'object') {
            product.value.unitId = product.value.unitId.unitId
          }
        }

        store
          .dispatch(`${PRODUCT_MODULE}/createProduct`, product.value)
          .then((res) => {
            if (res) {
              ElMessage({
                type: 'success',
                message: 'Lưu thành công'
              })
              router.push('/app/list-product')
            }
          })
      }
    }

    return {
      handleBackClick,
      isEdit,
      handleSaveClick,
      callbackMessageBox,
      searchIcon,
      pageSizes,
      pageSize,
      inputSearch
    }
  },

  computed: {
    ...mapState(PRODUCT_MODULE, ['product']),
    ...mapState('unit', ['units'])
  },

  methods: {
    ...mapMutations(PRODUCT_MODULE, ['setProduct']),
    ...mapActions(PRODUCT_MODULE, ['createProduct']),
    ...mapActions('unit', ['getUnits'])
  },

  mounted () {},

  beforeUnmount () {
  }
}
</script>
<style lang="scss" scoped>
.create-product-container {
  height: 100%;
  overflow: auto;
  .create-header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .back-container {
      cursor: pointer;
      margin-bottom: 12px;

      &:hover {
        color: #409eff;
      }
    }
  }

  .product-name-container {
    font-size: 28px;
    font-weight: 700;
  }

  .create-content-container {
    width: 100%;

    .info-container,
    .list-container {
      margin-top: 24px;
      width: 100%;

      .info-title-container {
        font-weight: 700;
        padding: 12px 0 0 12px;
      }

      .product-code-unit-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        div {
          width: 30%;
          :deep(.el-form-item) {
            width: 100%;
            .el-input {
              width: 100%;
            }
            .el-select {
              width: 100%;
            }
          }
        }
      }

      .sub-price-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 12px;
        div {
          width: 50%;
          :deep(.el-form-item) {
            width: 100%;
            .el-input {
              width: 100%;
            }
          }
        }

        .sub-price-2 {
          margin-left: 12px;
        }
      }
    }

    .list-container {
      height: 100%;
      .search {
        margin: 12px;
        width: 98%;
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
          position: absolute;
          right: 24px;
          bottom: 8px;
          .paging-container {
            display: flex;
            .el-input {
              width: 50px;
            }
          }
        }
      }
    }

    .confirm-btn-container {
      margin-top: 12px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
