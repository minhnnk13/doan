import { createApp } from 'vue'
import App from '@/pages/app/App.vue'
import router from '@/router'
import store from '@/store/app'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import globalComponents from '@/plugins/global-components'
import globalMixin from '@/plugins/global-mixin'
import { app } from '@/common/storage_initialize.js'
const globalProps = require('@/plugins/global-props').default

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(globalComponents)
  .use(globalMixin)
  .use(globalProps)
  .use(app)
  .mount('#app')
