"use client";
import { useState } from "react";

interface AddBannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBannerAdded: () => void;
}

export default function AddBannerForm({ isOpen, onClose, onBannerAdded }: AddBannerFormProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [discountId, setDiscountId] = useState<number | string>(""); // Đảm bảo discountId có thể nhận giá trị số hoặc chuỗi
  const [successMessage, setSuccessMessage] = useState(""); // Trạng thái cho thông báo thành công

  const handleSubmit = async () => {
    if (!title.trim() || !imageUrl.trim() || !discountId) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, image_url: imageUrl, discount_id: discountId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add banner");
      } else {
        alert("Added banner successfully");
      }

      // Khi thêm thành công
      setTitle(""); // Reset form fields
      setImageUrl("");
      setDiscountId(""); // Reset form fields
      setSuccessMessage("Banner added successfully!"); // Hiển thị thông báo thành công
      onBannerAdded(); // Gọi callback để cập nhật giao diện
      setTimeout(() => {
        setSuccessMessage(""); // Xóa thông báo sau 3 giây
        onClose(); // Đóng modal
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the banner.");
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Banner</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-600">
              Banner Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter banner title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-600">
              Banner Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              placeholder="Enter banner image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discountId" className="text-sm font-medium text-gray-600">
              Discount ID
            </label>
            <input
              id="discountId"
              type="number"
              placeholder="Enter discount ID"
              value={discountId}
              onChange={(e) => setDiscountId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
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
              Add Banner
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
