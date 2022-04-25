<template>
  <div class="header">
    <div class="header__nav">
      <router-link :to="{ name: 'ListManufacture' }">
        <el-button>Hủy</el-button>
      </router-link>

      <el-button
        type="primary"
        @click="handleSaveClick"
      >
        Lưu
      </el-button>
    </div>

    <div class="header__title">
      <router-link :to="{ name: 'ListManufacture' }">
        {{ backLinkText }}
      </router-link>

      <div class="title">
        Thêm mới nhà cung cấp
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import messageBox from '@/utils/message-box'

export default {
  setup () {
    const backLinkText = ref('< Danh sách nhà cung cấp')
    const store = useStore()
    const router = useRouter()

    const supplier = computed(() => {
      return store.state.supplier.supplier
    })
    const handleSaveClick = () => {
      messageBox.showConfirm(
        'Bạn có đồng ý lưu nhà cung cấp này?',
        () => {
          store.dispatch('supplier/addSupplier', supplier.value).then((res) => {
            if (res.status === 200) {
              ElMessage({
                type: 'success',
                message: 'Lưu thành công'
              })
              router.push({ name: 'DetailManufacture', params: { id: res.data } })
            }
          })
        },
        {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Thoát'
        }
      )
    }

    return {
      backLinkText,
      handleSaveClick
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
