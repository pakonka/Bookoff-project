"use client"; 
import ProductSlider from "../ProductSlider";
import { Product } from "@/types/product";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const RecentCheck = ({
  shouldRefresh = false, // Mặc định là false nếu không có giá trị truyền vào
}: {
  shouldRefresh?: boolean;
}) => {
  const { user, isAuthenticated } = useAuth.getState();
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentCheckProducts = async () => {
      try {
        let res;

        if (isAuthenticated && user) {
          // Lấy sản phẩm đã xem của người dùng nếu đã đăng nhập
          res = await fetch(`http://localhost:5000/api/v1/product-views/${user.user_id}`);
        } else {
          // Nếu không có user, lấy dữ liệu từ localStorage
          const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts") || "[]");

          // Nếu có sản phẩm trong localStorage, hiển thị chúng
          if (viewedProducts.length > 0) {
            setProducts(viewedProducts);
            setLoading(false);
            return;
          }

          // Nếu không có sản phẩm trong localStorage
          setProducts([]);
          setLoading(false);
          return;
        }

        if (res && res.ok) {
          const productsData: Product[] = await res.json();
          setProducts(productsData);
        } else {
          setError("Failed to fetch products");
        }
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchRecentCheckProducts();

    if (shouldRefresh) {
      fetchRecentCheckProducts();
    }
  }, [isAuthenticated, user, shouldRefresh]);

  if (loading) {
    return <p>Loading recent check products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (products.length === 0) {
    return (
      <div className="mx-[15%] relative">
        <div className="flex justify-between p-5 items-center">
          <h1 className="text-[30px] font-semibold">最近チェックした商品</h1>
        </div>
        <p className="text-center text-gray-500">最近チェックした商品はありません。</p>
      </div>
    );
  }

  return (
    <div className="mx-[15%] relative">
      <div className="flex justify-between p-5 items-center">
        <h1 className="text-[30px] font-semibold">最近チェックした商品</h1>
      </div>
      <ProductSlider products={products} />
    </div>
  );
};

export default RecentCheck;
