<template>
  <div class="receive">
    <div class="receive__left">
      <div class="title">
        <el-icon><postcard /></el-icon>
        <span>
          Nhận tiền hoàn lại từ nhà cung cấp
        </span>
      </div>

      <div class="money">
        <div class="label">
          Nhập lại số tiền nhận lại
        </div>
        <el-input-number :controls="false" />
      </div>
    </div>

    <div class="receive__right">
      Số tiền có thể nhận lại: 30.000
    </div>
  </div>
</template>

<script>

import { Postcard } from '@element-plus/icons-vue'
export default {
  components: {
    Postcard
  }

}
</script>

<style lang="scss" scoped>
.receive {
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #fff;

    &__left {
        .title {
            font-weight: bold;
            display: flex;
            align-items: center;
            margin-bottom: 24px;

            span {
                margin-left: 8px;
            }
        }

        .money {
            .label {
                margin-bottom: 8px;
            }

            .el-input-number  {
              width: 100%;
            }
        }
    }

    &__right {
        display: flex;
        align-items: flex-end;
        line-height: 32px;
        justify-content: center;
    }
}
</style>
