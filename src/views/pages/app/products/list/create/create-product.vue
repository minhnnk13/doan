<template>
  <div class="create-product-container">
    <div class="create-header">
      <div
        class="back-container"
        @click="handleBackClick"
      >
        {{ "Quay lại danh sách sản phẩm " }}
      </div>
      <div class="btn-container">
        <el-button @click="handleBackClick">
          Thoát
        </el-button>
        <el-button
          type="primary"
          @click="handleSaveClick"
        >
          Lưu
        </el-button>
      </div>
    </div>
    <div
      class="product-name-container"
      v-if="isEdit"
    >
      {{ product.productName }}
    </div>
    <div class="create-content-container">
      <div class="left-container">
        <div class="content-wrapper detail-container">
          <div class="title-container">
            Thông tin chung
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
                <div class="product-code">
                  <el-form-item
                    label="Mã sản phẩm/SKU"
                    label-position="top"
                  >
                    <el-input v-model="product.productCode" />
                  </el-form-item>
                </div>
                <div class="unit-contaienr">
                  <el-form-item
                    label="Đơn vị tính"
                    label-position="top"
                  >
                    <el-select
                      placeholder="Chọn loại sản phẩm"
                      v-model="product.unitId"
                    >
                      <el-option
                        :label="unit.unitName"
                        :value="unit.unitId"
                        v-for="(unit, index) in units"
                        :key="index"
                      />
                    </el-select>
                    <el-icon class="icon-container">
                      <plus @click="handleShowAddInfoClick" />
                    </el-icon>
                  </el-form-item>
                </div>
              </div>
              <div class="description-container">
                <el-form-item
                  label="Mô tả sản phẩm"
                  label-position="top"
                >
                  <el-input
                    v-model="product.description"
                    :rows="2"
                    type="textarea"
                  />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="content-wrapper price-container">
          <div class="title-container">
            Giá sản phẩm
          </div>
          <el-form
            :model="form"
            label-position="top"
          >
            <div class="sub-price-container">
              <div class="sub-price-1">
                <text-field
                  :label="'Giá bán lẻ'"
                  :is-number="true"
                  v-model="product.retailPrice"
                />
              </div>
              <div class="sub-price-2">
                <text-field
                  :label="'Giá bán buôn'"
                  :is-number="true"
                  v-model="product.wholesalePrice"
                />
              </div>
            </div>
            <div class="content-container">
              <text-field
                :label="'Giá nhập'"
                :is-number="true"
                v-model="product.unitPrice"
              />
            </div>
          </el-form>
        </div>
        <div class="content-wrapper img-container">
          <div class="img-container-header">
            <div class="img-description">
              {{ `Ảnh sản phẩm` }}
            </div>
          </div>
          <el-form
            :model="form"
            label-position="top"
          >
            <div class="content-container">
              <uploader :product="product" />
            </div>
          </el-form>
        </div>
      </div>
      <div class="right-container">
        <more-info />
      </div>
    </div>
    <add-info-popup
      :info-add="infoAdd"
      ref="addInfoDialog"
    />
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore, mapState, mapActions, mapMutations } from 'vuex'
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Uploader from '@/views/pages/common/uploader.vue'
import MoreInfo from './more-info'
import { getUserInfo } from '@/utils/auth'
import messageBox from '@/utils/message-box'
import dayjs from 'dayjs'
import AddInfoPopup from '@/views/pages/app/products/list/create/add-info-popup.vue'

const PRODUCT_MODULE = 'product'

export default {
  components: {
    Uploader,
    MoreInfo,
    Plus,
    AddInfoPopup
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const isEdit = ref(false)
    const addInfoDialog = ref(null)
    const infoAdd = 3

    if (route.params?.productId) {
      store.dispatch(`${PRODUCT_MODULE}/getProduct`, route.params.productId)
      isEdit.value = true
    }
    store.dispatch('unit/getUnits')

    const product = computed(() => store.state.product.product)

    const handleShowAddInfoClick = () => {
      addInfoDialog.value.handleOpenPopupClick()
    }

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
      handleShowAddInfoClick,
      infoAdd,
      addInfoDialog
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

            .icon-container {
              margin-left: 12px;
              cursor: pointer;
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
