export type Products = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};

export interface Product {
  product_id: number;              // ID of the product
  title: string;                   // Product title
  description: string;             // Product description
  price: number;                   // Product price
  release_date: string;            // Release date (ISO string)
  category_name: string;           // Category name
  author_name: string;             // Author name
  publisher_name: string;          // Publisher name
  discount_code: string | null;    // Discount code (if any)
  discount_percentage: number; // Discount percentage (if any)
  available_stock: number;         // Available stock
  images: Images[];                // Array of images associated with the product 
  average_rating: number;   // Average rating of the product
  primary_image_url: string;
  slug: string;
}

export interface Images {
  image_id: number;               // ID of the image
  image_url: string;               // Image URL
  alt_text?: string;               // Alt text for the image
  is_primary: boolean;             // Flag indicating if this image is the primary image
}




export interface ProductDetail {
  product_id: number;
  title: string;
  description: string;
  price: number;
  release_date?: Date;
  sku: string;
  created_at: Date;
  updated_at: Date;
  category_name: string;
  // category: {
  //   category_id: number;
  //   category_name: string;
  //   description?: string;
  // };
  subcategory?: {
    subcategory_id: number;
    subcategory_name: string;
    description?: string;
  };
  // author: {
  //   author_id: number;
  //   author_name: string;
  //   bio?: string;
  //   date_of_birth?: Date;
  //   nationality?: string;
  // };
  author_name: string;
  publisher: {
    publisher_id: number;
    publisher_name: string;
    location: string;
    description: string;
  };
  discount: {
    discount_id: number;
    discount_code: string;
    discount_percentage: number;
    valid_from?: Date;
    valid_until?: Date;
    active: boolean;
    discount_type: string;
    required_quantity: number;
  };
  image_url: string;
  available_stock: number;
  review_id: number;
};

export interface UpdateProduct {
  product_id: number;
  title: string;
  author_name: string;
  category_name: string;
  category_id: number;
  description?: string;
  price: number;
  slug: string;
  release_date: string;
  publisher_name: string;
  discount_code: string;
  discount_id: number;
  discount_percentage: number;
  available_stock: number;
  images: { image_url: string; is_primary: boolean }[];
}


export interface NewProduct {
  title: string;
  author_name: string
  category_name: string; // Changed to category_id
  description?: string;
  price: number;
  slug: string;
  release_date: string;
  publisher_name: string;
  discount_code: string;
  discount_percentage: number;
  available_stock: number;
  images: { image_url: string; is_primary: boolean }[]; // Array of images with is_primary flag
}