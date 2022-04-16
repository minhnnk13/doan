<template>
  <div class="detail-container">
    <div class="btn-container">
      <el-button @click="handleExitClick">
        Thoát
      </el-button>
      <el-button @click="handleDeleteClick">
        Xóa
      </el-button>
      <el-button
        type="primary"
        @click="handleEditClick"
      >
        Sửa sản phẩm
      </el-button>
    </div>
    <div class="product-name-container">
      {{ product.productName }}
    </div>
    <div class="content-wrapper">
      <div class="title-container">
        Thông tin sản phảm
      </div>
      <div class="product-detail">
        <div class="info-container">
          <div class="product-info">
            <div class="title">
              Tên phiên bản sản phẩm
            </div>
            <div class="value">
              {{ product.productName }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Mã SKU
            </div>
            <div class="value">
              {{ product.productCode }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Đơn vị tính
            </div>
            <div class="value">
              {{ product.unitId?.unitName }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Loại sản phẩm
            </div>
            <div class="value">
              {{ product.categoryId?.categoryName }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Nhãn hiệu
            </div>
            <div class="value">
              {{ product.brandId?.brandName }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Ngày tạo
            </div>
            <div class="value">
              {{ product.createdDate }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Ngày cập nhật cuối
            </div>
            <div class="value">
              {{ product.modifyCreate }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Mô tả
            </div>
            <div class="value">
              {{ product.description }}
            </div>
          </div>
        </div>
        <div class="img-container">
          <img
            class="product-img"
            :src="product.image"
          >
        </div>
      </div>
    </div>
  </div>
  <div class="price-container content-wrapper">
    <div class="title-container">
      Giá sản phẩm
    </div>
    <div class="retail-wholesale-container">
      <div class="retail-price">
        <div class="title">
          Giá bán lẻ
        </div>
        <div class="value">
          {{ product.renderRetailPrice }}
        </div>
      </div>
      <div class="whole-sale-price">
        <div class="title">
          Giá bán buôn
        </div>
        <div class="value">
          {{ product.renderWholesalePrice }}
        </div>
      </div>
    </div>

    <div class="unit-price">
      <div class="title">
        Giá nhập
      </div>
      <div class="value">
        {{ product.renderUnitPrice }}
      </div>
    </div>
  </div>
  <div class="common-info-container content-wrapper">
    <div class="title-container">
      Thông tin thêm
    </div>
    <div class="common-info">
      <div>
        <el-checkbox
          v-model="product.sale"
          label="Cho phép bán"
          size="large"
          disabled
        />
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import messageBox from '@/utils/message-box'

const PRODUCT_MODULE = 'product'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    store.dispatch(`${PRODUCT_MODULE}/getProduct`, route.params.productId)
    const product = computed(() => store.state.product.product)

    // xu li xoa san pham
    const handleDeleteClick = () => {
      messageBox.showConfirm(
        'Thao tác này sẽ xóa sản phẩm này, bạn có chắc chắn muốn xóa không?',
        callbackMessageBox,
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Thoát'
        }
      )
    }

    // confirm xoa
    const callbackMessageBox = (action) => {
      if (action === 'confirm') {
        store
          .dispatch(`${PRODUCT_MODULE}/deleteProduct`, route.params.productId)
          .then((res) => {
            if (res) {
              ElMessage({
                type: 'success',
                message: 'Xóa sản phẩm thành công'
              })
              router.push('/app/list-product')
            }
          })
      }
    }

    // xu li thoat man chi tiet
    const handleExitClick = () => {
      router.push('/app/list-product')
    }

    // xu li sua san pham
    const handleEditClick = () => {
      router.push(`/app/edit/${route.params.productId}`)
    }
    return {
      product,
      handleDeleteClick,
      handleEditClick,
      handleExitClick
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container {
  width: 100%;

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }

  .product-name-container {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 24px;
  }

  .product-detail {
    display: flex;
    padding: 12px;
    .info-container {
      width: 60%;
      .product-info {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
      }
    }
    .img-container {
      width: 40%;
      margin-left: 40px;
      object-fit: cover;

      .product-img {
        width: 100%;
        border-radius: 10px;
      }
    }
  }
}

.price-container {
  margin-top: 24px;
  padding: 12px;

  .retail-wholesale-container {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 12px;

    div {
      width: 50%;
      display: flex;
    }
  }

  .unit-price {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    width: 51%;
    div {
      width: 50%;
      display: flex;
    }
  }
}

.common-info-container {
  margin-top: 24px;
  padding: 12px;

  .common-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
    div {
      width: 100%;
    }
    .el-checkbox {
      width: 40%;
    }
  }
}

.title {
  font-weight: 700;
}
</style>
