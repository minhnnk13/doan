import { reactive } from 'vue'
import Enumeration from '@/common/enumeration'
const tabs = () => {
  const tabConfigs = reactive([
    {
      label: 'Lịch sử nhập hàng',
      value: Enumeration.ManufactureTabs.History
    }
    // {
    //   label: 'Công nợ',
    //   value: Enumeration.ManufactureTabs.Debt
    // },
    // {
    //   label: 'Liên hệ',
    //   value: Enumeration.ManufactureTabs.Contact
    // },
    // {
    //   label: 'Địa chỉ',
    //   value: Enumeration.ManufactureTabs.Address
    // },
    // {
    //   label: 'Ghi chú',
    //   value: Enumeration.ManufactureTabs.Note
    // }
  ])

  return {
    tabConfigs
  }
}
export default tabs
