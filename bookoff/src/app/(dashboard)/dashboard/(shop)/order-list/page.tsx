"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { Order } from "@/types/order";
import { getStatusClass } from "../../utils/getStatusClass";
import Link from "next/link";

export default function TableOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [editingOrderId, setEditingOrderId] = useState(0);

  console.log(isModalOpen)
  const token = localStorage.getItem("token");
  // Callback function to close modal after order is added
//   const handleOrderAdded = () => {
//     setIsModalOpen(false);  // Close modal after order added
//     // Optionally, refresh the order list here if needed
//     // fetchOrders();
//   };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
       
        const response = await fetch("http://localhost:5000/api/v1/orders", {
          method: "GET", // Nếu bạn cần GET request, nếu POST thì cần thay "GET" bằng "POST"
          headers: {
            "Authorization": `Bearer ${token}`, // Thêm token vào header
            "Content-Type": "application/json", // Nếu cần gửi dữ liệu JSON
          },
          next: { revalidate: 60 }, // Cấu hình revalidate (nếu bạn đang sử dụng Next.js hoặc tính năng liên quan)
        });
        
        if (!response.ok) {
          throw new Error("Error loading orders");
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [token]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredOrders.length / 10);
  const handlePageClick = (selected: number) => {
    setCurrentPage(selected);
  };
  const displayedOrders = filteredOrders.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  // Handle delete order
  const handleDelete = async (orderId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Thêm token vào header
          "Content-Type": "application/json", // Nếu cần gửi dữ liệu JSON
        },
        next: { revalidate: 60 }, // Cấu hình revalidate (nếu bạn đang sử dụng Next.js hoặc tính năng liên quan)
      });
      if (response.ok) {
        setOrders(orders.filter((order) => order.order_id !== orderId));
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Handle order update (called from UpdateOrderForm)
//   const handleOrderUpdated = () => {
//     setIsUpdateModalOpen(false);  // Close the editing modal
//   };


  
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">Orders</h4>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-[14px] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Order
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2 md:px-6 xl:px-7.5">
        <label>Search by Customer Name</label>
        <input
          type="text"
          placeholder="Search order..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 w-full mb-2"
        />
      </div>

      {/* Order List Header */}
      <div className="grid grid-cols-11 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">No.</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Customer Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Total Amount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Edit</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div>
      </div>

      {/* Order List */}
      {displayedOrders.length > 0 ? (
        displayedOrders.map((order, index) => (
          <div
            className="grid grid-cols-11 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={index}
          >
            <Link href={`/dashboard/order-list/${order.order_id}`} className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{order.order_id}</p>
            </Link>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">{order.customer_name}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">{order.total_amount}¥</p>
            </div>
            <div className="col-span-1 flex items-center ">
                <p className={`text-sm px-2 py-1 rounded-md ${getStatusClass(order.order_status)}`}>
                     {order.order_status}
                </p>
             </div>
            <Link href={`/dashboard/order-list/${order.order_id}`} className="col-span-1 flex items-center">
              <button
                className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              >
                <MdOutlineEdit />
              </button>
            </Link>
            <div className="col-span-1 flex items-center">
              <button
                className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
                onClick={() => handleDelete(order.order_id)}
              >
                <MdOutlineDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No orders available.</div>
      )}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add New Order Modal */}
      {/* {isModalOpen && (
        <AddOrderModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onOrderAdded={handleOrderAdded} 
        />
      )} */}

      {/* Update Order Modal */}
      {/* {isUpdateModalOpen && (
        <UpdateOrderForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          orderId={editingOrderId} 
          onOrderUpdated={handleOrderUpdated} 
        />
      )} */}
    </div>
  );
}
