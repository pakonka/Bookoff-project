import useAuth from "./useAuth";
import { axiosClient } from "@/libs/axiosClient";
import { Product } from "@/types/product";

export const saveData = async (product: Product) => {
  const { user, isAuthenticated } = useAuth.getState(); 

  try {
    if (isAuthenticated && user) {
      // Lưu vào cơ sở dữ liệu SQL Server
      await axiosClient.post("http://localhost:5000/api/v1/product-views", {
        userId: user.user_id,
        productId: product.product_id,
      });
    } else {
      // Nếu chưa đăng nhập, lưu vào localStorage
      const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts") || "[]");
    
      // Loại bỏ sản phẩm cũ nếu đã tồn tại
      const updatedProducts = viewedProducts.filter(
        (existingProduct: Product) => existingProduct.product_id !== product.product_id
      );
    
      // Thêm sản phẩm mới vào danh sách
      updatedProducts.push(product);
    
      // Lưu danh sách mới vào localStorage
      localStorage.setItem("viewedProducts", JSON.stringify(updatedProducts));
    }
    
  } catch (error) {
    console.error("Error fetching product details", error);
  }
};


export const syncLocalStorageData = async () => {
    const { user, isAuthenticated } = useAuth.getState();
  
    if (isAuthenticated && user) {
      const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts") || "[]");
  
      for (const product of viewedProducts) {
        await axiosClient.post("http://localhost:5000/api/v1/api/product-views", {
          userId: user.user_id,
          productId: product.product_id,
        });
      }
  
      // Sau khi đồng bộ, có thể xóa dữ liệu trong localStorage
      localStorage.removeItem("viewedProducts");
    }
  };
  