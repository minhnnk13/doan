<template>
  <div class="warehouse">
    <div class="head">
      <el-icon><van /></el-icon>
      <span>
        Nhập kho
      </span>
    </div>

    <div class="container">
      <div class="container__left">
        <div class="status">
          {{ importProduct.importId }}

          <el-tag
            effect="dark"
          >
            Đã nhập kho
          </el-tag>
        </div>

        <div
          class="
            code
            element"
        >
          <div class="title">
            Mã phiếu nhập kho
          </div>
          <div class="content">
            {{ importProduct.importId }}
          </div>
        </div>

        <div class="date element">
          <div class="title">
            Ngày nhập kho
          </div>
          <div class="content">
            {{ importProduct.createdDate }}
          </div>
        </div>

        <div

          class="product element"
        >
          <div class="title">
            Sản phẩm
          </div>
          <div
            v-for="(product, index) in importProduct.productsToImport"
            :key="index"
            class="content"
          >
            {{ `${product.quantity} x ${product.productName}` }}
          </div>
        </div>
      </div>

      <div class="container__right element">
        <div class="element">
          <div class="title">
            Tổng tiền
          </div>
          <div class="content">
            {{ importProduct.importPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Van } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Van
  },
  setup () {
    const store = useStore()
    const importProduct = computed(() => {
      return store.state.import.import
    })

    return {
      importProduct
    }
  }

}
</script>

<style lang="scss" scoped>
.warehouse {
    padding: 24px;
    background: #fff;
    .head {
        font-weight: bold;
        margin: 0 -24px;
        padding: 0 -24px;
        padding-bottom: 24px;
        border-bottom: 1px solid;
        padding-left: 24px;
        display: flex;
        align-items: center;

        span {
            margin-left: 8px;
        }
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 24px;

        .title {
            color: #637382;
            margin-bottom: 8px;
        }
        &__left {
            display: flex;
            flex-direction: column;
            gap: 24px;

            .status {
                .el-tag {
                    margin-left: 16px;
                }
            }
        }

        &__right {
            display: flex;
            align-items: center;
        }
    }
}
</style>
