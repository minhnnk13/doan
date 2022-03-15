import { ElMessageBox } from 'element-plus'

const MESSAGE_BOX_TYPE = {
  Default: '',
  Prompt: 'prompt',
  Alert: 'alert',
  Confirm: 'confirm'
}
class MessageBox {
    defaultAcion

    constructor () {
      this.defaultAcion = {
        title: 'compnanyName',
        message: '',
        dengerouslyUseHTMLString: false,
        customClass: 'message-box',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Đồng ý',
        ignoreButtonText: 'Bỏ qua',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: false,
        boxType: MESSAGE_BOX_TYPE.Default,
        showClose: false
      }
    }

    show (option) {
      const msgOption = {
        ...this.defaultAcion,
        ...option
      }

      return ElMessageBox(msgOption)
    }

    showAlert (message, option) {
      const alertOption = {
        boxType: MESSAGE_BOX_TYPE.Alert,
        message,
        showCancelButton: false
      }

      return this.show({ ...alertOption, ...option })
    }

    showConfirm (message, callback, option) {
      const confirmBoxOption = {
        boxType: MESSAGE_BOX_TYPE.Confirm,
        message,
        callback
      }

      return this.show({ ...confirmBoxOption, ...option })
    }
}

export default new MessageBox()
