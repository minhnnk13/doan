import { App } from 'vue'

export default {
  install: (app) => {
    app.mixin({
      mounted () {
        if (this.$el) {
          this.$el.__vue__ = this
        }
      },

      beforeUnmount () {
        if (this.$el) {
          this.$el.__vue__ = null
        }
      }
    })
  }
}
