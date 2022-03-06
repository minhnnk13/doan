<template>
  <el-menu-item
    :index="item.to"
    class="item"
  >
    {{ item.name }}
  </el-menu-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  &:hover {
    background: $color--gradient;
  }
}
</style>
