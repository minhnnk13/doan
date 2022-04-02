<template>
  <div class="right">
    <div class="title">
      Thông tin đơn hàng
    </div>

    <div class="col">
      <div class="label">
        Mã đơn hàng
      </div>
      <text-field />
    </div>

    <div class="col">
      <div class="title-label">
        Chi nhánh
      </div>
      <div class="label">
        Chi nhánh mặc định
      </div>
    </div>
    <div class="col">
      <div class="title-label">
        Bảng giá
      </div>
      <div class="label">
        Giá nhập
      </div>
    </div>
    <div class="col">
      <div class="title-label">
        Thuế
      </div>
      <el-checkbox
        v-model="importProducts.isTaxed"
        @change="store.commit('import/reCalculateAllPrice')"
      >
        Giá bao gồm thuế
      </el-checkbox>
    </div>
  </div>
</template>

<script>
import { Avatar, Close } from '@element-plus/icons-vue'
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const importCode = (length = 7) => {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    }

    const importProducts = computed(() => {
      return store.state.import.import
    })

    return {
      importProducts,
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.right {
  width: 310px;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .title {
    font-weight: bold;
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .label {
    font-size: 14px;
  }
}
</style>
