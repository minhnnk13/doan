import { onMounted, provide, reactive, ref, watch } from 'vue'
import { VALIDATE_CLS } from '../../utils/validate'
import { focusFirstControl } from '@/common/common-fn'
export const PROVIDE_KEY = 'VALIDATE'

const useContainer = (autoFocus) => {
  const validated = ref(false)
  const form = ref(null)
  const controls = reactive([])
  provide(PROVIDE_KEY, validated)

  watch(form, (newVal) => {
    const controlVal = controls
    controlVal.splice(0, controlVal.length)
    if (newVal) {
      const validateControls = form.value.getElementsByClassName(VALIDATE_CLS)

      if (validateControls?.length) {
        for (let i = 0; i < validateControls.length; i++) {
          const vueComponent = validateControls[i]?.__vue__

          vueComponent && controlVal.push(vueComponent)
        }
      }
    }
  })

  onMounted(() => {
    const formElement = form.value

    if (autoFocus && formElement) {
      focusFirstControl(formElement)
    }
  })

  const focusFirstError = (invalidControls) => {
    if (invalidControls?.length > 0) {
      const firstErrorControl = invalidControls[0].$el.querySelector('input, textarea')
      firstErrorControl && firstErrorControl.focus()
    }
  }

  const isValid = () => {
    let isValid = true

    validated.value = true
    if (!controls?.length) return isValid

    const invalidControls = controls.filter((control) => control.isValid())

    if (invalidControls?.length) {
      isValid = false
      autoFocus && focusFirstError(invalidControls)
    }

    return isValid
  }

  const reset = () => {
    validated.value = false

    controls.forEach(control => {
      control.reset()
    })
  }

  return {
    form,
    validated,
    focusFirstError,
    isValid,
    reset
  }
}

export default useContainer
