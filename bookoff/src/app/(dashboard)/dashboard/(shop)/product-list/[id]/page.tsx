'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import ProductImageSection from '@/components/dashboard/ProductImageSection';
import { MdOutlineDelete } from 'react-icons/md';

export default function AdminProductDetails() {
  const { id } = useParams(); // Get the product id from dynamic route

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // State for reviews


  const token = localStorage.getItem("token");
  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          // Fetch product details
          const res = await fetch(`http://localhost:5000/api/v1/products/details/${id}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`, // Thêm token vào header
                "Content-Type": "application/json", // Nếu cần gửi dữ liệu JSON
              },
              next: { revalidate: 60 }, // Cấu hình revalidate (nếu bạn đang sử dụng Next.js hoặc tính năng liên quan)
            }
          );
          const productData = await res.json();
          setProduct(productData[0]); // Store fetched product data

          // Fetch product reviews
          const reviewsRes = await fetch(`http://localhost:5000/api/v1/reviews/product/${id}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`, // Thêm token vào header
                "Content-Type": "application/json", // Nếu cần gửi dữ liệu JSON
              },
              next: { revalidate: 60 }, // Cấu hình revalidate (nếu bạn đang sử dụng Next.js hoặc tính năng liên quan)
            }
          );
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData); // Store fetched reviews
        } catch (err) {
          console.error('Error fetching product details:', err);
        }
      };

      fetchProductDetails();
    }
  }, [id,token]); // Re-fetch when the `id` changes
    
  const handleDelete = async (reviewId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`, // Thêm token vào header
            "Content-Type": "application/json", // Nếu cần gửi dữ liệu JSON
          },
          next: { revalidate: 60 }, // Cấu hình revalidate (nếu bạn đang sử dụng Next.js hoặc tính năng liên quan)
        }
      );
      if (response.ok) {
        console.log(`Deleted product with ID: ${reviewId}`);
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  

  if (!product) return <p className="text-center text-xl">Loading...</p>; // Show loading state while fetching product

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-lg">
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-x-6">
      {/* Product Info Section */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.title}</h1>
  
        {/* Information Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-300 pt-4">
          <div>
            <p className="text-lg text-gray-500">Author:</p>
            <p className="text-lg font-semibold text-gray-800">{product.author_name}</p>
          </div>
          <div>
            <p className="text-lg text-gray-500">Category:</p>
            <p className="text-lg font-semibold text-gray-800">{product.category_name}</p>
          </div>
          <div>
            <p className="text-lg text-gray-500">Price:</p>
            <p className="text-lg font-bold text-blue-600">{product.price} ¥</p>
          </div>
          <div>
            <p className="text-lg text-gray-500">Stock:</p>
            <p className="text-lg font-semibold text-gray-800">{product.available_stock || 'N/A'}</p>
          </div>
        </div>
  
        {/* Description Section */}
        <div className="mt-6">
          <p className="text-lg text-gray-500 mb-2">Description:</p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  
    {/* Use ProductImageSection */}
    <ProductImageSection product={product} />
  
    {/* Reviews Section */}
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Reviews</h2>
  
      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Review Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">No reviews yet for this product.</td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.review_id} className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="px-6 py-4 text-gray-800">{review.user_name}</td>
                  <td className="px-6 py-4 text-yellow-500">{review.rating} / 5 ⭐</td>
                  <td className="px-6 py-4 text-gray-700">{review.comment}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(review.review_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-red-600 border border-red-600 rounded-lg p-2 hover:bg-red-50 transition-colors duration-200"
                             onClick={() => handleDelete(product.product_id)}>
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
