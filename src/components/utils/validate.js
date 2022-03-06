import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { inject, toRefs, ref, computed } from 'vue'
import { PROVIDE_KEY } from '../form'
const VALIDATE_CLS = 'validatable'

const CHANGE_EVENT = 'change'
const BLUR_EVENT = 'blur'
const FOCUS_EVENT = 'focus'
const UPDATE_VALUE = 'update:modelValue'

const validate = {
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },

    allowBlank: {
      type: Boolean,
      default: true
    },

    isEmail: {
      type: String,
      default: false
    }
  }
}
const useValidate = (props, emit) => {
  const validated = inject((PROVIDE_KEY), ref(true))

  const propValues = toRefs(props)
  const { modelValue } = propValues

  const value = computed({
    get: () => modelValue.value,
    set: (newVal) => {
      emit(UPDATE_VALUE, newVal)
    }
  })

  const getValidations = (propValues) => {
    const { allowBlank, isEmail } = propValues
    const validations = {}

    if (!allowBlank.value) {
      validations.required = required
    }

    if (isEmail.value) {
      validations.email = email
    }

    return validations
  }

  const validations = getValidations(propValues)
  const rules = computed(() => {
    return {
      modelValue: {
        ...validations
      }
    }
  })

  const v$ = useVuelidate(rules, { modelValue })
  const hasError = computed(() => {
    return validated.value && v$.value.$error
  })
  const touch = () => {
    v$.value.$touch()
  }

  const isValid = () => {
    touch()
    return hasError.value
  }

  const onChange = (value) => {
    touch()
    emit(CHANGE_EVENT, value)
  }

  const onBlur = (event) => {
    touch()

    emit(BLUR_EVENT, event)
  }

  const onFocus = (event) => {
    touch()
    emit(FOCUS_EVENT, event)
  }

  const getErrorMessage = (errors) => {
    const error = errors?.[0]
    let message = ''

    switch (error?.$validator) {
      case 'required':
        message = 'Không được bỏ trống.'
        break
      case 'email':
        message = 'Địa chỉ email không hợp lệ.'
        break
    }
    return message
  }
  const validateCls = computed(() => VALIDATE_CLS)
  const errorMessage = computed(() => !validated.value ? '' : getErrorMessage(v$.value.$errors))
  const reset = () => {
    v$.value.$reset()
    value.value = null
  }
  const validateEvents = {
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus
  }

  const methods = { isValid, touch, reset }
  const computedProps = { v$, value, hasError, errorMessage, validateCls }
  const events = { validateEvents }

  return {
    events,
    computedProps,
    methods
  }
}

const getValidationProps = (props, emit) => {
  const validation = useValidate(props, emit)
  const { computedProps, methods, events } = validation
  const { v$, value, hasError, errorMessage, validateCls } = computedProps
  const { isValid, touch, reset } = methods
  const { validateEvents } = events

  return {
    v$,
    value,
    hasError,
    errorMessage,
    validateCls,
    isValid,
    touch,
    reset,
    ...validateEvents
  }
}
export { validate, getValidationProps, VALIDATE_CLS }
