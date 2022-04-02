import { computed, reactive, ref } from 'vue'
import Enumeration from '@/common/enumeration'
const table = () => {
  const tableConfigs = reactive([
    {
      tabActive: Enumeration.ManufactureTabs.History,
      columns: [
        {
          name: 'Mã đơn nhập hàng',
          prop: ''
        },
        {
          name: 'Trạng thái',
          prop: ''
        },
        {
          name: 'Nhập kho',
          prop: ''
        },
        {
          name: 'Thanh toán',
          prop: ''
        },
        {
          name: 'Giá trị',
          prop: ''
        },
        {
          name: 'Chi nhánh',
          prop: ''
        },
        {
          name: 'Ngày tạo đơn',
          prop: ''
        },
        {
          name: 'Cập nhật cuối',
          prop: ''
        }
      ]
    },

    {
      tabActive: Enumeration.ManufactureTabs.Debt,
      columns: [
        {
          name: 'Mã phiếu',
          prop: ''
        },
        {
          name: 'Người tạo',
          prop: ''
        },
        {
          name: 'Ngày tạo',
          prop: ''
        },
        {
          name: 'Ngày ghi nhận',
          prop: ''
        },
        {
          name: 'Ghi chú',
          prop: ''
        },
        {
          name: 'Giá trị thay đổi',
          prop: ''
        },
        {
          name: 'Công nợ',
          prop: ''
        }

      ]
    },

    {
      tabActive: Enumeration.ManufactureTabs.Contact,
      columns: [
        {
          name: 'Tên liên hệ',
          prop: ''
        },
        {
          name: 'Số điện thoại',
          prop: ''
        },
        {
          name: 'Email',
          prop: ''
        },
        {
          name: 'Chức vụ',
          prop: ''
        },
        {
          name: 'Bộ phận',
          prop: ''
        }

      ]
    },

    {
      tabActive: Enumeration.ManufactureTabs.Address,
      columns: [
        {
          name: 'Nhãn',
          prop: ''
        },
        {
          name: 'Địa chỉ',
          prop: ''
        },
        {
          name: 'Phường xã',
          prop: ''
        },
        {
          name: 'Quận huyện',
          prop: ''
        },
        {
          name: 'Tỉnh thành phố',
          prop: ''
        },
        {
          name: 'Mã bưu điện',
          prop: ''
        },
        {
          name: 'Số điện thoại',
          prop: ''
        },
        {
          name: 'Email',
          prop: ''
        }

      ]
    },

    {
      tabActive: Enumeration.ManufactureTabs.Note,
      columns: [
        {
          name: 'Ghi chú',
          prop: ''
        },

        {
          name: 'Người thêm',
          prop: ''
        },

        {
          name: 'Thời gian',
          prop: ''
        }

      ]
    }

  ])

  const tabActive = ref(Enumeration.ManufactureTabs.History)

  const tableActive = computed(() => {
    const table = tableConfigs.find((element) => element.tabActive === Number(tabActive.value))
    debugger
    return table
  })
  return {
    tabActive,
    tableActive
  }
}
export default table
