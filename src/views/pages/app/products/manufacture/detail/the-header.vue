<template>
  <div class="header">
    <div class="header__left">
      <div class="back-page">
        <router-link :to="{name: 'ListManufacture'}">
          {{ backPageText }}
        </router-link>
      </div>
      <div class="page-name">
        Nhà cung cấp abcd
      </div>
    </div>

    <div class="header__right">
      <el-button type="primary">
        Tạo phiếu thu chi
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const backPageText = ref('< Danh sách nhà cung cấp')

    return {
      backPageText
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;

    &__left {
        .back-page {
            a {
                color: #657583;
            }
        }

        .page-name {
            font-weight: bold;
            font-size: 28px;
            margin-top: 8px;
        }
    }
}
</style>
