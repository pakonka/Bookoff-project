export interface CategoryDetail {
    category_id: number; // ID của danh mục
    category_name: string; // Tên danh mục
    parent_category_name?: number | null; // ID của danh mục cha (nếu có)
    description?: string; // Mô tả danh mục
    slug: string; // Slug (URL-friendly) cho danh mục
    created_by?: number; // Người tạo
    updated_by?: number; // Người cập nhật cuối cùng
    updated_at?: Date; // Thời gian cập nhật cuối
    total_products: number;
  }