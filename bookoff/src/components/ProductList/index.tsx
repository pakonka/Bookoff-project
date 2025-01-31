import React, { useState, useEffect } from "react";
import { sortProducts } from "@/utils/sortProducts";
import { Product } from "@/types/product";
import ProductItem from "../ProductItem";
import Pagination from "../Pagination";
import ProductListHeader from "../ProductListHeader";
import { useParams } from "next/navigation";

function ProductList({
  filters,
}: {
  filters: {
    searchKeyword: string;
    author: string;
    publisher: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    releaseYearStart: string;
    releaseMonthStart: string;
    releaseYearEnd: string;
    releaseMonthEnd: string;
  };
}) {
  const params = useParams(); // Lấy slug từ URL
  const slug = params.slug; // Ví dụ: "book" hoặc "comic"
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [displayCount, setDisplayCount] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOption, setSortOption] = useState("default");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/v1/products/details/category/slug/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Products fetched:", data);
        setProducts(data|| []);
      } catch (err) {
        setError((err as Error).message || "An error occurred while fetching products.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  // Filter and sort products based on filters and sortOption
  useEffect(() => {
    const applyFilters = () => {
      let result = [...products];

      if (filters.searchKeyword) {
        result = result.filter((product) =>
          product.title.toLowerCase().includes(filters.searchKeyword.toLowerCase())
        );
      }

      if (filters.author) {
        result = result.filter((product) =>
          product.author_name.toLowerCase().includes(filters.author.toLowerCase())
        );
      }

      if (filters.publisher) {
        result = result.filter((product) =>
          product.publisher_name.toLowerCase().includes(filters.publisher.toLowerCase())
        );
      }

      if (filters.category && filters.category !== "すべてのカテゴリ") {
        result = result.filter((product) => product.category_name === filters.category);
      }

      if (filters.minPrice) {
        result = result.filter((product) => product.price >= Number(filters.minPrice));
      }

      if (filters.maxPrice) {
        result = result.filter((product) => product.price <= Number(filters.maxPrice));
      }

      // Filter by release year and month (start)
      if (filters.releaseYearStart) {
        result = result.filter((product) =>
          new Date(product.release_date).getFullYear() >= Number(filters.releaseYearStart)
        );
      }

      if (filters.releaseMonthStart) {
        result = result.filter((product) =>
          new Date(product.release_date).getMonth() + 1 >= Number(filters.releaseMonthStart)
        );
      }

      // Filter by release year and month (end)
      if (filters.releaseYearEnd) {
        result = result.filter((product) =>
          new Date(product.release_date).getFullYear() <= Number(filters.releaseYearEnd)
        );
      }

      if (filters.releaseMonthEnd) {
        result = result.filter((product) =>
          new Date(product.release_date).getMonth() + 1 <= Number(filters.releaseMonthEnd)
        );
      }
      console.log("Filtered products after sorting:", result);
      result = sortProducts(result, sortOption);
      setFilteredProducts(result);
    };

    applyFilters();
  }, [products, filters, sortOption]);

  // Handle pagination
  const pageCount = Math.ceil(filteredProducts.length / displayCount);
  const displayedProducts = filteredProducts.slice(
    currentPage * displayCount,
    (currentPage + 1) * displayCount
  );

  // Event Handlers
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const handleSortChange = (option: string) => setSortOption(option);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No products available.</p>;

  const handleAddToCart = (product: Product) => {
    console.log("Thêm vào giỏ hàng:", product);
    // Logic thêm vào giỏ hàng sẽ được thêm vào đây
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <ProductListHeader
        displayCount={displayCount}
        sortedProductsLength={filteredProducts.length}
        isGridView={isGridView}
        onChangeDisplayCount={(newValue) => {
          setDisplayCount(newValue);
          setCurrentPage(0);
        }}
        onChangeSortOption={handleSortChange}
        onToggleView={setIsGridView}
      />

      <div className={`grid gap-4 ${isGridView ? "grid-cols-3" : "grid-cols-1"}`}>
        {displayedProducts.map((product) => (
          <ProductItem
            onAddToCart={() => handleAddToCart(product)}
            key={product.product_id}
            product={product}
            isGridView={isGridView}
          />
        ))}
      </div>

      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
}

export default ProductList;
