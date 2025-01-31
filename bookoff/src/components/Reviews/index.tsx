import { useState } from "react";
import Stars from "../Stars";
import { Review } from "@/types/review";

interface DetailProps {
  reviews: Review[];
}
const Reviews: React.FC<DetailProps> = ({ reviews }) => {
  // State to track whether all reviews are shown
  const [showAllReviews, setShowAllReviews] = useState(false);
  // State to track which review is expanded
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  // Function to toggle a specific review
  const toggleReview = (index: number) => {
    if (expandedReviews.includes(index)) {
      setExpandedReviews(expandedReviews.filter((i) => i !== index));
    } else {
      setExpandedReviews([...expandedReviews, index]);
    }
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Display only 3 reviews initially
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-10">
      {/* Review Title */}
      <h2 className="relative text-[26px] pb-8 border-b-[#c2c2c2] font-bold pl-4 pt-6">
        商品レビュー
        <span className="absolute inset-y-6 left-0 w-[6px] rounded-xl bg-[#003984]"></span>
      </h2>

     {/* Summary Rating */}
    <div className="pb-6 border-b-[1px] text-[26px]">
      {reviews.length > 0 ? (
        <div className="flex items-center">
          <div className="flex items-center text-yellow-500">
            <Stars rating={averageRating} />
          </div>
          <span className="ml-2 text-lg font-bold text-gray-700">
            {averageRating.toFixed(1)}
          </span>
          <span className="ml-4 text-sm text-gray-500">
            ({reviews.length} 件のお客様レビュー)
          </span>
        </div>
      ) : (
        <p className="text-[14pt] text-gray-500">レビューはまだありません。</p>
      )}
    </div>


      {/* Review List */}
      {displayedReviews.map((review, index) => (
        <div
          key={index}
          className="mb-6 pt-3 pb-6 border-b-[1px] border-b-[#c2c2c2]"
        >
          <div className="flex items-center justify-between mb-2">
            <Stars rating={review.rating} />
            <span className="text-[#8b8b8b] text-[12px]">
              {review.review_date}
            </span>
          </div>

          {/* Truncated or Full Review Text */}
          <p
            className={`text-[14px] text-gray-700 ${
              expandedReviews.includes(index)
                ? ""
                : "line-clamp-2 overflow-hidden"
            }`}
          >
            {review.comment}
          </p>

          {/* Toggle button for long review */}
          {!expandedReviews.includes(index) &&
            review.comment.length > 100 && (
              <button
                onClick={() => toggleReview(index)}
                className="text-customBlue hover:underline text-sm mt-2"
              >
                表示する
              </button>
            )}

          {/* Hide button for expanded reviews */}
          {expandedReviews.includes(index) && (
            <button
              onClick={() => toggleReview(index)}
              className="text-customBlue hover:underline text-sm mt-2"
            >
              隠す
            </button>
          )}

          <p className="text-[13px] pt-2 text-gray-500">
            Posted by {review.user_name}
          </p>
        </div>
      ))}

      {/* Show more reviews button */}
      {!showAllReviews && reviews.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAllReviews(true)}
            className="text-customBlue hover:underline text-sm"
          >
            すべてのレビューを見る
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
