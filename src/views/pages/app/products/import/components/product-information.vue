<template>
  <div class="product-infor">
    <div class="product-infor__top">
      <div class="product-infor__top__left">
        <div class="infor">
          Thông tin đơn nhập
        </div>
        <div class="branch">
          <el-icon><van /></el-icon>
          <span>Chi nhánh mặc định</span>
        </div>
      </div>

      <div class="product-infor__top__right">
        <el-tag
          effect="dark"
          :type="importProductTag.type"
        >
          {{ importProductTag.title }}
        </el-tag>
      </div>
    </div>
  </div>

  <div class="product-infor__bottom">
    <div class="title">
      Bảng giá
    </div>
    <div class="result">
      : Giá nhập
    </div>

    <div class="title">
      Thuế
    </div>
    <div class="result">
      : Giá bao gồm 10% thuế
    </div>
  </div>
</template>

<script>
import { Van } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import enumeration from '@/common/enumeration.js'

export default {
  components: {
    Van
  },

  setup () {
    const store = useStore()
    const importProducts = computed(() => {
      return store.state.import.import
    })
    const importProductTag = computed(() => {
      if (importProducts.value.statusImport === enumeration.status.Finished) {
        return { type: 'success', title: 'Hoàn thành' }
      }

      if (importProducts.value.statusPayment === enumeration.status.Trading) {
        return { type: 'warning', title: 'Đang giao dịch' }
      }

      return { type: '', title: 'Đặt hàng' }

      // case enumeration.status.Cancel:

      //   return { type: 'danger', title: 'Đã hủy' }
    })

    return { importProductTag }
  }
}
</script>

<style lang="scss" scoped>
.product-infor {
  &__top {
    margin: 0 -24px;
    padding: 0 24px;
    padding-bottom: 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid;

    &__left {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;

      .branch {
        font-size: 14px;
        display: flex;
        align-items: center;
        .el-icon {
          font-size: 16px;
        }
        span {
          margin-left: 10px;
        }
      }
    }

    &__right {
      width: 100px;
    }
  }

  &__bottom {
    display: grid;
    grid-template-columns: 1fr 2fr;
    row-gap: 20px;
  }
}
</style>
