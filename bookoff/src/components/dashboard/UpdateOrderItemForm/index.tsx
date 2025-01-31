"use client";

import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateOrderItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderItemUpdated: () => void;
  orderItemIdToUpdate: number | null;
}

export default function UpdateOrderItemForm({
  isOpen,
  onClose,
  onOrderItemUpdated,
  orderItemIdToUpdate,
}: UpdateOrderItemFormProps) {
  const [productId, setProductId] = useState<number | null>(null);
  const [priceAtPurchase, setPriceAtPurchase] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [discountCode, setDiscountCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch order item data
  useEffect(() => {
    if (isOpen && orderItemIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/order-items/${orderItemIdToUpdate}`, {
        headers: {
          "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      })
        .then((response) => response.json())
        .then((data) => {
          setProductId(data.product_id || null);
          setPriceAtPurchase(data.price_at_purchase?.toString() || "");
          setQuantity(data.quantity || null);
          setDiscountCode(data.discount_code || null);
        })
        .catch((error) => console.error("Error fetching order item data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, orderItemIdToUpdate]);

  // Validate and update order item
  const handleUpdateOrderItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderItemIdToUpdate || !productId || !quantity || !priceAtPurchase.trim()) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      product_id: productId,
      price_at_purchase: parseFloat(priceAtPurchase),
      quantity,
      discount_code: discountCode,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/order-items/${orderItemIdToUpdate}`,
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
        onOrderItemUpdated();
        toast.success("Order item updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update order item. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the order item.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Order Item</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateOrderItem} className="p-6 space-y-6">
            <div>
              <label htmlFor="productId" className="block mb-2 text-sm">
                Product ID
              </label>
              <input
                id="productId"
                type="number"
                value={productId || ""}
                onChange={(e) => setProductId(parseInt(e.target.value))}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="priceAtPurchase" className="block mb-2 text-sm">
                Price at Purchase
              </label>
              <input
                id="priceAtPurchase"
                type="text"
                value={priceAtPurchase}
                onChange={(e) => setPriceAtPurchase(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-2 text-sm">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="discountCode" className="block mb-2 text-sm">
                Discount Code
              </label>
              <input
                id="discountCode"
                type="number"
                value={discountCode || ""}
                onChange={(e) => setDiscountCode(parseInt(e.target.value))}
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
