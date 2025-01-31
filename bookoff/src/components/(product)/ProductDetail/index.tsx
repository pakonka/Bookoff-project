"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import PriceDisplay from "../PriceDisplay";
import SampleImages from "../SampleImages";
import Reviews from "@/components/Reviews";
import Stars from "@/components/Stars";
import useAverageRating from "@/hooks/useAverageRating";
import { MdOutlineEmail, MdNavigateNext } from "react-icons/md";
import CartAndFavorites from "@/components/CartAndFavorites";
import { Product } from "@/types/product";
import { Review } from "@/types/review";
import { saveData } from "@/hooks/useProductHistory";

interface DetailProps {
  product: Product; // Đây là kiểu của product
  review: Review[];
}
const ProductDetail: React.FC<DetailProps> = ({ product, review }) => {
  const [mainImage, setMainImage] = useState<string>(product.primary_image_url);
  const averageRating = useAverageRating(review);
  const price = Number(product.price);
  const discountPercent = Number(product.discount_percentage);
  const earnedPoints = Math.floor(price * 0.01);

  const handleAddToCart = () => {
    console.log("Thêm vào giỏ hàng:", product.title);
    // Logic thêm vào giỏ hàng sẽ được thêm vào đây
  };

  useEffect(() => {
    // Lưu sản phẩm đã xem mỗi khi component render
    saveData(product);
  }, [product]); // Chạy mỗi khi `product` thay đổi

  return (
    <div className="mx-auto p-5 flex gap-5 text-[#333]">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex justify-between gap-16">
          <div className="w-[222px] h-[340px] p-2">
            <Image
              src={mainImage}
              alt={product.title}
              width={222}
              height={340}
              className="object-cover"
            />
          </div>
          <div className="flex-1 gap-2 flex flex-col">
            <div className="mt-3 gap-2 flex">
              <span className="text-[#003894] px-1 py-[1px] bg-[#bacff0] font-semibold text-sm">
                書籍
              </span>
              <span className="px-1 py-[1px] bg-[#547fc7] text-[#fff] font-semibold text-sm">
                文庫
              </span>
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              {product.title}
            </h1>
            <div className="text-sm text-[#003894] mb-2">
              <span className="text-[#333]">著者:</span> {product.author_name}
            </div>
            <div className="flex items-center mb-2">
              <Stars rating={averageRating} showRatingText={true} />
              <span className="ml-2 text-[14px] text-customBlue">
                ({review.length} 件)
              </span>
            </div>
            <PriceDisplay price={price} discountPercent={discountPercent} />
            <div className="text-sm text-[#333] mt-1">
              獲得ポイント: {earnedPoints}P
            </div>
          </div>
        </div>
        <SampleImages
          images={product.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <Reviews reviews={review} />
      </div>
      <div className="w-[300px] h-auto bg-gray-100 p-5 rounded-lg flex flex-col items-center mt-[50px]">
        <CartAndFavorites onAddToCart={handleAddToCart} />
        <div className="flex text-[14px] text-[#333] gap-3 py-3 border-y-[1px] border-[#d7d7d7]">
          <MdOutlineEmail className="text-customBlue" size={25} />
          <span>値下げのお知らせを受け取る</span>
          <MdNavigateNext className="text-customBlue" size={30} />
        </div>
        {/*kankaku */}
        <div className="mt-10">
          <Image
            src="https://content.bookoff.co.jp/assets/images/banner/campaign/limited/202410/limited-680-160.png"
            alt=""
            width={282}
            height={66}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
