import { createApp } from 'vue'
import App from '@/pages/account/App.vue'
import router from '@/router'
import store from '@/store/account'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import globalComponents from '@/plugins/global-components'
import globalMixin from '@/plugins/global-mixin'

const globalProps = require('@/plugins/global-props').default

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(globalComponents)
  .use(globalMixin)
  .use(globalProps)
  .mount('#app')
