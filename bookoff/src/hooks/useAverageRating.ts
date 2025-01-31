import { useState, useEffect } from "react";
import { Review } from "@/types/review";

const useAverageRating = (reviews: Review[]) => {
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const average = totalRating / reviews.length;
      setAverageRating(average);
    }
  }, [reviews]);

  return averageRating;
};

export default useAverageRating;
