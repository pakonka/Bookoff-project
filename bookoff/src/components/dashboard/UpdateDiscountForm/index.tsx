"use client";
import { formatDateForInput } from "@/app/(dashboard)/dashboard/utils/dateUtils";
import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateDiscountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscountUpdated: () => void;
  discountIdToUpdate: number | null;
}

export default function UpdateDiscountForm({
  isOpen,
  onClose,
  onDiscountUpdated,
  discountIdToUpdate,
}: UpdateDiscountFormProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [loading, setLoading] = useState(true);


  // Fetch discount data
  useEffect(() => {
    if (isOpen && discountIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/discounts/${discountIdToUpdate}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      })
        .then((response) => response.json())
        .then((data) => {
          setDiscountCode(data.discount_code || "");
          setDiscountPercentage(data.discount_percentage || 0);
          setValidFrom(formatDateForInput(data.valid_from) || "");
          setValidUntil(formatDateForInput(data.valid_until) || "");
          setDiscountType(data.discount_type || "");
        })
        .catch((error) => console.error("Error fetching discount data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, discountIdToUpdate]);

  // Validate fields and update discount
  const handleUpdateDiscount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!discountIdToUpdate || !discountCode.trim() || !discountPercentage) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      discount_code: discountCode,
      discount_percentage: discountPercentage,
      valid_from: validFrom,
      valid_until: validUntil,
      discount_type: discountType,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/discounts/${discountIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        onDiscountUpdated();
        toast.success("Discount updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update discount. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating discount.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Discount</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateDiscount} className="p-6 space-y-6">
            <div>
              <label htmlFor="discountCode" className="block mb-2 text-sm">
                Discount Code
              </label>
              <input
                id="discountCode"
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="discountPercentage" className="block mb-2 text-sm">
                Discount Percentage
              </label>
              <input
                id="discountPercentage"
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                required
                min={0}
                max={100}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="validFrom" className="block mb-2 text-sm">
                Valid From
              </label>
              <input
                id="validFrom"
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="validUntil" className="block mb-2 text-sm">
                Valid Until
              </label>
              <input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="discountType" className="block mb-2 text-sm">
                Discount Type
              </label>
              <select
                id="discountType"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="submit" className="px-6 py-2 bg-[#081a52] text-white rounded-md">
                Update
              </button>
              <button type="button" onClick={onClose} className="px-6 py-2 bg-[#ccc] rounded-md">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer position="top-center" className="z-10 fixed text-black" autoClose={1000} />
    </div>
  );
}
