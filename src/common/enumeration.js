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
    Payment: 3, // Đã thanh toán
    Imported: 4, // Đã nhập hàng
    NotPayment: 5, // Chưa thanh toán
    WaitForImporting: 6, // Chờ nhập hàng
    StopTrading: 7, // Ngừng giao dịch
    StorageChecked: 8, // Đã kiểm kho
    StorageChecking: 9, // Đang kiểm kho
    Balance: 10, // Đã cân bằng
    StorageImported: 11, // Đã nhập kho
    Cancel: 12 // Đã hủy
  },

  ManufactureTabs: {
    History: 0,
    Debt: 1,
    Contact: 2,
    Address: 3,
    Note: 4
  }
}

export default enumeration
