<template>
  <div class="header">
    <div class="title">
      Tất cả nhà cung cấp
    </div>
    <div class="search">
      <text-field
        v-model="productSearchValue"
        class="w-50 m-2"
        size="large"
        placeholder="Tìm kiếm theo mã nhà cung cấp, tên nhà cung cấp, SĐT"
        :prefix-icon="searchIcon"
        @keyup="handleSearchInput"
      />
    </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { computed, ref, toRefs } from 'vue'
import debounce from 'lodash'

export default {
  emits: ['update:modelValue', 'keyup'],

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

    const handleSearchInput = debounce(() => {
      emit('keyup')
    }, 5000)

    return {
      searchIcon,
      productSearchValue,
      handleSearchInput
    }
  }
}
</script>

<style lang="scss" scoped>
.header {

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
