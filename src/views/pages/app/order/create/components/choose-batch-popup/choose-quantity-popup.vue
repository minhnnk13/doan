<template>
  <el-dialog
    title="Nhập số lượng"
    width="600px"
    ref="dialog"
    :show-close="false"
    v-model="dialogVisible"
    :append-to-body="true"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <text-field
      v-model="batch.saleQuantity"
      :is-number="true"
      :allow-blank="false"
      :show-require="false"
      label="Số lượng"
      ref="input"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closePopup">Đóng</el-button>
        <el-button
          type="primary"
          @click="onSave"
        >
          Lưu
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

const MODULE_NAME = 'order'

export default {
  emits: ['onSaved'],

  setup (props, { emit }) {
    const store = useStore()
    const batch = computed(() => store.state[MODULE_NAME].batch)
    const input = ref(null)
    const dialogVisible = ref(false)

    const dialog = ref(null)
    const closePopup = () => {
      dialogVisible.value = false
    }

    const openPopup = () => {
      dialogVisible.value = true
    }

    const onSave = () => {
      if (!input.value.hasError) {
        closePopup()
        const data = { ...batch.value }
        emit('onSaved', data)
      }
    }

    return {
      dialog,
      closePopup,
      dialogVisible,
      input,
      openPopup,
      onSave,
      batch
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
