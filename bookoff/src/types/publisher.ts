export interface Publisher {
    publisher_id: number; // ID của nhà xuất bản
    publisher_name: string; // Tên của nhà xuất bản
    location: string; // Địa chỉ của nhà xuất bản
    description: string; // Mô tả nhà xuất bản
    total_products?: number; // Số lượng sản phẩm thuộc nhà xuất bản (optional)
  }
  