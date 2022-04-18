<template>
  <div class="header">
    <div class="view-products">
      <router-link
        :to="{name: 'CreateGoods'}"
      >
        <el-button type="primary">
          Tạo đơn nhập hàng
        </el-button>
      </router-link>
    </div>

    <div class="title">
      Tất cả đơn nhập hàng
    </div>
    <div class="search">
      <text-field
        v-model="productSearchValue"
        class="w-50 m-2"
        size="large"
        placeholder="Tìm kiếm theo mã đơn nhập hàng, nhà cung cấp"
        :prefix-icon="searchIcon"
      />
    </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { computed, ref, toRefs } from 'vue'
export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: String,
      default: null
    }
  },
  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const searchIcon = ref(Search)
    const productSearchValue = computed({
      get: () => modelValue,
      set: (value) => {
        emit('update:modelValue', value)
      }
    })
    return {
      searchIcon,
      productSearchValue
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .view-products {
    position: absolute;
    top: -56px;
    right: 0;
    z-index: 9;
  }

  .title {
    height: 40px;
    position: relative;
    text-transform: uppercase;
    color: $color--green;
    font-weight: 700 ;
    padding-left: 12px;
    line-height: 40px;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 250px;
      background: $color--green;
    }
  }

  .search {
    margin: 12px;
    width: 400px;
  }

}
</style>
