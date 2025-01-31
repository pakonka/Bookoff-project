"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
  searchHistory: string[];
  productSuggestions: string[];
}

export default function SearchBar({
  searchHistory,
  productSuggestions,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Thêm kiểu string cho state
  const [isFocused, setIsFocused] = useState<boolean>(false); // Thêm kiểu boolean
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]); // Thêm kiểu array string
  const [showHistory, setShowHistory] = useState<boolean>(true); // Thêm kiểu boolean

  // Xử lý khi người dùng gõ vào input
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = productSuggestions.filter((product) =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowHistory(false); // Khi gõ thì đóng dropdown lịch sử
    } else {
      setFilteredSuggestions([]);
      setShowHistory(true); // Hiển thị lại lịch sử khi input rỗng
    }
  }, [searchTerm, productSuggestions]);

  // Xóa lịch sử tìm kiếm
  const handleDeleteHistory = (index: number) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    // Thực hiện callback hoặc setState nếu cần cập nhật từ component cha
    console.log(updatedHistory); // Giả sử sẽ cập nhật lịch sử sau
  };

  // Đóng dropdown khi click ra ngoài
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Đợi một chút để tránh đóng khi click vào dropdown
  };

  return (
    <div className="flex-1 mx-[12%] my-3 relative">
      <div className="relative">
        <input
          type="text"
          placeholder="キーワード・品番で検索"
          className="w-full border rounded-[5px] py-2 px-4 text-sm focus:outline-none focus:ring-2 bg-[#f1f1f1] focus:ring-blue-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setSearchTerm("")}
        >
          {searchTerm ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <IoSearchOutline className="w-5 h-5" />
          )}
        </span>
      </div>

      {isFocused && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto bg-default shadow-lg z-10">
          {showHistory && searchHistory.length > 0 ? (
            <ul>
              {searchHistory.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-400"
                >
                  <span>{item}</span>
                  <FaTimes
                    className="cursor-pointer text-gray-500"
                    onClick={() => handleDeleteHistory(index)}
                  />
                </li>
              ))}
            </ul>
          ) : showHistory ? (
            <div className="px-4 py-2 text-gray-500">検索履歴はありません</div>
          ) : null}

          {!showHistory && filteredSuggestions.length > 0 && (
            <ul>
              {filteredSuggestions.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSearchTerm(product)}
                >
                  <span>{product}</span>
                  <FaArrowRight />
                </li>
              ))}
            </ul>
          )}

          {!showHistory && filteredSuggestions.length === 0 && searchTerm && (
            <div className="px-4 py-2 text-gray-500">
              No product suggestions found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
