

export interface Product {
  product_id: number;
  title: string;
  release_date: string; // ISO string
  price: number;
  image_url: string | null; // Có thể không có nếu không tìm thấy ảnh chính
}

export interface Author {
  author_id: number;
  author_name: string;
  bio: string;
  date_of_birth: string; // ISO string
  nationality: string;
  created_at: string; // ISO string
  products: Product[]; // Mảng sản phẩm của tác giả
}

  