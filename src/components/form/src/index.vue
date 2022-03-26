<template>
  <form
    class="base-form"
    ref="form"
    @submit.prevent="$emit('submit')"
  >
    <slot />
  </form>
</template>

<script>
import useContainer from './useContainer'
// import { toRefs } from 'vue'
export default {
  name: 'BaseForm',

  emits: ['submit'],

  props: {
    autoFocus: {
      type: Boolean,
      default: true
    }
  },

  setup (props) {
    const { form, reset, isValid, focusFirstError } = useContainer(props.autoFocus)

    return {
      form,
      reset,
      isValid,
      focusFirstError
    }
  }
}
</script>

<style>

</style>
