"use client";
import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { useState } from "react";

interface AddDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscountAdded: () => void;
}

export default function AddDiscountForm({ isOpen, onClose, onDiscountAdded }: AddDiscountModalProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [active, setActive] = useState(true);
  const [discountType, setDiscountType] = useState("percentage");
  const [requiredQuantity, setRequiredQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (
      !discountCode.trim() ||
      !discountPercentage.trim() ||
      !discountType.trim() ||
      !requiredQuantity.trim()
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/discounts", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
        body: JSON.stringify({
          discount_code: discountCode,
          discount_percentage: parseFloat(discountPercentage),
          valid_from: validFrom || null,
          valid_until: validUntil || null,
          active,
          discount_type: discountType,
          required_quantity: parseInt(requiredQuantity, 10),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add discount");
      } else {
        alert("Added discount successfully");
      }

      setDiscountCode("");
      setDiscountPercentage("");
      setValidFrom("");
      setValidUntil("");
      setActive(true);
      setDiscountType("percentage");
      setRequiredQuantity("");
      setSuccessMessage("Discount added successfully!");
      onDiscountAdded();
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the discount.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Discount</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="discountCode" className="text-sm font-medium text-gray-600">
              Discount Code
            </label>
            <input
              id="discountCode"
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discountPercentage" className="text-sm font-medium text-gray-600">
              Discount Percentage
            </label>
            <input
              id="discountPercentage"
              type="number"
              step="0.01"
              placeholder="Enter discount percentage"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="validFrom" className="text-sm font-medium text-gray-600">
              Valid From
            </label>
            <input
              id="validFrom"
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="validUntil" className="text-sm font-medium text-gray-600">
              Valid Until
            </label>
            <input
              id="validUntil"
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="active" className="text-sm font-medium text-gray-600">
              Active
            </label>
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="discountType" className="text-sm font-medium text-gray-600">
              Discount Type
            </label>
            <select
              id="discountType"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="requiredQuantity" className="text-sm font-medium text-gray-600">
              Required Quantity
            </label>
            <input
              id="requiredQuantity"
              type="number"
              placeholder="Enter required quantity"
              value={requiredQuantity}
              onChange={(e) => setRequiredQuantity(e.target.value)}
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
              Add Discount
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
