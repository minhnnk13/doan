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
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
      <!-- <template #prefix>
        <el-icon>
          <search />
        </el-icon>
      </template> -->
    </el-input>

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
import { Search } from '@element-plus/icons-vue'
import { computed } from 'vue-demi'
const UPDATE_MODEL = 'update:modelValue'

export default {
  // components: {
  //   Search
  // },
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
    },

    prefixIcon: {
      type: String,
      default: null
    },

    suffixIcon: {
      type: String,
      default: null
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
