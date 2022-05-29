<template>
  <div class="header">
    <div class="header__left">
      <div class="back-page">
        <router-link :to="{ name: 'ListManufacture' }">
          {{ backPageText }}
        </router-link>
      </div>
      <div class="page-name">
        {{ supplier.supplierName }}
      </div>
    </div>

    <!-- <div class="header__right">
      <el-button type="primary">
        Tạo phiếu thu chi
      </el-button>
    </div> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup (props, { emit }) {
    const backPageText = ref('< Danh sách nhà cung cấp')

    const store = useStore()
    const supplier = computed(() => {
      return store.state.supplier.supplier
    })

    store.dispatch('user/getUsers')

    return {
      supplier,
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
