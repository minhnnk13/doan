<template>
  <div class="app">
    <app-navigation />

    <div id="content-header">
      <app-header v-if="!$route.meta.excludeHeader" />
      <div
        class="content"
        :class="{ 'height-full': $route.meta.excludeHeader }"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavigation from '@/views/app-navigation'
import AppHeader from '@/views/app-header'
export default {
  components: {
    AppNavigation,
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100vw;
  display: flex;

  #content-header {
    flex: 1;

    .content {
      background: $color--bg-primary;
      padding: 24px 24px;
      width: 100%;
      height: calc(100% - 56px);
      overflow: auto;

      &.height-full {
        height: 100%;
        padding-top: 0;
      }
    }
  }
}
</style>
