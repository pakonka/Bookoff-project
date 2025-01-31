"use client";
import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdatePublisherFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPublisherUpdated: () => void;
  publisherIdToUpdate: number | null;
}

export default function UpdatePublisherForm({
  isOpen,
  onClose,
  onPublisherUpdated,
  publisherIdToUpdate,
}: UpdatePublisherFormProps) {
  const [publisherName, setPublisherName] = useState("");
  const [address, setAddress] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(true);


  // Fetch publisher data
  useEffect(() => {
    if (isOpen && publisherIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/publishers/${publisherIdToUpdate}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      })
        .then((response) => response.json())
        .then((data) => {
          setPublisherName(data.publisher_name || "");
          setAddress(data.address || "");
          setContactInfo(data.contact_info || "");
        })
        .catch((error) => console.error("Error fetching publisher data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, publisherIdToUpdate]);

  // Validate fields and update publisher
  const handleUpdatePublisher = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publisherIdToUpdate || !publisherName.trim() || !address.trim()) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      publisher_name: publisherName,
      address: address,
      contact_info: contactInfo,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/publishers/${publisherIdToUpdate}`,
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
        onPublisherUpdated();
        toast.success("Publisher updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update publisher. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating publisher.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Publisher</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdatePublisher} className="p-6 space-y-6">
            <div>
              <label htmlFor="publisherName" className="block mb-2 text-sm">
                Publisher Name
              </label>
              <input
                id="publisherName"
                type="text"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm">
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border rounded-md"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="contactInfo" className="block mb-2 text-sm">
                Contact Info
              </label>
              <input
                id="contactInfo"
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
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
