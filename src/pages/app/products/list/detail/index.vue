<template>
  <div class="detail-container">
    <div class="title-container">
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
              {{ `:${product.productName}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Mã SKU
            </div>
            <div class="value">
              {{ `:${product.productCode}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Đơn vị tính
            </div>
            <div class="value">
              {{ `:${product.unitId.unitName}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Phân loại
            </div>
            <div class="value">
              {{ `:${product.name}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Loại sản phẩm
            </div>
            <div class="value">
              {{ `:${product.name}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Nhãn hiệu
            </div>
            <div class="value">
              {{ `:${product.brandId.brandName}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Ngày tạo
            </div>
            <div class="value">
              {{ `:${product.createdDate}` }}
            </div>
          </div>
          <div class="product-info">
            <div class="title">
              Ngày cập nhật cuối
            </div>
            <div class="value">
              {{ `:${product.modifyCreate}` }}
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
          {{ product.retailPrice }}
        </div>
      </div>
      <div class="whole-sale-price">
        <div class="title">
          Giá bán buôn
        </div>
        <div class="value">
          {{ product.wholesalePrice }}
        </div>
      </div>
    </div>

    <div class="unit-price">
      <div class="title">
        Giá nhập
      </div>
      <div class="value">
        {{ product.unitPrice }}
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const PRODUCT_MODULE = 'product'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    store.dispatch(`${PRODUCT_MODULE}/getProduct`, route.params.productId)
    const product = store.state.product.product
    return {
      product
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container {
  width: 100%;

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
    width: 50%;
    div {
      float: left;
    }
  }
}
</style>
