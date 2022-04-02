<template>
  <div
    class="result-manufacture"
  >
    <div class="top">
      <div class="name">
        <el-icon><avatar /></el-icon>
        {{ supplier.supplierName }}
      </div>

      <div class="debt">
        Công nợ hiện tại <span class="title">0</span>
      </div>
    </div>

    <div class="bot">
      <div class="bot-left bot-element">
        <div class="title">
          Địa chỉ xuất hàng
        </div>
        <div>
          Giao hàng
        </div>

        <div>
          Số điện thoại:  {{ supplier.phone }}
        </div>
        <div>
          Địa chỉ:  {{ supplier.address }}
        </div>
        <div>
          Email:  {{ supplier.email }}
        </div>
      </div>

      <div class="bot-right bot-element">
        <div class="title">
          Địa chỉ xuất hàng
        </div>
        <div>
          Giao hàng
        </div>

        <div>
          Số điện thoại: {{ supplier.phone }}
        </div>
        <div>
          Địa chỉ: {{ supplier.address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar, Close } from '@element-plus/icons-vue'
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Avatar
  },

  setup () {
    const store = useStore()

    const supplier = computed(() => { return store.state.supplier.importSupplier })

    return { supplier }
  }
}
</script>

<style lang="scss" scoped>
.result-manufacture {
    .title {
        font-weight: bold;
    }

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid;
        margin: 0 -24px;
        padding: 0 24px;
        padding-bottom: 16px;

        .name {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #08f;

            span {
            color: #000;
            }
        }
    }

    .bot {
        margin-top: 16px;
        display: grid;
        grid-template-columns: 1fr 1fr;

        .bot-element {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
}
</style>
