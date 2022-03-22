<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    @change="handlePickFile"
  >
    <template #default>
      <el-icon :src="iconPlus">
        <Plus />
      </el-icon>
    </template>
    <template #file="{ file }">
      <div>
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">

          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon :size="20"><delete-icon /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img
      width="100%"
      :src="dialogImageUrl"
      alt=""
    >
  </el-dialog>
</template>
<script>
import { ref, computed } from 'vue'
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'

import { useStore } from 'vuex'

export default {
  setup () {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const plusIcon = ref(Plus)
    const deleteIcon = ref(Delete)
    const store = useStore()

    const product = computed(() => store.state.product.product)

    const handleRemove = (file) => {
      console.log(file)
    }
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url
      dialogVisible.value = true
      console.log(file)
    }

    const handlePickFile = (file) => {
      product.value.image = file
    }

    return {
      dialogImageUrl,
      dialogVisible,
      disabled,
      handleRemove,
      handlePictureCardPreview,
      plusIcon,
      deleteIcon,
      handlePickFile
    }
  }
}
</script>
