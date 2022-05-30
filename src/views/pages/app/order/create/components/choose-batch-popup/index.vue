<template>
  <el-dialog
    title="Chọn lô"
    width="600px"
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
        <el-button @click="closePopup">Thoát</el-button>

      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'
import dialogBody from './dialog-body.vue'
const MODULE_NAME = 'customer'
export default {
  components: { dialogBody },

  setup (props, { emit }) {
    const dialogVisible = ref(false)

    const dialog = ref(null)
    const dialogBody = ref(null)
    const closePopup = () => {
      dialogVisible.value = false
    }

    const onSave = () => {

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
