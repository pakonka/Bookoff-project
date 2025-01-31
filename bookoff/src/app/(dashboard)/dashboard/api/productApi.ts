import { axiosClient } from '@/libs/axiosClient';
import { NewProduct } from '@/types/product';

export const createProduct = async (productData: NewProduct) => {
    try {
      const productResponse = await axiosClient.post('http://localhost:5000/api/v1/products/create', productData);
      let productId = productResponse.data.product_id || null;
  
      // If product_id is missing, attempt to fetch it by slug
      if (!productId) {
        const slug = productResponse.data.slug;
        const response = await axiosClient.get(`http://localhost:5000/api/v1/products/slug/${slug}`);
        if (response.data && response.data.product_id) {
          productId = response.data.product_id;
        }
      }
  
      return productId; // Return the product ID (or null if not found)
    } catch (error) {
      console.error("Error adding product:", error);
      throw new Error("Failed to add product.");
    }
  };

  interface Image {
    image_url: string;
    is_primary: boolean;
  }

  export const addProductImages = async (productId: string, images: Image[]) => {
    try {
      for (const image of images) {
        await axiosClient.post('http://localhost:5000/api/v1/product-images', {
          product_id: productId,
          image_url: image.image_url,
          is_primary: image.is_primary,
        });
      }
    } catch (error) {
      console.error("Error adding product images:", error);
      throw new Error("Failed to add product images.");
    }
  };