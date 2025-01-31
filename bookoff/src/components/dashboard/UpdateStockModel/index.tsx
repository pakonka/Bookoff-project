"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: () => void;
  stockIdToUpdate: number | null;
}

export default function UpdateStockModal({
  isOpen,
  onClose,
  onStockUpdated,
  stockIdToUpdate,
}: UpdateStockModalProps) {
  const [location, setLocation] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [reservedStock, setReservedStock] = useState("");
  const [productId, setproductId] = useState("");
  const [loading, setLoading] = useState(true);


  // Fetch stock data
  useEffect(() => {
    if (isOpen && stockIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/stocks/${stockIdToUpdate}`)
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.location || "");
          setAvailableStock(data.available_stock?.toString() || "");
          setReservedStock(data.reserved_stock?.toString() || "");
          setproductId(data.product_id);
        })
        .catch((error) => console.error("Error fetching stock data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, stockIdToUpdate]);

  // Validate fields and update stock
  const handleUpdateStock = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Kiểm tra đầy đủ các trường
    if (!stockIdToUpdate || !location.trim() || !availableStock || !reservedStock ) {
      alert("All fields are required.");
      return;
    }
  
    const payload = {
      product_id: productId, // Lấy ID sản phẩm từ prop
      location,
      reserved_stock: Number(reservedStock),
      available_stock: Number(availableStock),
      transaction_id: "", // Gán giá trị từ form hoặc logic khác
      batch_number: "", // Gán giá trị từ form hoặc logic khác
      stock_id: stockIdToUpdate, // Gửi ID stock
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/v1/stocks/${stockIdToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Truyền toàn bộ dữ liệu cần thiết
      });
  
      if (response.ok) {
        onStockUpdated();
        toast.success("Stock updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update stock. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating stock.");
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Stock</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateStock} className="p-6 space-y-6">
            <div>
              <label htmlFor="location" className="block mb-2 text-sm">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="availableStock" className="block mb-2 text-sm">
                Available Stock
              </label>
              <input
                id="availableStock"
                type="number"
                value={availableStock}
                onChange={(e) => setAvailableStock(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="reservedStock" className="block mb-2 text-sm">
                Reserved Stock
              </label>
              <input
                id="reservedStock"
                type="number"
                value={reservedStock}
                onChange={(e) => setReservedStock(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
                min="0"
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
