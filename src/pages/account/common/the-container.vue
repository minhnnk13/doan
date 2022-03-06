<template>
  <div class="container">
    <img
      :src="bgImage"
      alt=""
    >
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    const bgImage = require('@/assets/images/account/background.png')
    return {
      bgImage
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    .slot {
        z-index: 99;
        position: relative;
        color: $color--primary;
        background: #fff;
        border-radius: 10px;
        padding: 24px;
    }

}
</style>
