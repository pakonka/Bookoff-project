"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

type FilterValues = {
  searchKeyword: string;
  author: string;
  publisher: string;
  minPrice: string;
  maxPrice: string;
  releaseYearStart: string;
  releaseMonthStart: string;
  releaseYearEnd: string;
  releaseMonthEnd: string;
  category: string;
};

interface ProductFilterProps {
  onFilter: (filters: FilterValues) => void;
}

function ProductFilter({ onFilter }: ProductFilterProps) {
  const params = useParams(); // Lấy slug từ URL
  const slug = params.slug; // Ví dụ: "book" hoặc "comic"

  const [filters, setFilters] = useState<FilterValues>({
    searchKeyword: "",
    author: "",
    publisher: "",
    minPrice: "",
    maxPrice: "",
    releaseYearStart: "",
    releaseMonthStart: "",
    releaseYearEnd: "",
    releaseMonthEnd: "",
    category: "すべてのカテゴリ",
  });

  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories dynamically from the backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/categories/parent/slug/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        
        const data = await res.json();
        setCategories(data.map((category: { category_name: string }) => category.category_name));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [slug]);

  const handleFilterChange = <K extends keyof FilterValues>(field: K, value: FilterValues[K]) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [field]: value };
      onFilter(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-[5px]">
      <div className="mb-4">
        <h2 className="text-[22px] pb-3 border-b-[2px] border-customBlue font-bold">
          絞り込み
        </h2>
      </div>

      {/* Category */}
      <div className="mb-4">
  <h2 className="text-[16px] font-semibold">カテゴリ</h2>
  <div className="mt-2 text-[#333]">
    {categories.length === 0 ? (
      <div>Loading categories...</div>
    ) : (
      // Thêm mục "すべてのカテゴリ" vào đầu danh sách
            <div>
              <div
                onClick={() => handleFilterChange("category", "すべてのカテゴリ")}
                className={`w-full text-left p-2 text-[14px] cursor-pointer ${
                  filters.category === "すべてのカテゴリ" ? "text-[#003894] font-semibold" : "text-[#333]"
                }`}
              >
                すべてのカテゴリ
              </div>

              {categories.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => handleFilterChange("category", cat)}
                  className={`w-full text-left cursor-pointer p-2 text-[14px] ${
                    filters.category === cat ? "text-[#003894] font-semibold" : "text-[#333]"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Search Keyword */}
      <div className="mb-4">
        <h2 className="text-[16px] font-semibold">キーワード</h2>
        <input
          type="text"
          placeholder="〜を含む"
          className="w-full mt-2 p-2 border border-gray-300 rounded-[5px] bg-[#f5f5f5]"
          value={filters.searchKeyword}
          onChange={(e) => handleFilterChange("searchKeyword", e.target.value)}
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <h2 className="text-[16px] font-semibold">著者・作者</h2>
        <input
          type="text"
          placeholder="入力してください"
          className="w-full mt-2 p-2 border border-gray-300 rounded-[5px] bg-[#f5f5f5]"
          value={filters.author}
          onChange={(e) => handleFilterChange("author", e.target.value)}
        />
      </div>

      {/* Publisher */}
      <div className="mb-4">
        <h2 className="text-[16px] font-semibold">販売会社/出版社（メーカー）</h2>
        <input
          type="text"
          placeholder="入力してください"
          className="w-full mt-2 p-2 border border-gray-300 rounded-[5px] bg-[#f5f5f5]"
          value={filters.publisher}
          onChange={(e) => handleFilterChange("publisher", e.target.value)}
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <h2 className="text-[16px] mb-2 font-semibold">価格</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="最小価格"
            className="w-full p-2 border border-gray-300 rounded-[5px] bg-[#f5f5f5]"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
          <span className="flex items-center">〜</span>
          <input
            type="text"
            placeholder="最大価格"
            className="w-full p-2 border border-gray-300 rounded-[5px] bg-[#f5f5f5]"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
          <span className="flex items-center">円</span>
        </div>
      </div>

      {/* Release Year and Month */}
      <div className="mb-4">
        <h2 className="text-[16px] mb-2 font-semibold">発売年月</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none pr-8"
              value={filters.releaseYearStart}
              onChange={(e) => handleFilterChange("releaseYearStart", e.target.value)}
            >
              <option value="">ー</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}年
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
            </span>
          </div>
          <span className="flex items-center whitespace-nowrap">年</span>
          <div className="relative">
            <select
              className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none pr-8"
              value={filters.releaseMonthStart}
              onChange={(e) => handleFilterChange("releaseMonthStart", e.target.value)}
            >
              <option value="">ー</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}月
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
            </span>
          </div>
          <span className="flex items-center whitespace-nowrap">月〜</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="relative">
            <select
              className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none pr-8"
              value={filters.releaseYearEnd}
              onChange={(e) => handleFilterChange("releaseYearEnd", e.target.value)}
            >
              <option value="">ー</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}年
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
            </span>
          </div>
          <span className="flex items-center whitespace-nowrap">年</span>
          <div className="relative">
            <select
              className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none pr-8"
              value={filters.releaseMonthEnd}
              onChange={(e) => handleFilterChange("releaseMonthEnd", e.target.value)}
            >
              <option value="">ー</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}月
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
            </span>
          </div>
          <span className="flex items-center whitespace-nowrap">月</span>
        </div>
      </div>

     
    </div>
  );
}

export default ProductFilter;
