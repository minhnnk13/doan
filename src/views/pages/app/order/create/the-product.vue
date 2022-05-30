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
          </el-select>
        </div>
      </div>
    </div>
    <div class="product__content">
      <empty-product />
    </div>

    <div class="product__footer">
      dsa
    </div>
  </div>
</template>

<script>
import EmptyProduct from './components/empty-product.vue'
import { ref } from 'vue'
export default {
  components: { EmptyProduct },
  setup () {
    const manuafacture = ref(1)
    return {
      manuafacture
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
     }

     &__right {
       .title {
         margin-bottom: 4px;
       }
     }
   }
}
</style>
