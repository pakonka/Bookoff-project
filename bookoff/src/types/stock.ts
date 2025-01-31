export interface Stock {
    stock_id: number;           // ID của stock
    product_id: number;         // ID của sản phẩm
    product_name: string;       // Tên của sản phẩm
    location: string;           // Vị trí lưu trữ sản phẩm
    reserved_stock: number;     // Số lượng sản phẩm đã đặt trước
    update_at: string;          // Thời gian cập nhật stock
    available_stock: number;    // Số lượng sản phẩm có sẵn
    transaction_id?: string;    // ID giao dịch (nếu có)
    batch_number?: string;      // Số lô sản phẩm (nếu có)
  }
  