import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { FiGrid } from "react-icons/fi";
import CustomSelect from "../CustomSelect";

interface ProductListHeaderProps {
  displayCount: number;
  sortedProductsLength: number;
  isGridView: boolean;
  onChangeDisplayCount: (newValue: number) => void;
  onChangeSortOption: (option: string) => void;
  onToggleView: (isGridView: boolean) => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  displayCount,
  sortedProductsLength,
  isGridView,
  onChangeDisplayCount,
  onChangeSortOption,
  onToggleView,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = (option: string) => {
    setSortOption(option);
    onChangeSortOption(option);
    setIsOpen(false);
  };

  return (
    <div className="pb-4 text-[14px] flex justify-between items-center border-b-[1px] border-[#dedede]">
      <span>{`1件～${displayCount}件（全${sortedProductsLength}件）`}</span> 
      <div className="flex relative">
        <div className="flex gap-2 items-center">
          <label>並び順</label>
          <div
            className={`h-[24px] w-[24px] bg-no-repeat bg-custom-sprite cursor-pointer`}
            style={{
              backgroundPosition: "0px 42.8571%",
            }}
            onClick={() => setIsOpen(!isOpen)} // Mở/đóng danh sách
          >
            {isOpen && (
              <div className="absolute float-left mt-10 w-[180px] bg-default rounded-lg shadow-xl z-10">
                {["default", "priceAsc", "priceDesc", "dateNew", "dateOld"].map(
                  (option) => (
                    <div
                      key={option}
                      className={`py-2 px-4 cursor-pointer hover:bg-gray-200 border-custom ${
                        sortOption === option ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handleSortChange(option)}
                    >
                      {option === "default"
                        ? "デフォルト"
                        : option === "priceAsc"
                        ? "価格が安い順"
                        : option === "priceDesc"
                        ? "価格が高い順"
                        : option === "dateNew"
                        ? "新しい順"
                        : "古い順"}
                      {sortOption === option && (
                        <IoMdCheckmark
                          size={18}
                          className="float-right text-customBlue"
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="h-[32px] flex items-center relative justify-center border-r-[1px] border-l-[1px] px-5 mx-5 border-[#c9c9c9]">
          <div
            onClick={() => onToggleView(false)}
            className={`cursor-pointer px-1 transition-colors duration-300 ${
              !isGridView ? "text-customBlue" : "text-[#a5a5a5]"
            }`}
          >
            <TbListDetails size={24} />
          </div>
          <div
            onClick={() => onToggleView(true)}
            className={`cursor-pointer px-1 transition-colors duration-300 ${
              isGridView ? "text-customBlue" : "text-[#a5a5a5]"
            }`}
          >
            <FiGrid size={24} />
          </div>
        </div>
        <div className="flex items-center">
          <label className="">表示件数：</label>
          <CustomSelect
            value={displayCount}
            onChange={(newValue: number) => {
              onChangeDisplayCount(newValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListHeader;
