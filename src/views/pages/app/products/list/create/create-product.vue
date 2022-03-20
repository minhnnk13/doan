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
                        :label="category.unitName"
                        :value="category.unitId"
                        v-for="(category, index) in units"
                        :key="index"
                      />
                    </el-select>
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
                <el-form-item
                  label="Giá bán lẻ"
                  label-position="top"
                >
                  <el-input v-model="product.retailPrice" />
                </el-form-item>
              </div>
              <div class="sub-price-2">
                <el-form-item
                  label="Giá bán buôn"
                  label-position="top"
                >
                  <el-input v-model="product.wholesalePrice" />
                </el-form-item>
              </div>
            </div>
            <div class="content-container">
              <el-form-item
                label="Giá nhập"
                label-position="top"
              >
                <el-input v-model="product.unitPrice" />
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="content-wrapper img-container">
          <div class="img-container-header">
            <div class="img-description">
              {{ `Ảnh sản phẩm` }}
            </div>
            <div class="delete-all">
              Xóa tất cả
            </div>
          </div>
          <el-form
            :model="form"
            label-position="top"
          >
            <div class="content-container">
              <uploader />
            </div>
          </el-form>
        </div>
      </div>
      <div class="right-container">
        <more-info />
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore, mapState, mapActions, mapMutations } from 'vuex'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Uploader from '@/views/pages/common/uploader.vue'
import MoreInfo from './more-info'
import { getUserInfo } from '@/utils/auth'

const PRODUCT_MODULE = 'product'

export default {
  components: {
    Uploader,
    MoreInfo
  },
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

    // quay lai man danh sach san pham
    const handleBackClick = () => {
      router.push('/app/list-product')
    }

    return {
      handleBackClick,
      isEdit
    }
  },

  computed: {
    ...mapState(PRODUCT_MODULE, ['product']),
    ...mapState('unit', ['units'])
  },

  methods: {
    ...mapMutations(PRODUCT_MODULE, ['setProduct']),
    ...mapActions(PRODUCT_MODULE, ['createProduct']),
    ...mapActions('unit', ['getUnits']),

    handleSaveClick () {
      this.product.userId = getUserInfo().userId
      if (!this.product.productId) {
        this.product.createdDate = new Date()
      }
      this.product.modifyCreate = new Date()
      this.product.supplierId = 1
      this.createProduct(this.product)
    }
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
