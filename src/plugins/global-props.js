import Enumeration from '../common/enumeration'
import CommonFn from '../common/common-fn'
import MessageBox from '@/utils/message-box'

export default {
  install: (app) => {
    app.config.globalProperties.$enumeration = Enumeration
    app.config.globalProperties.$commonFn = CommonFn
    app.config.globalProperties.$messageBox = MessageBox
  }
}
