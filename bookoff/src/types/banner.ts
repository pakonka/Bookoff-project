export interface Banner {
    banner_id: number; // ID của banner (primary key)
    discount_id: number | null; // ID của discount (có thể null nếu discount bị xóa)
    title: string; // Tiêu đề của banner
    image_url: string; // URL của hình ảnh
    is_active: boolean; // Trạng thái hoạt động của banner
    created_at: Date; // Ngày tạo banner
  }
  