<template>
  <el-dialog
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :append-to-body="true"
    :show-close="false"
    v-model="dialogVisible"
    :title="`Thêm ${infoAddComputed}`"
    width="30%"
    ref="dialog"
  >
    <el-input
      :placeholder="`Thêm ${infoAddComputed} bạn muốn`"
      v-model="infoInput.name"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClosePopupClick">Hủy</el-button>
        <el-button
          type="primary"
          @click="handleSaveClick"
        > Lưu </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, computed, reactive, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  props: {
    infoAdd: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const dialogVisible = ref(false)
    const store = useStore()
    const infoInput = reactive({
      name: ''
    })
    const handleClosePopupClick = () => {
      infoInput[`${info.toLowerCase()}Name`] = ''
      infoInput.name = ''
      dialogVisible.value = false
    }

    const handleOpenPopupClick = () => {
      dialogVisible.value = true
    }

    let info = ''

    const infoAddComputed = computed(() => {
      switch (props.infoAdd) {
        default:
          info = 'Brand'
          return 'nhãn hiệu sản phẩm'
        case 2:
          info = 'Category'
          return 'phân loại sản phẩm'
        case 3:
          info = 'Unit'
          return 'đơn vị sản phẩm'
      }
    })

    const handleSaveClick = () => {
      infoInput[`${info.toLowerCase()}Name`] = infoInput.name
      store.dispatch(`${info.toLowerCase()}/add${info}`, infoInput).then((res) => {
        if (res) {
          ElMessage({
            type: 'success',
            message: 'Lưu thành công'
          })
        }
      })

      handleClosePopupClick()
    }

    return {
      handleSaveClick,
      handleOpenPopupClick,
      handleClosePopupClick,
      dialogVisible,
      infoAddComputed,
      infoInput
    }
  }
}
</script>

<style lang="scss" scoped>
.add-info-title {
  font-weight: 700;
}
</style>
