"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateBannerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBannerUpdated: () => void;
  bannerIdToUpdate: number | null;
}

export default function UpdateBannerForm({
  isOpen,
  onClose,
  onBannerUpdated,
  bannerIdToUpdate,
}: UpdateBannerFormProps) {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch banner data
  useEffect(() => {
    if (isOpen && bannerIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/banners/${bannerIdToUpdate}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBannerTitle(data.title || "");
          // Assuming the image URL is returned as 'image_url' and needs to be handled in a different way
        })
        .catch((error) => console.error("Error fetching banner data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, bannerIdToUpdate, token]);

  // Handle banner update
  const handleUpdateBanner = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerIdToUpdate || !bannerTitle.trim()) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", bannerTitle);
    if (bannerImage) {
      formData.append("image", bannerImage);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/banners/${bannerIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        onBannerUpdated();
        toast.success("Banner updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update banner. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating banner.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Banner</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateBanner} className="p-6 space-y-6">
            <div>
              <label htmlFor="bannerTitle" className="block mb-2 text-sm">
                Banner Title
              </label>
              <input
                id="bannerTitle"
                type="text"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="bannerImage" className="block mb-2 text-sm">
                Banner Image
              </label>
              <input
                id="bannerImage"
                type="file"
                onChange={(e) => setBannerImage(e.target.files ? e.target.files[0] : null)}
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
