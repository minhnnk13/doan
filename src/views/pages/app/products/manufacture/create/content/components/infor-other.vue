<template>
  <div class="other">
    <div class="other__title">
      Thông tin khác
    </div>

    <div class="other__imployees">
      <div class="label">
        Nhân viên phụ trách
      </div>
      <el-select v-model="supplier.userId">
        <el-option
          v-for="(user, index) in users"
          :key="index"
          :value="user.id"
          :label="user.name"
        />
      </el-select>
    </div>

    <div class="other__description">
      <div class="label">
        Mô tả
      </div>
      <text-field
        type="textarea"
        v-model="supplier.description"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {

  setup (props, { emit }) {
    const store = useStore()
    const supplier = computed(() => {
      return store.state.supplier.supplier
    })

    store.dispatch('user/getUsers')
    const users = computed(() => {
      return store.state.user.users
    })
    return {
      supplier,
      users
    }
  }
}
</script>

<style lang="scss" scoped>
.other {
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
  padding: 24px;
  gap: 24px;

.label {
    margin-bottom: 4px;
  }
  :deep(.el-select) {
    width: 100%;
  }

  &__title {
      font-weight: bold;
  }

}
</style>
