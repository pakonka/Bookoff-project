"use client";
import ProductFilter from "@/components/ProductFilter";
import ProductList from "@/components/ProductList";
import { useState } from "react";

function Book() {
  const [filters, setFilters] = useState({
    searchKeyword: "",
    author: "",
    category: "",
    publisher: "",
    minPrice: "",
    maxPrice: "",
    releaseYearStart: "",
    releaseMonthStart: "",
    releaseYearEnd: "",
    releaseMonthEnd: "",
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="mt-[132px] mx-[10%] flex">
      <div className="w-1/4">
        <ProductFilter  onFilter={handleFilterChange} />
      </div>
      <div className="w-3/4">
        <ProductList filters={filters} />
      </div>
    </div>
  );
}

export default Book;

