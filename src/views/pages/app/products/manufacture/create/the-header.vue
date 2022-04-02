<template>
  <div class="header">
    <div class="header__nav">
      <router-link
        :to="{name: 'ListManufacture'}"
      >
        <el-button>Hủy</el-button>
      </router-link>
      <router-link
        :to="{
          name: 'DetailManufacture',
          params: {
            id: '22'
          }}"
      >
        <el-button type="primary">
          Lưu
        </el-button>
      </router-link>
    </div>

    <div class="header__title">
      <router-link :to="{name: 'ListManufacture'}">
        {{ backLinkText }}
      </router-link>

      <div class="title">
        Thêm mới nhà cung cấp
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const backLinkText = ref('< Danh sách nhà cung cấp')
    return {
      backLinkText
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    &__nav {
        background: #fff;
        padding: 4px 40px;
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin: 0 -24px;

    }

    &__title {
        padding: 24px 0;
        a {
            color: #657583;
        }
        .title {
            margin-top: 12px;
            font-weight: bold;
            font-size: 28px;
        }
    }
}
</style>
