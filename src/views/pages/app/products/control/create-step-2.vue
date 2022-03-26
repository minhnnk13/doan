<template>
  <div class="create-product-container">
    <div class="adjustment-id-container">
      {{ "IAN00007" }}
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
            <div class="detail-info-container">
              <div class="branch-status-container">
                <div class="branch-container">
                  <img
                    :src="iconBranch"
                    :height="24"
                  >
                  <div class="branch">
                    Chi nhánh mặc định
                  </div>
                </div>
                <div class="status-container">
                  Đang kiểm kho
                </div>
              </div>
              <div class="create-check-employee-container">
                <div class="create-employee-container">
                  <div class="key">
                    Nhân viên tạo:
                  </div>
                  <div class="value">
                    {{ "(Tên nhân viên)" }}
                  </div>
                </div>
                <div class="check-employee-container">
                  <div class="key">
                    Nhân viên kiểm:
                  </div>
                  <div class="value">
                    {{ "(Tên nhân viên)" }}
                  </div>
                </div>
              </div>
              <div class="create-check-date-container">
                <div class="create-date-container">
                  <div class="key">
                    Ngày tạo:
                  </div>
                  <div class="value">
                    {{ "23/03/2022" }}
                  </div>
                </div>
                <div class="check-date-container">
                  <div class="key">
                    Ngày kiểm:
                  </div>
                  <div class="value">
                    {{ "23/03/2022" }}
                  </div>
                </div>
              </div>
              <div class="note-container">
                <div class="key">
                  Ghi chú:
                </div>
                <div class="value">
                  {{ "Đây là ghi chú rất dài dành cho nhân viên" }}
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="content-wrapper list-container">
        <div class="title-container">
          Danh sách sản phẩm
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
          @click="$emit('onCheckClick')"
        >
          Kiểm hàng
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
// Đang fix cứng các thông tin

import { useRouter, useRoute } from 'vue-router'
import { useStore, mapState, mapActions, mapMutations } from 'vuex'
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { getUserInfo } from '@/utils/auth'
import messageBox from '@/utils/message-box'
import dayjs from 'dayjs'
import IconBranch from '@/assets/icons/import-control/image 32.svg'
const PRODUCT_MODULE = 'product'

export default {
  emits: ['onCheckClick'],

  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    let isEdit = ref(false)
    const searchIcon = ref(Search)
    const pageSize = ref(5)
    const pageSizes = reactive([5, 10, 15, 20, 25, 30, 35, 40, 50, 55])
    const inputSearch = ref('')
    const iconBranch = ref(IconBranch)
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
    store.dispatch('unit/getUnits')

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
      inputSearch,
      iconBranch
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

  beforeUnmount () {}
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

  .adjustment-id-container {
    font-size: 28px;
    font-weight: 700;
  }

  .create-content-container {
    width: 100%;
    .detail-info-container {
      display: flex;

      .branch-status-container {
        width: 20%;
        .branch-container {
          display: flex;

          img {
            margin-right: 8px;
            margin-top: -8px;
          }
        }
        .status-container {
          margin-top: 16px;
        }
      }

      .create-check-employee-container {
        width: 30%;

        .create-employee-container,
        .check-employee-container {
          display: flex;
          .key {
            width: 132px;
          }
        }

        .check-employee-container {
          margin-top: 16px;
        }
      }

      .create-check-date-container {
        width: 25%;
        .create-date-container,
        .check-date-container {
          display: flex;
          .key {
            width: 100px;
          }
        }

        .check-date-container {
          margin-top: 16px;
        }
      }

      .note-container {
        width: 25%;
      }
    }
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
