"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineDelete } from "react-icons/md";
import { token } from "../../utils/getToken";

interface Payment {
  payment_id: number;
  order_id: number;
  payment_date: string;
  payment_method: string;
  amount: number;
  payment_status: string;
}

export default function TablePayment() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (!response.ok) throw new Error("Failed to fetch payments");
      const data: Payment[] = await response.json();
      setPayments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPayments.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedPayments = filteredPayments.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (paymentId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/payments/${paymentId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setPayments(payments.filter((payment) => payment.payment_id !== paymentId));
      } else {
        console.error("Failed to delete payment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">
          Payments
        </h4>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Payment Method</label>
        <input
          type="text"
          placeholder="Search payment method..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Payment List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-2 flex items-center font-medium">Order ID</div>
        <div className="col-span-2 flex items-center font-medium">Date</div>
        <div className="col-span-2 flex items-center font-medium">Method</div>
        <div className="col-span-2 flex items-center font-medium">Amount</div>
        <div className="col-span-2 flex items-center font-medium">Status</div>
        <div className="col-span-1 flex items-center">Delete</div>
      </div>

      {displayedPayments.map((payment, index) => (
        <div
          key={payment.payment_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {payment.order_id}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {new Date(payment.payment_date).toLocaleDateString()}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {payment.payment_method}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            ${payment.amount.toFixed(2)}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {payment.payment_status}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(payment.payment_id)}
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
