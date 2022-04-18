<template>
  <div class="header">
    <div class="header__bottom">
      <div class="header__bottom__left">
        <div class="back-page">
          <div class="create-header">
            <div
              class="back-container"
              @click="$emit('onBackClick')"
            >
              {{
                // eslint-disable-next-line vue/no-parsing-error
                `< Phiếu kiểm hàng`
              }}
            </div>
            <div class="process-container" />
          </div>
        </div>
        <div class="page-name">
          <slot name="title" />
        </div>
      </div>
      <div class="header__bottom__right">
        <el-steps
          :space="248"
          :active="1"
          align-center
        >
          <el-step
            title="Lên danh sách kiểm"
            status="success"
          />
          <el-step
            title="Kiểm hàng"
            status="wait"
          />
          <el-step
            title="Thống kê"
            status="wait"
          />
          <el-step
            title="Hoàn thành"
            status="wait"
          />
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  props: {
    title: {
      type: String,
      default: null
    },

    isShowSteps: {
      type: Boolean,
      default: true
    }
  },

  emits: ['onBackClick'],

  setup () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 24px;

  &__bottom {
    display: flex;
    justify-content: space-between;
    height: 60px;

    &__left {
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .back-page {
        .back-container {
          cursor: pointer;
          margin-bottom: 12px;
          color: #637381;

          &:hover {
            color: #409eff;
          }
        }
      }

      .page-name {
        font-size: 28px;
        font-weight: bold;
      }
    }

    &__right {
      width: 580px;
    }
  }
}
</style>
