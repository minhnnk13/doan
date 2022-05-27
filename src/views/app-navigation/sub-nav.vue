<template>
  <el-sub-menu
    class="item"
    :index="subNav.to"
    v-if="subNav.subs?.length"
  >
    <template #title>
      <el-icon>
        <img :src="subNav.icon">
      </el-icon>
      <span>{{ subNav.name }}</span>
    </template>

    <slot />
  </el-sub-menu>

  <el-menu-item
    class="item"
    v-else
    :index="subNav.to"
  >
    <el-icon>
      <img :src="subNav.icon">
    </el-icon>
    <span>{{ subNav.name }}</span>
  </el-menu-item>
</template>

<script>

export default {
  props: {
    subNav: {
      type: Object,
      default: () => {}
    }
  },

  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.el-sub-menu {

  :deep(.el-sub-menu__title) {
    &:hover {
      background: $color--gradient;
    }
  }
}
.item {
  margin: 16px 0 ;

  &:hover {
    background: $color--gradient;
  }

  .el-icon {
    width: 40px;
    height: 40px;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  :deep(.el-sub-menu__icon-arrow) {
    color: #298ee6;
    font-size: 20px;
  }
}
</style>
