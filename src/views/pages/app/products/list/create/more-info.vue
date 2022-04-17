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
              :label="category.categoryName"
              :value="category.categoryId"
              v-for="(category, index) in categories"
              :key="index"
            />
          </el-select>
          <el-icon class="icon-container">
            <plus @click="handleShowAddCategoryClick" />
          </el-icon>
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
          <el-icon class="icon-container">
            <plus @click="handleShowAddBrandClick" />
          </el-icon>
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
    </div>
    <add-info-popup
      :info-add="infoAdd"
      ref="addInfoDialog"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Plus } from '@element-plus/icons-vue'
import AddInfoPopup from '@/views/pages/app/products/list/create/add-info-popup.vue'
import { reactive, ref } from 'vue'

export default {
  components: {
    Plus,
    AddInfoPopup
  },

  setup () {
    const addInfoDialog = ref(null)
    const infoAdd = ref(0)
    const handleShowAddInfoClick = () => {
      addInfoDialog.value.handleOpenPopupClick()
    }

    const handleShowAddBrandClick = () => {
      infoAdd.value = 1
      handleShowAddInfoClick()
    }

    const handleShowAddCategoryClick = () => {
      infoAdd.value = 2
      handleShowAddInfoClick()
    }

    return {
      addInfoDialog,
      handleShowAddInfoClick,
      infoAdd,
      handleShowAddBrandClick,
      handleShowAddCategoryClick
    }
  },

  computed: {
    ...mapState('product', ['product']),
    ...mapState('category', ['categories']),
    ...mapState('brand', ['brands'])
  },
  methods: {
    ...mapActions('category', ['getCategories']),
    ...mapActions('brand', ['getBrands'])
  },
  mounted () {
    this.getBrands()
    this.getCategories()
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

    .icon-container {
      margin-left: 12px;
      cursor: pointer;
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
