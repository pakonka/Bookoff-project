// PriceDisplay.tsx
import React from "react";
import useDiscountedPrice from "@/hooks/useDiscountedPrice";

interface PriceDisplayProps {
  price: number;
  discountPercent: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  discountPercent,
}) => {
  const { discountedPrice, originalPrice } = useDiscountedPrice(
    price,
    discountPercent
  );

  return (
    <div>
      <div className="text-[23px] text-[#e60009] font-semibold">
        ¥{discountedPrice}
        <span className="text-[#ccc] font-thin text-[20px] line-through ml-2">
          ¥{originalPrice}
        </span>
      </div>
      <div className="text-[13px] text-[#e60009]">({discountPercent}% off)</div>
    </div>
  );
};

export default PriceDisplay;
