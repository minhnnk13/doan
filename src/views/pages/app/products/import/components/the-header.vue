<template>
  <div class="header">
    <div class="header__top">
      <slot name="toolbar" />
    </div>
    <div class="header__bottom">
      <div class="header__bottom__left">
        <div class="back-page">
          <router-link :to="{name: 'ListGoods'}">
            {{ textPage }}
          </router-link>
        </div>
        <div class="page-name">
          <slot name="title" />
        </div>
      </div>
      <div
        class="header__bottom__right"
        v-if="isShowSteps"
      >
        <el-steps
          :space="100"
          :active="1"
          align-center
        >
          <el-step
            title="Đặt hàng"
            status="success"
          />
          <el-step
            title="Duyệt"
            status="wait"
          />
          <el-step
            title="Nhập kho"
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

  setup () {
    const textPage = ref('< Đơn nhập hàng')
    return {
      textPage
    }
  }
}
</script>

<style lang="scss" scoped>
.header {

    margin-bottom: 24px;

    &__top {
        height: 48px;
        background: #fff;
        margin: 0 -24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 24px;
        @include box-shadow();
    }

    &__bottom {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        height: 60px;

        &__left {
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .back-page {
                a {
                    color: #637381;
                }
            }

            .page-name {
                font-size: 28px;
                font-weight: bold;
            }
        }

        &__right {
            width: 400px;
        }
    }
}
</style>
