<template>
  <div class="product">
    <div class="product__head">
      <div class="product__head__left">
        <div class="title">
          Thông tin sản phẩm
        </div>
        <div class="content">
          <text-field
            placeholder="Tìm kiếm khách hàng theo SĐT, tên, mã khách hàng"
            v-model="textSearch"
            :prefix-icon="searchIcon"
          />
        </div>
      </div>
      <div class="product__head__right">
        <div class="title">
          Kiểm tra tồn kho
        </div>
        <div class="content">
          <el-select v-model="manuafacture">
            <el-option
              :label="'Giá bán lẻ'"
              :value="1"
            />
            <el-option
              :label="'Giá bán buôn'"
              :value="2"
            />
          </el-select>
        </div>
      </div>
    </div>
    <div class="product__content">
      <empty-product />
    </div>

    <div
      class="product__footer"
      v-if="false"
    >
      <div class="label">
        Tổng tiền ({{ totalProduct }} sản phẩm)
      </div>

      <div class="content">
        {{ totalPay }}
      </div>
    </div>
  </div>
</template>

<script>
import EmptyProduct from './components/empty-product.vue'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default {
  components: { EmptyProduct },
  setup () {
    const manuafacture = ref(1)
    const searchIcon = ref(Search)
    const totalProduct = ref(0)
    const totalPay = ref('15.000.000')
    return {
      manuafacture,
      totalProduct,
      totalPay,
      searchIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
   background: #fff;
   padding: 24px;
   display: flex;
   flex-direction: column;

   &__head {
     display: flex;
     justify-content: space-between;
     align-items: center;
     gap: 24px;
     margin-bottom: 12px;

     &__left {
       flex: 1;

       .title {
         font-weight: 500;
       }
     }

     &__right {
       .title {
         font-weight: 500;
         margin-bottom: 4px;
       }
     }
   }

   &__content {

   }

   &__footer {
     padding-top: 24px;
     border-top: 1px solid;
     display: flex;
     justify-content: flex-end;
     gap: 40px;
   }
}
</style>
