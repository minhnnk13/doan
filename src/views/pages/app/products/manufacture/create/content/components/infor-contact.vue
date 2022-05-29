<template>
  <div class="contact">
    <div class="contact__name">
      <text-field
        label="Tên nhà cung cấp"
        :allow-blank="false"
        placeholder="Nhập tên nhà cung cấp"
        v-model="supplier.supplierName"
      />
    </div>
    <div class="contact__code">
      <text-field
        label="Mã nhà cung cấp"
        :allow-blank="false"
        :is-number="true"
        v-model="supplier.supplierCode"
      />
    </div>
    <div class="contact__email">
      <text-field
        label="Email"
        :is-email="true"
        :allow-blank="false"
        v-model="supplier.email"
      />
    </div>
    <div class="contact__phone">
      <text-field
        label="Số điện thoại"
        :is-phone="true"
        :allow-blank="false"
        v-model="supplier.phone"
      />
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {

  setup (props, { emit }) {
    const store = useStore()
    const supplier = computed(() => {
      return store.state.supplier.supplier
    })
    return {
      supplier
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
