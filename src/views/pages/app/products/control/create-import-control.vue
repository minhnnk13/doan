<template>
  <div class="create-product-container">
    <div class="create-header">
      <div
        class="back-container"
        @click="handleBackClick"
      >
        {{ "Đơn nhập hàng" }}
      </div>
      <div class="process-container" />
    </div>
    <div
      class="product-name-container"
    >
      {{ "Tạo đơn nhập hàng" }}
    </div>
    <div class="create-content-container">
      <div class="">
        <div class="content-wrapper detail-container">
          <div class="title-container">
            Thông tin phiếu kiểm hàng
          </div>
          <el-form
            :model="form"
            label-position="top"
          >
            <div class="content-container">
              <el-form-item
                label="Tên sản phẩm"
                label-position="top"
              >
                <el-input v-model="product.productName" />
              </el-form-item>

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
                    <el-select
                      placeholder="Tên nhân viên"
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
                <div class="description-container">
                  <el-form-item
                    label="Ghi chú"
                    label-position="top"
                  >
                    <el-input
                      v-model="product.note"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="content-wrapper price-container" />
      </div>
    </div>
  </div>
</template>
<script>

// to do: sử dụng emits trong thằng con để thay đổi dữ liệu ở thằng cha
// tạo computed cho dynamic component
// viết hàm switch - case để đổi component
// truyền vào hàm emits
// computed lưu dữ liệu

import { useRouter, useRoute } from 'vue-router'
import { useStore, mapState, mapActions, mapMutations } from 'vuex'
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getUserInfo } from '@/utils/auth'
import messageBox from '@/utils/message-box'
import dayjs from 'dayjs'

const PRODUCT_MODULE = 'product'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    let isEdit = ref(false)
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
      callbackMessageBox
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
    this.setProduct({})
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
    display: flex;

    .left-container {
      width: 60%;
      .management-container,
      .detail-container,
      .price-container {
        margin-top: 24px;

        .product-code-unit-container {
          display: flex;
          width: 100%;
          justify-content: space-between;
          div {
            width: 50%;
            :deep(.el-form-item) {
              width: 100%;
              .el-input {
                width: 100%;
              }
            }
          }

          .unit-contaienr {
            margin-left: 12px;
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

      .img-container {
        margin-top: 24px;
        .img-container-header {
          display: flex;
          justify-content: space-between;
          padding: 12px;

          .img-description {
            font-weight: 700;
          }
        }
      }
    }

    .right-container {
      width: 40%;
    }
  }
}
</style>
