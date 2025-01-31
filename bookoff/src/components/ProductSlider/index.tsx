"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";
import { PiCrownSimpleBold } from "react-icons/pi";


interface ProductSliderProps {
  products: Product[];
  showRanking?: boolean; // New optional prop to control ranking visibility
}

const ProductSlider = ({ products, showRanking = false }: ProductSliderProps) => {
  if (!products || products.length === 0) {
    return <p>No products available</p>; // Handle the case where no products are available
  }
  const crownColors = ["text-[#eec12d]", "text-[#c4c4c4]", "text-[#a07373]"];
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={5}
      slidesPerGroup={5}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="mySwiper"
    >
      {products.map((product, index) => {
        const size =
          product.category_name === "CD"
            ? { width: 128, height: 129 }
            : { width: 126, height: 183 };

        return (
          <SwiperSlide key={index} className="relative">
            {/* Conditional Ranking Badge */}
            {showRanking && (
              <div
              className={` flex items-center justify-center w-full h-8 ${
                index < 3 ? crownColors[index] : "text-black"
              }`}
            >
              {index < 3 ? (
                // Crown icon for top 3
                <span className="text-lg gap-2 font-bold h-8 flex items-center">
                  <PiCrownSimpleBold size={22} />
                  <span className="text-sm text-black flex items-center font-bold h-8"><span className="text-lg">{index + 1}</span>位</span>
                </span>
              ) : (
                <span className="text-sm flex items-center font-bold h-8"><span className="text-lg">{index + 1}</span>位</span>
              )}
            </div>
            )}
            <Link
              href={`/product/${product.slug}`}
              className="w-[191px] items-center h-[272px] text-[12px] flex flex-col justify-between mb-[50px] hover-opacity"
            >
              <div className="flex justify-center items-center p-2">
                <Image
                  src={product.primary_image_url || ""}
                  alt={product.title}
                  width={size.width}
                  height={size.height}
                  className={`object-cover ${
                    product.category_name === "CD"
                      ? "pt-[30px] w-[128px] h-[149px]"
                      : "h-full"
                  }`}
                />
              </div>
              <div>
                <h3
                  className="flex-grow overflow-hidden whitespace-nowrap text-ellipsis"
                  style={{ maxWidth: "200px" }} // Optional inline style for demonstration
                >
                  {product.title}
                </h3>
                <p className="text-gray-500">{product.author_name}</p>
                <p className="text-red-500 text-[14px]">¥{product.price}</p>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ProductSlider;
