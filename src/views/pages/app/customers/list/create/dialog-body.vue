<template>
  <div
    class="dialog-body"
    ref="container"
  >
    <base-form
      ref="form"
      class="form"
      :auto-focus="false"
    >
      <text-field
        label="Tên khách hàng"
        v-model="data.customerName"
        :allow-blank="false"
      />
      <text-field
        label="Số điện thoại"
        v-model="data.customerPhone"
        :allow-blank="false"
        :is-phone="data.customerPhone"
      />
      <text-field
        label="Email"
        v-model="data.customerEmail"
        :allow-blank="false"
        :is-email="true"
      />

      <div class="address">
        <div class="label">
          Địa chỉ
        </div>
        <el-input
          label="Địa chỉ"
          v-model="data.customerAddress"
          type="textarea"
          :autosize="{minRows: 1}"
        />
      </div>

      <text-field
        label="Mã số thuế"
        v-model="data.taxIdentificationNumber"
      />

      <div class="gender ">
        <el-radio-group v-model="data.gender">
          <el-radio :label="$enumeration.Gender.Male">
            Nam
          </el-radio>
          <el-radio :label="$enumeration.Gender.Female">
            Nữ
          </el-radio>
          <el-radio :label="$enumeration.Gender.Other">
            Khác
          </el-radio>
        </el-radio-group>
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
      customerName: null,
      customerAddress: null,
      customerPhone: null,
      customerEmail: null,
      shipAddress: null,
      debt: 0,
      gender: '2',
      taxIdentificationNumber: null
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

        .address {
          .label {
            margin-bottom: 4px;
          }
        }

        .gender {
          display: flex;
          align-items: flex-end;
        }
    }
}
</style>
