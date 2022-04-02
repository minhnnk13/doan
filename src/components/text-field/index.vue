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
      v-bind="inputListeners"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :show-password="showPassword"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="$emit('onSubmit')"
      ref="input"
      :class="{
        'only-border-bottom': onlyBorderBottom,
        'el-input__focused': isFocused,
      }"
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
import { computed, onMounted, ref, useAttrs } from 'vue'
const UPDATE_MODEL = 'update:modelValue'

export default {
  // components: {
  //   Search
  // },
  name: 'TextField',

  mixins: [validate],

  emits: [UPDATE_MODEL, 'onChange', 'onBlur', 'onSubmit'],

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
    },

    showPasswordState: {
      type: Boolean,
      default: false
    },

    onlyBorderBottom: {
      type: Boolean,
      default: false
    }
  },

  setup (props, { emit }) {
    const validation = getValidationProps(props, emit)
    const input = ref(null)
    const isFocused = ref(false)
    const attrs = useAttrs()
    const inputListeners = computed(() => {
      return {
        ...attrs,
        blur: onBlur,
        focus: onFocus
      }
    })

    const onBlur = () => {
      isFocused.value = false
    }

    const onFocus = () => {
      isFocused.value = true
    }

    onMounted(() => {
      if (props.showPasswordState) {
        input.value.handlePasswordVisible()
      }
    })
    return {
      ...validation,
      input,
      inputListeners,
      isFocused
    }
  }
}
</script>

<style lang="scss" scoped>
$gray: #9ca1b1;
$blue: #409eff;
$orange: #ff4f00;
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

  .only-border-bottom {
    transition: all 0.3s;
    position: relative;
    border-bottom: 1px solid $gray;

    :deep(.el-input__inner) {
      border: none;
      outline: none;
      width: 100%;
      transition: all 0.3s;
      box-shadow: none;
    }

    .el-input__prefix {
      position: absolute !important;
      top: 15px !important;
      height: 100% !important;
      color: #c0c4cc !important;
      text-align: center !important;
      left: 5px !important;
    }

    .el-input__inner[disabled] {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
    }
  }

  .el-input__focused.only-border-bottom {
    border-color: $blue;
  }
}
</style>
