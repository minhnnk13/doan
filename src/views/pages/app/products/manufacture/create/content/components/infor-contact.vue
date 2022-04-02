<template>
  <div class="contact">
    <div class="contact__name">
      <text-field
        label="Tên nhà cung cấp"
        :allow-blank="false"
        placeholder="Nhập tên nhà cung cấp"
        v-model="name"
      />
    </div>
    <div class="contact__code">
      <text-field
        label="Mã nhà cung cấp"
        :allow-blank="false"
        v-model="code"
      />
    </div>
    <div class="contact__email">
      <text-field
        label="Email"
        :is-email="true"
        v-model="email"
      />
    </div>
    <div class="contact__phone">
      <text-field
        label="Số điện thoại"
        :is-phone="true"
        v-model="phoneNumber"
      />
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

const UPDATE = 'update:modelValue'

export default {

  emits: [UPDATE],

  props: {
    modelValue: {
      type: Object,
      default: () => {}
    }
  },

  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const name = computed({
      get: () => modelValue.value.name,

      set: (value) => {
        const model = { ...modelValue.value }
        model.name = value
        emit(UPDATE, model)
      }
    })

    const code = computed({
      get: () => modelValue.value.code,

      set: (value) => {
        const model = { ...modelValue.value }
        model.code = value
        emit(UPDATE, model)
      }
    })

    const email = computed({
      get: () => modelValue.value.email,

      set: (value) => {
        const model = { ...modelValue.value }
        model.email = value
        emit(UPDATE, model)
      }
    })

    const phone = computed({
      get: () => modelValue.value.phone,

      set: (value) => {
        const model = { ...modelValue.value }
        model.phone = value
        emit(UPDATE, model)
      }
    })
    return {
      name,
      code,
      email,
      phone
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  display: grid;
  grid-template-areas:
  'name name'
  'code email'
  'phone div';
  background: #fff;
  padding: 24px;
  gap: 24px;

  &__name {
    grid-area: name;
  }
  &__code {
    grid-area: code;
  }
  &__email {
    grid-area: email;
  }
  &__phone {
    grid-area: phone;
  }

}
</style>
