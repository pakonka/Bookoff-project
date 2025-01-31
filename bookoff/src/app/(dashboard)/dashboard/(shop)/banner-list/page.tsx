"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { Banner } from "@/types/banner";
import { token } from "../../utils/getToken";
import Image from "next/image";
import AddBannerForm from "@/components/dashboard/AddBannerForm";
import UpdateBannerForm from "@/components/dashboard/UpdateBannerForm";

export default function TableBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);

  const fetchBanners = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/banners", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (!response.ok) throw new Error("Failed to fetch banners");
      const data: Banner[] = await response.json();
      setBanners(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const filteredBanners = banners.filter((banner) =>
    banner.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBanners.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedBanners = filteredBanners.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (bannerId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/banners/${bannerId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setBanners(banners.filter((banner) => banner.banner_id !== bannerId));
      } else {
        console.error("Failed to delete banner");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">
          Banners
        </h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Banner
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Title</label>
        <input
          type="text"
          placeholder="Search banners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Banner List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-2 flex items-center font-medium">Title</div>
        <div className="col-span-5 flex items-center font-medium">Image</div>
        <div className="col-span-2 flex items-center font-medium">Active</div>
        <div className="col-span-1 flex items-center">Update</div>
        <div className="col-span-1 flex items-center">Delete</div>
      </div>

      {displayedBanners.map((banner, index) => (
        <div
          key={banner.banner_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {banner.title}
          </div>
          <div className="col-span-5 flex items-center text-sm text-black dark:text-white">
            <Image 
                src={banner.image_url}
                alt={banner.title}
                height={60}
                width={1200}
                className="object-cover h-[20px] w-auto" />
          </div>
          <div
            className="col-span-2 flex items-center text-sm text-black dark:text-white"
            style={{
              color: banner.is_active ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {banner.is_active ? "Active" : "Inactive"}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => {
                setEditingBannerId(banner.banner_id);
                setIsUpdateModalOpen(true);
              }}
            >
              <MdOutlineEdit />
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(banner.banner_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add Banner Modal */}
      {isModalOpen && (
        <AddBannerForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBannerAdded={() => {
            fetchBanners();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Update Banner Modal */}
      {isUpdateModalOpen && (
        <UpdateBannerForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          bannerIdToUpdate={editingBannerId}
          onBannerUpdated={() => {
            fetchBanners();
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
