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
    <dialog-body ref="dialogBody" />
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
export default {
  components: { dialogBody },
  setup () {
    const dialogVisible = ref(false)

    const dialog = ref(null)
    const dialogBody = ref(null)
    const closePopup = () => {
      dialogVisible.value = false
    }

    const onSave = () => {
      closePopup()
    }

    const openPopup = () => {
      dialogVisible.value = true
    }
    return {
      dialog,

      closePopup,
      onSave,
      openPopup,
      dialogVisible,
      dialogBody

    }
  }
}
</script>

<style>

</style>
