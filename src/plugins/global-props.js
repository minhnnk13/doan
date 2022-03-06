import enumeration from '../common/enumeration'
import CommonFn from '../common/common-fn'

export default {
  install: (app) => {
    app.config.globalProperties.$enumeration = enumeration
    app.config.globalProperties.$commonFn = CommonFn
  }
}
