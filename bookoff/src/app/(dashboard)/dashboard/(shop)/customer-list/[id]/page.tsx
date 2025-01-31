'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { Review } from '@/types/review';
import { Order } from '@/types/order';
import { WishlistItem } from '@/types/wishlistItem';
import { MdOutlineDelete } from 'react-icons/md';
import Profile from '@/components/dashboard/UserProfile';
import Image from 'next/image';
import Link from 'next/link';
import { token } from '../../../utils/getToken';

export default function AdminCustomerDetails() {
  const { id } = useParams(); // Get the Customer id from dynamic route
  const [customer, setCustomer] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // State for reviews
  const [orders, setOrders] = useState<Order[]>([]); // Trạng thái cho orders
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);


  useEffect(() => {
    if (id) {
      const fetchCustomerDetails = async () => {
        try {
          // Fetch Customer details
          const res = await fetch(`http://localhost:5000/api/v1/customers/${id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              next: { revalidate: 60 },
            }
          );
          const customerData = await res.json();
          setCustomer(customerData); // Store fetched Customer data

          // Fetch Customer reviews
          const reviewsRes = await fetch(`http://localhost:5000/api/v1/reviews/customers/${id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              next: { revalidate: 60 },
            }
          );
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData); // Store fetched reviews

          // Fetch Customer orders
          const ordersRes = await fetch(`http://localhost:5000/api/v1/orders/customers/${id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              next: { revalidate: 60 },
            }
          );
          const ordersData = await ordersRes.json();
          setOrders(ordersData);

          // Fetch Customer wishlist
          const wishlistItemsRes = await fetch(`http://localhost:5000/api/v1/wishlists/customers/${id}`,
            {headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            next: { revalidate: 60 },}
          );
          const wishlistItemsData = await wishlistItemsRes.json();
          setWishlistItems(wishlistItemsData);
        } catch (err) {
          console.error('Error fetching customer details:', err);
        }
      };

      fetchCustomerDetails();
    }
  }, [id]); // Re-fetch when the `id` changes

  if (!customer) return <p className="text-center text-xl">Loading...</p>; // Show loading state while fetching Customer

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-lg">

        <div className='flex gap-10'>
            <div className='w-1/3'>
            <Profile user={customer} />
            </div>
            {/* Reviews Section */}
    <div className=" flex-1">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
  
      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Review Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-600">No reviews yet for this Customer.</td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.review_id} className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="px-6 py-4 text-yellow-500">{review.rating} / 5 ⭐</td>
                  <td className="px-6 py-4 text-gray-700">{review.comment}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(review.review_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-red-600 border border-red-600 rounded-lg p-2 hover:bg-red-50 transition-colors duration-200">
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
    {/* Orders Section */}
    <div className="flex-1 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Orders</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Order Date</th>
                  <th className="px-6 py-3">Total Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-600">
                      No orders found for this customer.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-gray-100 transition-colors duration-300">
              <td className="px-6 py-4">
                <Link href={`/dashboard/order-list/${order.order_id}`} >
                  {order.order_id}
                </Link>
              </td>
              <td className="px-6 py-4">{new Date(order.order_date).toLocaleDateString()}</td>
              <td className="px-6 py-4">{order.total_amount.toLocaleString()} ¥</td>
              <td className="px-6 py-4">{order.order_status}</td>
            </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </div>
      <div className="flex-1 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer WishlistItems</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3"></th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-600">
                      No WishlistItems found for this customer.
                    </td>
                  </tr>
                ) : (
                  wishlistItems.map((wishlistItem) => (
                    <tr key={wishlistItem.wishlist_id} className="hover:bg-gray-100 transition-colors duration-300">
                      <td className="px-6 py-4">{wishlistItem.wishlist_id}</td>
                      <td className="px-6 py-4">
                      <Image
                        src={wishlistItem.product_image || ""}
                        width={60}
                        height={50}
                        alt={"Product Image"}
                      />
                      </td>
                      <td className="px-6 py-4">{wishlistItem.product_title}</td>
                      <td className="px-6 py-4">{wishlistItem.product_price} ¥</td>
                      <td className="px-6 py-4">{new Date(wishlistItem.create_at).toLocaleDateString()}</td>
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
