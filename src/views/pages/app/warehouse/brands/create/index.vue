<template>
  <el-dialog
    title="Thêm Chi nhánh"
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
import { useStore } from 'vuex'
import dialogBody from './dialog-body.vue'
import commonFn from '@/common/common-fn'
const MODULE_NAME = 'brand'
export default {
  components: { dialogBody },

  emits: ['added'],

  setup (props, { emit }) {
    const store = useStore()
    const dialogVisible = ref(false)

    const dialog = ref(null)
    const dialogBody = ref(null)
    const closePopup = () => {
      dialogVisible.value = false
    }

    const onSave = async () => {
      const container = document.querySelector('.content')
      if (dialogBody.value.validate()) {
        commonFn.showMask(container)

        const brand = await store.dispatch(`${MODULE_NAME}/addBrand`, dialogBody.value.data)
        commonFn.hideMask()
        emit('added', brand)
        closePopup()
      }
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
