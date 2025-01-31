"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { Publisher } from "@/types/publisher";
import { token } from "../../utils/getToken";
import AddPublisherForm from "@/components/dashboard/AddPublisherForm";
import UpdatePublisherForm from "@/components/dashboard/UpdatePublisherForm";

export default function TablePublisher() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingPublisherId, setEditingPublisherId] = useState<number | null>(null);



  const fetchPublishers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/publishers",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch publishers");
      const data: Publisher[] = await response.json();
      setPublishers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.publisher_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPublishers.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedPublishers = filteredPublishers.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (publisherId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/publishers/${publisherId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
        }
      );
      if (response.ok) {
        setPublishers(
          publishers.filter((publisher) => publisher.publisher_id !== publisherId)
        );
      } else {
        console.error("Failed to delete publisher");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">
          Publishers
        </h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Publisher
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Publisher Name</label>
        <input
          type="text"
          placeholder="Search publisher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Publisher List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-4 flex items-center font-medium">Publisher Name</div>
        <div className="col-span-3 flex items-center font-medium">Location</div>
        <div className="col-span-2 flex items-center font-medium">Products</div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Update</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div>
      </div>

      {displayedPublishers.map((publisher, index) => (
        <div
          key={publisher.publisher_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-4 flex items-center text-sm text-black dark:text-white">
            {publisher.publisher_name}
          </div>
          <div className="col-span-3 flex items-center text-sm text-black dark:text-white">
            {publisher.location}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {publisher.total_products || 0}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => {
                setEditingPublisherId(publisher.publisher_id);
                setIsUpdateModalOpen(true);
              }}
            >
              <MdOutlineEdit />
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(publisher.publisher_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add Publisher Modal */}
      {isModalOpen && (
        <AddPublisherForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPublisherAdded={() => {
            fetchPublishers();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Update Publisher Modal */}
      {isUpdateModalOpen && (
        <UpdatePublisherForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          publisherIdToUpdate={editingPublisherId}
          onPublisherUpdated={() => {
            fetchPublishers();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
