<template>
  <div
    class="input"
    :class="[validateCls]"
  >
    <label>
      {{ label }}
      <span
        v-if="!allowBlank && showRequire"
        class="require"
      >*</span>
    </label>
    <el-input
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :show-password="showPassword"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div
      class="error-message"
      v-if="hasError"
      v-html="errorMessage"
    />
  </div>
</template>

<script>
// import { computed, toRefs } from 'vue'
import { getValidationProps, validate } from '../utils/validate'

const UPDATE_MODEL = 'update:modelValue'

export default {
  name: 'TextField',

  mixins: [validate],

  emits: [UPDATE_MODEL, 'onChange', 'onBlur'],

  props: {
    modelValue: {
      type: String,
      default: null
    },

    type: {
      type: String,
      default: 'text'
    },

    label: {
      type: String,
      default: null
    },

    placeholder: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    showPassword: {
      type: Boolean,
      default: false
    },

    showRequire: {
      type: Boolean,
      default: true
    }

  },

  setup (props, { emit }) {
    const validation = getValidationProps(props, emit)

    return {
      ...validation
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
    label {
         margin-bottom: 4px;
         display: block;

         .require {
           color: red;
         }

    }

    .error-message {
      color: red;
      font-size: 14px;
      margin-top: 4px;
    }
}
</style>
