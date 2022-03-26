<template>
  <el-upload
    action="#"
    :show-file-list="false"
    :auto-upload="false"
    @change="handlePickFile"
    class="avatar-uploader"
  >
    <!-- <el-icon :src="iconPlus">
      <Plus />
    </el-icon> -->

    <img
      class="el-upload-thumbnail"
      v-if="productImage"
      :src="imgUrl"
      alt=""
    >
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
import { ref, computed, useAttrs } from 'vue'
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'

import { useStore } from 'vuex'
export default {
  props: {},
  setup () {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const plusIcon = ref(Plus)
    const deleteIcon = ref(Delete)
    const store = useStore()

    const product = computed(() => store.state.product.product)
    const productImage = computed(() => product.value.image)
    const imgUrl = computed(() => {
      return productImage.value.url
        ? productImage.value.url
        : productImage.value
    })
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
      product.value.image.url = URL.createObjectURL(file.raw)
    }

    return {
      dialogImageUrl,
      dialogVisible,
      disabled,
      handleRemove,
      handlePictureCardPreview,
      plusIcon,
      deleteIcon,
      handlePickFile,
      product,
      productImage,
      imgUrl
    }
  }
}
</script>

<style lang ="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    object-fit: cover;
    height: 200px;
    width: 200px;

    .el-upload-thumbnail {
      height: 100%;
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
