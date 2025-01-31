"use client";
import { useState, useEffect } from "react";
import ProductSlider from "../ProductSlider";
import { Product } from "@/types/product";
import Link from "next/link";


const Recommend = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/products/recommend");
        if (!res.ok) {
          setError("Failed to fetch products.");
          return;
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError("Error fetching products.", );
        console.log(error);
      }
    };

    fetchProductData();
  }, []); // Chạy khi component được mount

  if (error) {
    return <p>{error}</p>;
  }

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-[15%] relative">
      <div className="flex justify-between p-5 items-center">
        <h1 className="text-[30px] font-semibold">あなたにおすすめの商品</h1>
        <Link href={"/"} className="text-[#003894] text-[12px] hover-opacity">
          もっと見る
        </Link>
      </div>
      <ProductSlider products={products} />
    </div>
  );
};

export default Recommend;
