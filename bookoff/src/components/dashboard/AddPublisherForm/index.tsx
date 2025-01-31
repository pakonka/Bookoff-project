"use client";
import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { useState } from "react";

interface AddPublisherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublisherAdded: () => void;
}

export default function AddPublisherForm({ isOpen, onClose, onPublisherAdded }: AddPublisherModalProps) {
  const [publisherName, setPublisherName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Trạng thái cho thông báo thành công

  const handleSubmit = async () => {
    if (!publisherName.trim() || !location.trim() || !description.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/publishers", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
        body: JSON.stringify({
          publisher_name: publisherName,
          location,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add publisher");
      } else {
        alert("Added publisher successfully");
      }

      // Khi thêm thành công
      setPublisherName(""); // Reset form fields
      setLocation("");
      setDescription("");
      setSuccessMessage("Publisher added successfully!"); // Hiển thị thông báo thành công
      onPublisherAdded(); // Gọi callback để cập nhật giao diện
      setTimeout(() => {
        setSuccessMessage(""); // Xóa thông báo sau 3 giây
        onClose(); // Đóng modal
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the publisher.");
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Publisher</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="publisherName" className="text-sm font-medium text-gray-600">
              Publisher Name
            </label>
            <input
              id="publisherName"
              type="text"
              placeholder="Enter publisher name"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#ccc] text-gray-700 rounded-md hover:opacity-90 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#244aef] text-white rounded-md hover:opacity-90 transition"
            >
              Add Publisher
            </button>
          </div>
        </form>
        {successMessage && (
          <p className="mt-4 text-green-600 font-medium text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
}
