import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import CartAndFavorites from "../CartAndFavorites";
import Link from "next/link";
import { formatDate } from "@/utils/dateUtils";

interface ProductItemProps {
  product: Product;
  onAddToCart: () => void;
  isGridView: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  isGridView,
}) => {
  const earnedPoints = Math.floor(product.price * 0.01);
  return (
    <div
      className={
        isGridView
          ? "bg-white p-4 border-b-[1px] border-[#dfdede] mb-4" // Adjust for grid view layout
          : "bg-white p-4 border-b-[1px] border-[#dfdede] flex justify-between"
      }
    >
      <Link href={`/product/${product.slug}`} className={isGridView ? "cursor-pointer" : "flex gap-5 cursor-pointer"}>
        <div
          className={`
            ${isGridView ? "flex justify-center" : ""}
          `}
        >
          <Image
            alt={product.title}
            src={product.primary_image_url}
            width={isGridView ? 142 : 122}
            height={isGridView ? 205 : 175}
            className={`
            ${
              isGridView
                ? "object-cover w-[142px] h-[205px]"
                : "object-cover w-[122px] h-[175px]"
            }
          `}
          />
        </div>

        <div
          className={
            isGridView ? "mt-2 text-center" : "flex flex-col space-y-2"
          }
        >
          <div className="">
            <span className="text-[#003894] px-1 py-[1px] bg-[#bacff0] font-semibold text-sm">
              {product.category_name}
            </span>
          </div>
          <div className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
            {product.title}
          </div>
          <div className="text-sm text-gray-500">{product.author_name}</div>
          <div>
            <span className="text-customRed font-semibold">
              ¥{Number(product.price).toLocaleString()}円
            </span>
            {product.discount_percentage > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                定価より {Number(product.price).toLocaleString()} 円
              </span>
            )}

            {!isGridView && product.discount_percentage > 0 && (
              <span className="ml-2 text-sm text-customRed">
                （{product.discount_percentage}%おトク）
              </span>
            )}
          </div>
          {!isGridView && (
            <div className="text-xs text-gray-500">
              <div>獲得ポイント {earnedPoints}P</div>
              <div>発売年月日：{formatDate(product.release_date)}</div>
            </div>
          )}
        </div>
      </Link>
      {!isGridView && (
        <div className="flex space-x-4 mt-4 text-[16px]">
          <CartAndFavorites onAddToCart={onAddToCart} />
        </div>
      )}
    </div>
  );
};

export default ProductItem;
