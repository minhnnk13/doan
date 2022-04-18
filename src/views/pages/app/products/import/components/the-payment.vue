<template>
  <div class="payment">
    <div class="payment__left">
      <div class="title">
        <el-icon><postcard /></el-icon>
        <span>
          Thanh toán
        </span>
      </div>

      <div class="detail">
        <!-- <div class="paid">
          Đã thanh toán: 0
        </div> -->
        <div class="unpaid">
          Còn phải trả: {{ importProduct.importPrice }}
        </div>
      </div>
    </div>

    <div class="payment__right">
      <el-button>
        Xác nhận thanh toán
      </el-button>
    </div>
  </div>
</template>

<script>

import { Postcard } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  components: {
    Postcard
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
.payment {
    padding: 24px;
    display: flex;
    align-items: center;
    background: #fff;

    &__left {
        flex: 1;
        .title {
            font-weight: bold;
            display: flex;
            align-items: center;
            margin-bottom: 8px;

            span {
                margin-left: 8px;
            }
        }

        .detail {
            display: flex;
            justify-content: space-between;
        }
    }

    &__right {
        width: 200px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
