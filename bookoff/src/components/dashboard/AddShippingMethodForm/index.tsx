"use client";
import { useState } from "react";

interface AddShippingMethodFormProps {
  isOpen: boolean;
  onClose: () => void;
  onShippingMethodAdded: () => void;
}

export default function AddShippingMethodForm({
  isOpen,
  onClose,
  onShippingMethodAdded,
}: AddShippingMethodFormProps) {
  const [methodName, setMethodName] = useState("");
  const [cost, setCost] = useState<number | string>(""); // Giá phương thức vận chuyển
  const [deliveryTime, setDeliveryTime] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Trạng thái cho thông báo thành công

  const handleSubmit = async () => {
    if (!methodName.trim() || !cost || !deliveryTime.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/shipping-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method_name: methodName,
          cost: cost,
          delivery_time: deliveryTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add shipping method");
      } else {
        alert("Added shipping method successfully");
      }

      // Khi thêm thành công
      setMethodName(""); // Reset form fields
      setCost(""); // Reset form fields
      setDeliveryTime(""); // Reset form fields
      setSuccessMessage("Shipping method added successfully!"); // Hiển thị thông báo thành công
      onShippingMethodAdded(); // Gọi callback để cập nhật giao diện
      setTimeout(() => {
        setSuccessMessage(""); // Xóa thông báo sau 3 giây
        onClose(); // Đóng modal
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the shipping method.");
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Shipping Method</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="methodName" className="text-sm font-medium text-gray-600">
              Shipping Method Name
            </label>
            <input
              id="methodName"
              type="text"
              placeholder="Enter shipping method name"
              value={methodName}
              onChange={(e) => setMethodName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cost" className="text-sm font-medium text-gray-600">
              Shipping Cost
            </label>
            <input
              id="cost"
              type="number"
              placeholder="Enter shipping cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="deliveryTime" className="text-sm font-medium text-gray-600">
              Estimated Delivery Time
            </label>
            <input
              id="deliveryTime"
              type="text"
              placeholder="Enter estimated delivery time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
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
              Add Shipping Method
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
