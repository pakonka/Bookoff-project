"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { token } from "../../utils/getToken";
import AddShippingMethodForm from "@/components/dashboard/AddShippingMethodForm";
import UpdateShippingMethodForm from "@/components/dashboard/UpdateShippingMethodForm";
import { ShippingMethod } from "@/types/shippingMethod";


export default function TableShippingMethod() {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingMethodId, setEditingMethodId] = useState<number | null>(null);


  const fetchShippingMethods = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/shipping-methods", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (!response.ok) throw new Error("Failed to fetch shipping methods");
      const data: ShippingMethod[] = await response.json();
      setShippingMethods(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const filteredMethods = shippingMethods.filter((method) =>
    method.method_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredMethods.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedMethods = filteredMethods.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (methodId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/shipping-methods/${methodId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setShippingMethods(shippingMethods.filter((method) => method.method_id !== methodId));
      } else {
        console.error("Failed to delete shipping method");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">
          Shipping Methods
        </h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Method
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Method Name</label>
        <input
          type="text"
          placeholder="Search shipping method..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Shipping Method List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-4 flex items-center font-medium">Method Name</div>
        <div className="col-span-2 flex items-center font-medium">Cost</div>
        <div className="col-span-3 flex items-center font-medium">Delivery Time</div>
        <div className="col-span-1 flex items-center">Update</div>
        <div className="col-span-1 flex items-center">Delete</div>
      </div>

      {displayedMethods.map((method, index) => (
        <div
          key={method.method_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-4 flex items-center text-sm text-black dark:text-white">
            {method.method_name}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            ${method.cost.toFixed(2)}
          </div>
          <div className="col-span-3 flex items-center text-sm text-black dark:text-white">
            {method.delivery_time}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => {
                setEditingMethodId(method.method_id);
                setIsUpdateModalOpen(true);
              }}
            >
              <MdOutlineEdit />
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(method.method_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add Shipping Method Modal */}
      {isModalOpen && (
        <AddShippingMethodForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShippingMethodAdded={() => {
            fetchShippingMethods();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Update Shipping Method Modal */}
      {isUpdateModalOpen && (
        <UpdateShippingMethodForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          shippingMethodIdToUpdate={editingMethodId}
          onShippingMethodUpdated={() => {
            fetchShippingMethods();
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
