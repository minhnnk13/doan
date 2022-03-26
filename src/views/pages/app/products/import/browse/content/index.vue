<template>
  <div class="content">
    <content-left />
    <content-right />
  </div>
</template>

<script>
import ContentLeft from './content-left.vue'
import ContentRight from './content-right.vue'
export default {
  components: {
    ContentLeft,
    ContentRight
  }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    gap: 24px;
}
</style>
