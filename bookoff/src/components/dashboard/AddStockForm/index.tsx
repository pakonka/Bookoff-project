"use client";
import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { useState } from "react";

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStockAdded: () => void;
}

export default function AddStockForm({ isOpen, onClose, onStockAdded }: AddStockModalProps) {
  const [productId, setProductId] = useState("");
  const [location, setLocation] = useState("");
  const [reservedStock, setReservedStock] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (
      !productId.trim() ||
      !location.trim() ||
      !reservedStock.trim() ||
      !availableStock.trim()
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/stocks", {
        method: "POST",
        headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
        body: JSON.stringify({
          product_id: parseInt(productId, 10),
          location,
          reserved_stock: parseInt(reservedStock, 10),
          available_stock: parseInt(availableStock, 10),
          transaction_id: transactionId || null,
          batch_number: batchNumber || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add stock");
      } else {
        alert("Added stock successfully");
      }

      setProductId("");
      setLocation("");
      setReservedStock("");
      setAvailableStock("");
      setTransactionId("");
      setBatchNumber("");
      setSuccessMessage("Stock added successfully!");
      onStockAdded();
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the stock.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Stock</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="productId" className="text-sm font-medium text-gray-600">
              Product ID
            </label>
            <input
              id="productId"
              type="number"
              placeholder="Enter product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
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
            <label htmlFor="reservedStock" className="text-sm font-medium text-gray-600">
              Reserved Stock
            </label>
            <input
              id="reservedStock"
              type="number"
              placeholder="Enter reserved stock"
              value={reservedStock}
              onChange={(e) => setReservedStock(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="availableStock" className="text-sm font-medium text-gray-600">
              Available Stock
            </label>
            <input
              id="availableStock"
              type="number"
              placeholder="Enter available stock"
              value={availableStock}
              onChange={(e) => setAvailableStock(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="transactionId" className="text-sm font-medium text-gray-600">
              Transaction ID
            </label>
            <input
              id="transactionId"
              type="text"
              placeholder="Enter transaction ID (optional)"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="batchNumber" className="text-sm font-medium text-gray-600">
              Batch Number
            </label>
            <input
              id="batchNumber"
              type="text"
              placeholder="Enter batch number (optional)"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
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
              Add Stock
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
