"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { OrderItem } from "@/types/order";
import { token } from "../../../utils/getToken";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import Image from "next/image";
import UpdateOrderItemForm from "@/components/dashboard/UpdateOrderItemForm";

export default function OrderDetailsPage() {
  const { id } = useParams(); // Get order ID from route
  const [order, setOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUpdateOrderItemOpen, setIsUpdateOrderItemOpen] = useState<boolean>(false);
  const [editingOrderItemId, setEditingOrderItemId] = useState<number | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchOrderDetails = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/v1/orders/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const orderData = await res.json();
          if (orderData && orderData.order_items && typeof orderData.order_items === "string") {
            try {
              orderData.order_items = JSON.parse(orderData.order_items); // Parse JSON string to array
            } catch (parseError) {
              console.error("Error parsing order_items JSON:", parseError);
            }
          }

          // Process order items if valid
          if (orderData && Array.isArray(orderData.order_items)) {
            orderData.order_items = orderData.order_items.map((item: OrderItem) => ({
              ...item,
              totalPrice: (item.price_at_purchase * item.quantity).toFixed(2),
            }));
          }
          setOrder(orderData); // Set order data
        } catch (err) {
          console.error("Error fetching order details:", err);
        }
      };

      fetchOrderDetails();
    }
  }, [id, update]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteOrderItem = async (itemId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/order-items/${itemId}`,
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
        setUpdate(true); // Trigger re-fetching order details to reflect changes made by other users
        console.log(`Deleted order items with ID: ${itemId}`);
        
      } else {
        console.error("Failed to delete order items ");
      }
    } catch (error) {
      console.error("Error deleting order items :", error);
    }
  };


  const handleUpdate = async () => {
    if (order) {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/orders/${id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        if (res.ok) {
          const updatedOrder = await res.json();
          setOrder(updatedOrder);
          setIsEditing(false); // Close edit mode
          alert("Order updated successfully!")
        } else {
          console.error("Failed to update order");
          alert("Failed to update order. Please try again.")
        }
      } catch (error) {
        console.error("Error updating order:", error);
        alert("An error occurred while updating order.")
      }
    }
  };

  if (!order) return <p className="text-center text-xl font-medium text-gray-600">Loading...</p>;

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Order Details</h2>

      <div className="flex gap-3 py-3 text-[18px]">
            <span className="font-semibold text-gray-700">Order ID:</span>
            <span className="">{order.order_id}</span>
            <span className="font-semibold text-gray-700">Order Date:</span>
            <span className="text-gray-800">{new Date(order.order_date).toLocaleDateString()}</span>
          </div>
      {/* Order General Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-md">
        
        {/* Left Column */}
        <div className="space-y-4 border-r pr-6">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Customer Name:</span>
            {isEditing ? (
              <input
                type="text"
                value={order.customer_name}
                onChange={(e) => setOrder({ ...order, customer_name: e.target.value })}
                className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="text-gray-800 cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditing(true)}>{order.customer_name}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Shipping Address:</span>
            {isEditing ? (
              <input
                type="text"
                value={order.shipping_address}
                onChange={(e) => setOrder({ ...order, shipping_address: e.target.value })}
                className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="text-gray-800 cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditing(true)}>{order.shipping_address}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Shipping Method:</span>
            {isEditing ? (
              <input
                type="text"
                value={order.shipping_method}
                onChange={(e) => setOrder({ ...order, method_name: e.target.value })}
                className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="text-gray-800 cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditing(true)}>{order.shipping_method}</span>
            )}
          </div>
          <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Order Status:</span>
              {isEditing ? (
                <select
                  value={order.order_status}
                  onChange={(e) =>
                    setOrder({ ...order, order_status: e.target.value })
                  }
                  className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {/* Thêm các tùy chọn trạng thái đơn hàng */}
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              ) : (
                <span
                  className="text-gray-800 cursor-pointer hover:text-blue-500"
                  onClick={() => setIsEditing(true)}
                >
                  {order.order_status}
                </span>
              )}
            </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Discount Code:</span>
            {isEditing ? (
              <input
                type="text"
                value={order.discount_code || ""}
                onChange={(e) => setOrder({ ...order, discount_code: e.target.value })}
                className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="text-gray-800 cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditing(true)}>{order.discount_code || "N/A"}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Discount percentage:</span>
            <span className="text-gray-800">{order.discount_percentage}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Payment Status:</span>
            {isEditing ? (
              <select
                value={order.payment_status}
                onChange={(e) =>
                  setOrder({ ...order, payment_status: e.target.value })
                }
                className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {/* Thêm các tùy chọn trạng thái thanh toán */}
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            ) : (
              <span
                className="text-gray-800 cursor-pointer hover:text-blue-500"
                onClick={() => setIsEditing(true)}
              >
                {order.payment_status}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            {isEditing ? (
              <select
                value={order.payment_method}
                onChange={(e) =>
                  setOrder({ ...order, payment_method: e.target.value })
                }
                className="text-gray-800 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {/* Thêm các tùy chọn phương thức thanh toán */}
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            ) : (
              <span
                className="text-gray-800 cursor-pointer hover:text-blue-500"
                onClick={() => setIsEditing(true)}
              >
                {order.payment_method}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3 text-[18px]">
            <span className="font-semibold text-gray-700">Total Price:</span>
            <span className="text-gray-800">{order.total_price}¥</span>
          </div>
      </div>

      {/* Buttons for editing */}
      <div className="flex justify-end space-x-4 mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-[#294ec9] text-white rounded-lg"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-[#ccc] text-gray-800 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-[#2cc156] text-white rounded-lg"
          >
            Edit Order
          </button>
        )}
      </div>
        {/* Order Items */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ordered Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left font-semibold text-[#2f35aa] border-b">Product</th>
                <th className="px-6 py-3 text-left font-semibold text-[#2f35aa] border-b">Quantity</th>
                <th className="px-6 py-3 text-left font-semibold text-[#2f35aa] border-b">Price at Purchase</th>
                <th className="px-6 py-3 text-left font-semibold text-[#2f35aa] border-b">Actions</th> {/* Cột cho các nút */}
              </tr>
            </thead>
            <tbody>
              {order?.order_items && order.order_items.length > 0 ? (
                order.order_items.map((item) => (
                  <tr key={item.order_item_id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 flex gap-3">
                      <div className="h-12.5 w-15 rounded-md flex items-center py-2">
                            <Image
                                src={item.image_url || ""}
                                width={50}
                                height={40}
                                alt={"Product Image"}
                            />
                        </div>
                      <p>{item.product_name}</p>
                      </td>
                    <td className="px-6 py-4 text-gray-800">{item.quantity}</td>
                    <td className="px-6 py-4 text-gray-800">{item.price_at_purchase}¥</td>
                    <td className="px-6 py-4 text-gray-800">
                      {/* Nút Chỉnh sửa */}
                      <button
                        onClick={() => {
                          setEditingOrderItemId(item.order_item_id);
                          setIsUpdateOrderItemOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 mr-4 "
                      >
                        <MdOutlineEdit />
                      </button>
                      {/* Nút Xóa */}
                      <button
                        onClick={() => handleDeleteOrderItem(item.order_item_id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-600">No products in this order.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Update Publisher Modal */}
            {isUpdateOrderItemOpen && (
              <UpdateOrderItemForm
                isOpen={isUpdateOrderItemOpen}
                onClose={() => setIsUpdateOrderItemOpen(false)}
                orderItemIdToUpdate={editingOrderItemId}
                onOrderItemUpdated={() => {
                  setUpdate(true);
                  setIsUpdateOrderItemOpen(false);
                }}
              />
            )}
    </div>
  );
}
