export interface WishlistItem {
    wishlist_id: number;       // ID của mục wishlist
    user_id: number;           // ID người dùng
    product_id: number;        // ID sản phẩm
    product_title?: string;     // Tên sản phẩm (nếu cần, thông qua join với bảng products)
    image_url?: string;        // Ảnh sản phẩm (nếu cần, thông qua join với bảng products_images)
    wishlist_count?: number; //
    product_price: number; 
    create_at: string;         // Ngày giờ mục wishlist được tạo
  }
  