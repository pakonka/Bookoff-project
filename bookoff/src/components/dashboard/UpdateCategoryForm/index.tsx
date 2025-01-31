"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryUpdated: () => void;
  categoryIdToUpdate: number | null;
}

export default function UpdateCategoryForm({
  isOpen,
  onClose,
  onCategoryUpdated,
  categoryIdToUpdate,
}: UpdateCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [loading, setLoading] = useState(true);



  const token = localStorage.getItem("token");
  // Fetch category data
  useEffect(() => {
    if (isOpen && categoryIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/categories/${categoryIdToUpdate}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json", // Add content type if needed
              },
            next: { revalidate: 60 },}
      )
        .then((response) => response.json())
        .then((data) => {
          setCategoryName(data.category_name || "");
          setDescription(data.description || "");
          setSlug(data.slug || "");
          setParentCategoryName(data.parent_category_name || "");
        })
        .catch((error) => console.error("Error fetching category data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, categoryIdToUpdate, token]);

  // Validate fields and update category
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are filled
    if (!categoryIdToUpdate || !categoryName.trim()) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      category_name: categoryName,
      description: description,
      parent_category_name: parentCategoryName,
      slug: slug,
    //   updated_by: 1, // Replace with logged-in user ID
    };

    try {
      
      const response = await fetch(`http://localhost:5000/api/v1/categories/${categoryIdToUpdate}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Add content type if needed
          },
        next: { revalidate: 60 },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onCategoryUpdated();
        toast.success("Category updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update category. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating category.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Category</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateCategory} className="p-6 space-y-6">
            <div>
              <label htmlFor="categoryName" className="block mb-2 text-sm">
                Category Name
              </label>
              <input
                id="categoryName"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block mb-2 text-sm">
                Slug
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            {parentCategoryName && (
                <div>
                <label htmlFor="parentCategoryName" className="block mb-2 text-sm">
                  Parent Category Name
                </label>
                <input
                  id="parentCategoryName"
                  type="text"
                  value={parentCategoryName}
                  onChange={(e) => setParentCategoryName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
            )}
            <div>
              <label htmlFor="description" className="block mb-2 text-sm">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-md"
                rows={4}
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
