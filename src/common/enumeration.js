const enumeration = {
  Test: 'Test',
  ActionMode: {
    view: 0,
    add: 1,
    edit: 2,
    duplicate: 3
  },

  ExecuteStoreType: {
    mutation: 0,
    action: 1
  },

  actionManageWarehouse: {
    None: 0,
    ApplyTax: 1,
    AllowSell: 2,
    DeleteProduct: 3
  },

  // Trạng thái lấy từ DB
  status: {
    Ordering: 0, // Đặt hàng
    Finished: 1, // Hoàn thành
    Trading: 2, // Đang giao dịch
    Cancel: 12 // Đã hủy
  },

  ManufactureTabs: {
    History: 0,
    Debt: 1,
    Contact: 2,
    Address: 3,
    Note: 4
  },

  Gender: {
    Male: '0',
    Female: '1',
    Other: '2'
  },

  OrderStatus: {
    Create: 0,
    Browse: 1,
    Export: 2,
    Complete: 3
  }
}

export default enumeration
