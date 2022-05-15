<template>
  <div
    class="dialog-body"
    ref="container"
  >
    <base-form
      ref="form"
      class="form"
    >
      <div class="column">
        <text-field
          label="Tên"
          v-model="data.customerName"
          :allow-blank="false"
        />
        <text-field
          label="Số điện thoại"
          v-model="data.customerPhone"
          :allow-blank="false"
        />
        <text-field
          label="Mã chi nhánh"
          v-model="data.customerEmail"
        />
        <text-field
          label="Mã bưu điện"
          v-model="data.customerEmail"
        />
        <el-checkbox label="Chi nhánh mặc định" />
      </div>
      <div class="column">
        <text-field
          label="Địa chỉ 1"
          v-model="data.customerName"
          :allow-blank="false"
        />
        <div class="row">
          <div class="label">
            Tỉnh/ Thành phố <span class="require">*</span>
          </div>
          <el-select>
            <el-option />
          </el-select>
        </div>
        <div class="row">
          <div class="label">
            Tỉnh/ Thành phố <span class="require">*</span>
          </div>
          <el-select>
            <el-option />
          </el-select>
        </div>
        <div class="row">
          <div class="label">
            Tỉnh/ Thành phố <span class="require">*</span>
          </div>
          <el-select>
            <el-option />
          </el-select>
        </div>
        <text-field
          label="Địa chỉ 2"
          v-model="data.customerName"
        />
      </div>
    </base-form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import baseStore from '@/views/pages/base/base-store'
export default {
  setup () {
    const { validate, container } = baseStore()
    const data = reactive({
    })
    return {
      data,
      validate,
      container
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
    .form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 24px;

        .column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          .row {
            .label {
              margin-bottom: 4px;
            }
          }

          .el-checkbox  {
            margin-top: 24px;
          }

          .el-select {
            width: 100%;
          }
        }
    }
}
</style>
