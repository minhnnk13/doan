<template>
  <div class="more-info-wrapper">
    <div class="more-info-container content-wrapper">
      <div class="title-container">
        Thông tin bổ sung
      </div>
      <el-form label-position="top">
        <el-form-item
          class="product-category"
          label="Loại sản phẩm"
        >
          <el-select
            placeholder="Chọn loại sản phẩm"
            v-model="product.categoryId"
          >
            <el-option
              :label="category.name"
              :value="category.categoryId"
              v-for="(category, index) in categories"
              :key="index"
            />
          </el-select>
        </el-form-item>

        <hr class="line">

        <el-form-item
          class="product-brand"
          label="Nhãn hiệu"
        >
          <el-select
            placeholder="Chọn nhãn hiệu"
            v-model="product.brandId"
          >
            <el-option
              :label="brand.brandName"
              :value="brand.brandId"
              v-for="(brand, index) in brands"
              :key="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="state-tax-container content-wrapper">
      <div class="mt-12px">
        Trạng thái
      </div>
      <div class="checkbox-container">
        <div class="state-title">
          Cho phép bán
        </div>
        <el-checkbox
          size="large"
          v-model="product.isSale"
        />
      </div>
      <div class="mt-12px">
        Thuế
      </div>
      <div class="checkbox-container">
        <div class="tax-title">
          Áp dụng thuế
        </div>
        <el-checkbox size="large" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('product', ['product']),
    ...mapState('category', ['categories']),
    ...mapState('brand', ['brands'])
  }
}
</script>

<style lang="scss" scoped>
.more-info-wrapper {
  margin: 24px 12px;

  .more-info-container {
    padding: 12px;
    .product-category,
    .product-brand {
      margin-top: 24px;
    }

    .line {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .state-tax-container {
    margin-top: 24px;
    padding: 12px;
    .mt-12px {
      margin-top: 12px;
    }
    .checkbox-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
