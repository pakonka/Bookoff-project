import { Product } from "@/types/product";


export const fetchProducts = async () => {
  const res = await fetch("http://localhost:5000/api/v1/products/details");

  if (!res.ok) {
    return {
      props: { products: [] },
      revalidate: 10, // Cập nhật lại dữ liệu mỗi 10 giây
    };
  }

  const products: Product[] = await res.json();

  return {
    props: { products },
    revalidate: 10, // Cập nhật lại dữ liệu mỗi 10 giây
  };
};