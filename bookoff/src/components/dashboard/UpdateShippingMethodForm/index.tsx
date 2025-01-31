"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateShippingMethodFormProps {
  isOpen: boolean;
  onClose: () => void;
  onShippingMethodUpdated: () => void;
  shippingMethodIdToUpdate: number | null;
}

export default function UpdateShippingMethodForm({
  isOpen,
  onClose,
  onShippingMethodUpdated,
  shippingMethodIdToUpdate,
}: UpdateShippingMethodFormProps) {
  const [methodName, setMethodName] = useState("");
  const [methodDescription, setMethodDescription] = useState("");
  const [shippingCost, setShippingCost] = useState<number | string>("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch shipping method data
  useEffect(() => {
    if (isOpen && shippingMethodIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/shipping-methods/${shippingMethodIdToUpdate}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMethodName(data.method_name || "");
          setMethodDescription(data.description || "");
          setShippingCost(data.shipping_cost || "");
        })
        .catch((error) => console.error("Error fetching shipping method data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, shippingMethodIdToUpdate, token]);

  // Handle shipping method update
  const handleUpdateShippingMethod = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingMethodIdToUpdate || !methodName.trim() || !shippingCost) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      method_name: methodName,
      description: methodDescription,
      shipping_cost: shippingCost,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/shipping-methods/${shippingMethodIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        onShippingMethodUpdated();
        toast.success("Shipping method updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update shipping method. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating shipping method.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Shipping Method</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateShippingMethod} className="p-6 space-y-6">
            <div>
              <label htmlFor="methodName" className="block mb-2 text-sm">
                Shipping Method Name
              </label>
              <input
                id="methodName"
                type="text"
                value={methodName}
                onChange={(e) => setMethodName(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="methodDescription" className="block mb-2 text-sm">
                Method Description
              </label>
              <textarea
                id="methodDescription"
                value={methodDescription}
                onChange={(e) => setMethodDescription(e.target.value)}
                className="w-full p-3 border rounded-md"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="shippingCost" className="block mb-2 text-sm">
                Shipping Cost
              </label>
              <input
                id="shippingCost"
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
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
