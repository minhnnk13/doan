<template>
  <div class="profile">
    <div class="profile__left">
      <div class="page-name">
        Thông tin tài khoản
      </div>

      <!-- <el-button type="text">
        <div class="icon">
          <img :src="logoutIcon">
        </div>
        Đăng xuất
      </el-button> -->
    </div>
    <div class="profile__right">
      <div class="form">
        <text-field
          label="Họ và tên"
          v-model="account.Username"
          :disabled="!changeMode"
        />
        <text-field
          label="Số điện thọai"
          v-model="account.Phone"
          :disabled="!changeMode"
        />

        <text-field
          label="Email"
          v-model="account.Email"
          :disabled="!changeMode"
        />
        <div class="birthday">
          <label>Ngày sinh</label>
          <el-date-picker
            v-model="account.DOB"
            type="date"
            format="DD/MM/YYYY"
            value-format="DD/MM/YYYY"
            :disabled="!changeMode"
          />
        </div>

        <text-field
          label="Địa chỉ"
          v-model="account.Address"
          :disabled="!changeMode"
        />
      </div>

      <div class="toolbar">
        <div
          class="view-profile"
          v-if="!changeMode"
        >
          <el-button
            class="chang-pass"
            type="text"
            @click="onShowChangePassForm "
          >
            Đổi mật khẩu
          </el-button>

          <el-button
            @click="onEdit"
            type="primary"
          >
            Sửa
          </el-button>
        </div>

        <div
          class="change-profile"
          v-if="changeMode"
        >
          <el-button
            @click="onCancel"
          >
            Hủy
          </el-button>
          <el-button
            @click="onSave"
            type="primary"
          >
            Lưu
          </el-button>
        </div>
      </div>
    </div>

    <change-password-popup ref="changePassDialog" />
  </div>
</template>

<script>
import { ref } from 'vue'
import changePasswordPopup from './change-password-popup.vue'
export default {
  components: { changePasswordPopup },
  setup () {
    const changePassDialog = ref(null)
    const defaultAccount = {
      Username: 'account',
      Phone: '1234567890',
      Email: 'abcdf@gmail.com',
      DOB: '06/03/1999',
      Address: 'Ha Noi'

    }
    const account = ref(
      { ...defaultAccount }
    )
    const changeMode = ref(false)

    const onEdit = () => {
      changeMode.value = true
    }

    const onCancel = () => {
      changeMode.value = false
      account.value = { ...defaultAccount }
    }

    const onShowChangePassForm = () => {
      changePassDialog.value.openPopup()
    }

    return {
      changePassDialog,
      account,
      changeMode,
      onEdit,
      onCancel,
      onShowChangePassForm
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
    background-color: #fff;
    padding: 24px;
    display: flex;
    &__left {
        width: 200px;
        text-align: center;
        font-weight: 700;
    }

    &__right {
        flex: 1;
        width: 100%;
        border: $border--base;
        padding: 24px;

        .form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;

            .birthday {
                display: flex;
                flex-direction: column;
                gap: 4px;

                :deep(.el-input) {
                    width: 100% !important;
                }
            }
        }

        .toolbar {
            margin-top: 40px;
            .view-profile {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .chang-pass {
                    color: #0B4EB2 !important;
                }
            }

            .change-profile {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>
