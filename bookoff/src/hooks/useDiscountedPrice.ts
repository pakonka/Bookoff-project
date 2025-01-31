// useDiscountedPrice.ts
import { useMemo } from "react";

const useDiscountedPrice = (price: number, discountPercent: number) => {
  return useMemo(() => {
    const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(0);
    const originalPrice = price.toFixed(0);
    return { discountedPrice, originalPrice };
  }, [price, discountPercent]);
};

export default useDiscountedPrice;
