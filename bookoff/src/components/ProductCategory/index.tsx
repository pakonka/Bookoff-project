"use client";
import { useState, useEffect } from "react";
import ProductSlider from "../ProductSlider";
import Link from "next/link";
import { CategoryDetail } from "@/types/categories";

// Hàm fetch dữ liệu sản phẩm theo categorySlug
async function fetchProducts(categorySlug: string) {
  const res = await fetch(
    `http://localhost:5000/api/v1/products//top-selling/${encodeURIComponent(
      categorySlug
    )}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Hàm fetch danh sách categories
async function fetchCategories() {
  const res = await fetch("http://localhost:5000/api/v1/categories/parent");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

const ProductCategory = () => {
  // Sử dụng useState để lưu categorySlug đã chọn và dữ liệu sản phẩm
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("book"); // Giá trị mặc định là slug của category "書籍"
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<CategoryDetail[]>([]);

  useEffect(() => {
    // Fetch dữ liệu sản phẩm và danh mục khi categorySlug thay đổi
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(selectedCategorySlug), // Fetch sản phẩm theo categorySlug
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategorySlug]); // Chạy lại khi selectedCategorySlug thay đổi

  return (
    <div className="mx-[15%] my-[100px] relative">
      <div className="flex justify-between p-5 items-center">
        <h1 className="text-[30px] font-semibold ">週間ランキング</h1>
      </div>

      {/* Thanh chứa các category */}
      <div className="flex gap-4 overflow-x-auto border-b">
        {categories.map((category: CategoryDetail, index: number) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault(); // Ngăn cuộn lại đầu trang
              setSelectedCategorySlug(category.slug); // Cập nhật slug
            }}
            className={`text-[14px] font-semibold px-4 py-3 ${
              selectedCategorySlug === category.slug
                ? "text-[#003894] border-b-[3px] border-[#003894]"
                : "text-gray-500"
            } hover:text-[#003894]`}
          >
            {category.category_name}
          </button>
        ))}
      </div>

      {/* Hiển thị slider với các sản phẩm được lọc */}
      <ProductSlider products={products} showRanking={true} />

      <Link
        href={"/"}
        className="text-[#003894] text-[12px] hover-opacity float-right"
      >
        もっと見る
      </Link>
    </div>
  );
};

export default ProductCategory;
