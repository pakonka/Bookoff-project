"use client";
import React, { useState } from "react";
import Image from "next/image";

// interface ImageItem {
//   defaultImage: string;
//   hoverImage: string;
//   name: string;
// }

// interface CategoryBarProps {
//   items: ImageItem[];
// }
const items = [
  {
    defaultImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_books.svg",
    hoverImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_books_active.svg",
    name: "書籍",
  },
  {
    defaultImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_comics.svg",
    hoverImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_comics_active.svg",
    name: "コミック",
  },
  {
    defaultImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_cd.svg",
    hoverImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_cd_active.svg",
    name: "CD",
  },
  {
    defaultImage:
      "	https://shopping.bookoff.co.jp/library/common/images/sell/category_dvd.svg",
    hoverImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_dvd_active.svg",
    name: "DVD/ブルーレイ",
  },
  {
    defaultImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_game.svg",
    hoverImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_game_active.svg",
    name: "ゲーム",
  },
  {
    defaultImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_set.svg",
    hoverImage:
      "https://shopping.bookoff.co.jp/library/common/images/sell/category_set_active.svg",
    name: "セット",
  },
];

export default function CategoryBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#003894] h-[188px] px-[72px] py-[24px] flex justify-center space-x-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={`w-[180px] h-[140px] rounded-xl p-[12px] flex flex-col justify-center items-center 
        transition-colors duration-300 ease-in-out 
        ${hoveredIndex === index ? "bg-[#002b81] text-white" : "bg-default"}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={hoveredIndex === index ? item.hoverImage : item.defaultImage}
            alt={item.name}
            width={60}
            height={60}
            className="mb-2"
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
