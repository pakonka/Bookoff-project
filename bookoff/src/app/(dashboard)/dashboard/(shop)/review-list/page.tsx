"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineDelete } from "react-icons/md";
import { Review } from "@/types/review";

export default function TableReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredReviews.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedReviews = filteredReviews.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (reviewId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">
          Product Reviews
        </h4>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Product Name</label>
        <input
          type="text"
          placeholder="Search review..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Review List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-2 flex items-center font-medium">Customer</div>
        <div className="col-span-3 flex items-center font-medium">Product</div>
        <div className="col-span-1 flex items-center font-medium">Rating</div>
        <div className="col-span-4 flex items-center font-medium">Comment</div>
        <div className="col-span-1 flex items-center font-medium justify-center">Delete</div>
      </div>

      {displayedReviews.map((review, index) => (
        <div
          key={review.review_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {review.user_name}
          </div>
          <div className="col-span-3 flex items-center text-sm text-black dark:text-white">
            {review.product_name}
          </div>
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {review.rating}
          </div>
          <div className="col-span-4 flex items-center text-sm text-black dark:text-white">
            {review.comment}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(review.review_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
}
