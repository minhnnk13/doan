<template>
  <el-dialog
    title="Đổi mật khẩu"
    width="30%"
    ref="dialog"
    :show-close="false"
    v-model="dialogVisible"
    :before-close="handleClose"
    :append-to-body="true"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <div
      class="container"
      ref="container"
    >
      <dialog-body />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closePopup">Hủy</el-button>
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
import { ref } from 'vue'
import dialogBody from './dialog-body.vue'
import baseStore from '@/views/pages/base/base-store'

export default {
  components: { dialogBody },
  setup () {
    const { container, validate } = baseStore()
    const dialogVisible = ref(false)

    const dialog = ref(null)

    const closePopup = () => {
      dialogVisible.value = false
    }

    const onSave = () => {
      validate()
      // closePopup()
    }

    const openPopup = () => {
      dialogVisible.value = true
    }
    return {
      dialog,
      container,
      closePopup,
      onSave,
      openPopup,
      dialogVisible

    }
  }
}
</script>

<style>

</style>
