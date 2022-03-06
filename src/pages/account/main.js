import { createApp } from 'vue'
import App from '@/pages/account/App.vue'
import router from '@/router'
import store from '@/store/account'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import globalComponents from '@/plugins/global-components'

const globalProps = require('@/plugins/global-props').default

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(globalComponents)
  .use(globalProps)
  .mount('#app')
