// CartAndFavorites.tsx
"use client";

import React from "react";
import { FaRegHeart } from "react-icons/fa";

interface CartAndFavoritesProps {
  onAddToCart: () => void; // Hàm gọi khi thêm vào giỏ hàng
}

const CartAndFavorites: React.FC<CartAndFavoritesProps> = ({ onAddToCart }) => {
  return (
    <div className="w-full">
      <button
        onClick={onAddToCart}
        className="w-full text-[18px] font-bold py-3 px-6 bg-[#ef7000] hover-opacity text-white rounded-full mb-4"
      >
        カートに追加する
      </button>
      {/* Thêm vào yêu thích */}
      <div className="w-full h-full flex gap-3 justify-center my-2 px-4">
        <span className="text-[#333]">
          <FaRegHeart size={20} />
        </span>
        お気に入り追加
      </div>
    </div>
  );
};

export default CartAndFavorites;
