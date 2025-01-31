"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
// import AddDiscountModal from "@/components/dashboard/AddDiscountModal";  // Tạo modal cho thêm discount
import { Discount } from "@/types/discount";  // Interface discount
import { token } from "../../utils/getToken";
import AddDiscountForm from "@/components/dashboard/AddDiscountForm";
import UpdateDiscountForm from "@/components/dashboard/UpdateDiscountForm";

export default function TableDiscount() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(null);



  const fetchDiscounts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/discounts",
        {
          headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                next: { revalidate: 60 },}
      );
      if (!response.ok) throw new Error("Failed to fetch discounts");
      const data: Discount[] = await response.json();
      setDiscounts(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDiscounts();
  }, []);

  const filteredDiscounts = discounts.filter((discount) =>
    discount.discount_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredDiscounts.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedDiscounts = filteredDiscounts.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (discountId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/discounts/${discountId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDiscounts(discounts.filter((discount) => discount.discount_id !== discountId));
      } else {
        console.error("Failed to delete discount");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">Discounts</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Discount
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Discount Code</label>
        <input
          type="text"
          placeholder="Search discount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Discount List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-3 flex items-center font-medium">Discount Code</div>
        <div className="col-span-2 flex items-center font-medium">Discount Percentage</div>
        <div className="col-span-2 flex items-center font-medium">Discount Type</div>
        <div className="col-span-2 flex items-center font-medium">Active</div>
        <div className="col-span-1 flex items-center">Update</div>
        <div className="col-span-1 flex items-center">Delete</div>
      </div>

      {displayedDiscounts.map((discount, index) => (
        <div
          key={discount.discount_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-3 flex items-center text-sm text-black dark:text-white">
            {discount.discount_code}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {discount.discount_percentage}%
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {discount.discount_type}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white" style={{
            color: discount.active ? 'green' : 'red', // Màu xanh nếu active, đỏ nếu không
            fontWeight: 'bold'
          }}>
            {discount.active?'Active' : 'Inactive' }
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => {
                setEditingDiscountId(discount.discount_id);
                setIsUpdateModalOpen(true);
              }}
            >
              <MdOutlineEdit />
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(discount.discount_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add Discount Modal */}
      {isModalOpen && (
        <AddDiscountForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDiscountAdded={() => {
            fetchDiscounts();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Update Discount Modal */}
      {isUpdateModalOpen && (
        <UpdateDiscountForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          discountIdToUpdate={editingDiscountId}
          onDiscountUpdated={() => {
            fetchDiscounts();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
