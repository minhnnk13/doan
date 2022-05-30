<template>
  <div class="product">
    <div class="product__head">
      <div class="product__head__left">
        <div class="title">
          Thông tin sản phẩm
        </div>
        <div class="content">
          <el-autocomplete
            v-model="textSearch"
            :fetch-suggestions="querySearchAsync"
            placeholder="Tìm kiếm theo tên, mã SKU,..."
            @select="handleSelect"
            :prefix-icon="searchIcon"
            :popper-append-to-body="true"
          >
            <template #default="{ item }">
              <div class="product-p">
                <div class="product-p__avatar">
                  <img
                    :src="item.image"
                  >
                </div>
                <div class="product-p__info">
                  <div class="product-p__info__name">
                    {{ item.productName }}
                  </div>

                  <div class="product-p__info__price">
                    {{ price(item) }}
                  </div>
                </div>
              </div>
            </template>
          </el-autocomplete>
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
      <empty-product v-if="!hasProduct" />
      <product-selected
        v-else
        @deleteRow="deleteRow"
        :order="order"
      />
    </div>

    <div
      class="product__footer"
      v-if="hasProduct"
    >
      <div class="label">
        Tổng tiền ({{ totalProduct }} sản phẩm)
      </div>

      <div class="content">
        {{ formatPrice(totalPay) }}
      </div>
    </div>
  </div>
</template>

<script>
import EmptyProduct from './components/empty-product.vue'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { Search } from '@element-plus/icons-vue'
import ProductSelected from './components/product-selected.vue'
import { formatPrice } from '@/common/common-fn.js'
const PRODUCT_MODULE = 'product'
const MODULE_NAME = 'order'
export default {
  components: { EmptyProduct, ProductSelected },
  setup () {
    const store = useStore()
    const manuafacture = ref(1)
    const searchIcon = ref(Search)
    const textSearch = ref('')

    const params = reactive({
      pageIndex: 0,
      pageSize: 10,
      search: ''
    })

    const order = computed(() => store.state[MODULE_NAME].order)
    const products = computed(() => order.value.products)
    const hasProduct = computed(() => products.value?.length)

    const totalProduct = computed(() => products.value.length)

    const totalPay = computed(() => {
      return products.value.reduce((prev, next) => {
        return prev + next.unitPrice * next.saleQuantity
      }, 0)
    })

    const querySearchAsync = (queryString, cb) => {
      params.search = queryString
      store.dispatch(`${PRODUCT_MODULE}/getProducts`, params).then((data) => {
        cb(data)
      })
    }

    const handleSelect = (product) => {
      product.unitPrice =
      manuafacture.value === 1
        ? product.retailPrice
        : product.wholesalePrice
      product.saleQuantity = 1
      products.value.push(product)
    }

    const price = (product) => {
      const value =
      manuafacture.value === 1
        ? product.retailPrice
        : product.wholesalePrice

      return `${formatPrice(value)} VNĐ`
    }

    const deleteRow = (index) => {
      products.value.splice(index, 1)
    }

    return {
      products,
      params,
      hasProduct,
      manuafacture,
      totalProduct,
      totalPay,
      searchIcon,
      querySearchAsync,
      handleSelect,
      price,
      textSearch,
      deleteRow,
      formatPrice,
      order
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
         margin-bottom: 4px;
       }

       .content {
         :deep(.el-autocomplete) {
           width: 100%;
         }
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

.product-p {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #ccc;
  padding: 4px 0;

  &__avatar {
    height: 42px;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    flex: 1;

    &__name,
    &__price {
      line-height: 24px;
    }

    &__price {
      font-weight: 500;
    }
  }
}
</style>
