<template>
  <div class="personal">
    <div class="personal__header">
      <div class="personal__header__title">
        Thông tin cá nhân
      </div>

      <div class="personal__header__status">
        <el-tag>
          Đang giao dịch
        </el-tag>
      </div>

      <div class="personal__header__toolbar">
        <el-popover
          placement="bottom-end"
          :width="200"
          trigger="click"
          popper-class="manufacture-detail-popover"
        >
          <template #reference>
            <el-button type="text">
              Thao tác khác <el-icon><caret-bottom /></el-icon>
            </el-button>
          </template>

          <div class="options">
            <div class="option">
              <el-button type="text">
                Câp nhật thông tin
              </el-button>
            </div>

            <div class="option">
              <el-button type="text">
                Xóa nhà cung cấp
              </el-button>
            </div>
          </div>
        </el-popover>
      </div>
    </div>

    <div class="personal__content">
      <div
        class="element"
        v-for="(element, index) in data"
        :key="index"
      >
        <div class="element__label">
          {{ element.label }}
        </div>

        <div class="element__value">
          :
          <span v-if="element.value !== null || element.value !== undefined || element.value !== ''">{{ element.value }}</span>
          <span v-else>...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// to-do: case hiển thị trạng thái của nhà cung cấp
// gán dữ liệu cho các field cần thiết
// ghép api xóa
// thêm màn sửa - cần cf lại
import { CaretBottom } from '@element-plus/icons-vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
  components: {
    CaretBottom
  },

  setup () {
    const store = useStore()
    const route = useRoute()

    const supplier = computed(() => {
      return store.state.supplier.supplier
    })

    store.dispatch('supplier/getSupplierByID', route.params.id)

    const data = computed(() => {
      return [
        {
          label: 'Mã',
          value: supplier.value.supplierCode
        },
        {
          label: 'Mô tả',
          value: supplier.value.description
        },
        {
          label: 'Người phụ trách',
          value: supplier.value.user
        },
        {
          label: 'Số điện thoại',
          value: supplier.value.phone
        },
        {
          label: 'Email',
          value: supplier.value.email
        },
        {
          label: 'Nợ hiện tại',
          value: supplier.value.dept
        },
        {
          label: 'Mã số thuê',
          value: supplier.value.taxIdentificationNumber
        },
        {
          label: 'Địa chỉ',
          value: supplier.value.address
        }

      ]
    })
    return {
      data
    }
  }
}
</script>

<style lang="scss" scoped>
.personal {
  background: #fff;

  &__header {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid;

    &__title {
      font-weight: bold;
    }

    &__toolbar {

      .el-button {
        color: $color--primary;
      }
    }

  }

  &__content {
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;

    .element {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>

<style lang="scss">
.manufacture-detail-popover {
  padding: 4px 0 !important;

  .options {
    .option {
      padding: 4px 24px;

      &:first-child {
        border-bottom: 1px solid;
      }

      &:hover {
        background: #08f;
        .el-button {
          color: #fff;
        }
      }

      .el-button {
        color: $color--primary;

      }
    }
  }

}
</style>
