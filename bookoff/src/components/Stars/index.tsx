// components/Stars.tsx
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarsProps {
  rating: number;
  showRatingText?: boolean; // Optional prop to show the rating text (e.g., "4.5 / 5")
}

const Stars: React.FC<StarsProps> = ({ rating, showRatingText = false }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  // Create full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }

  // Create half star
  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  // Create empty stars
  while (stars.length < 5) {
    stars.push(<FaRegStar key={stars.length} className="text-[#bdbdbd]" />);
  }

  return (
    <div className="flex items-center">
      {stars}
      {showRatingText && (
        <span className="ml-2 text-sm text-[#333]">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Stars;
