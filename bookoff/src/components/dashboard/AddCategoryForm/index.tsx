"use client";
import { useState } from "react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}

export default function AddCategoryForm({
  isOpen,
  onClose,
  onCategoryAdded,
}: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState(""); // Updated field for description
  const [slug, setSlug] = useState("");
  const [parentCategoryName, setParentCategoryName] = useState<string | null>(null); // Parent category ID, can be null or a number
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleSubmit = async () => {
    if (!categoryName.trim() || !slug.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
        const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/categories", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Add content type if needed
          },
        next: { revalidate: 60 },
        body: JSON.stringify({
          category_name: categoryName,
          description,
          slug,
          parent_category_name: parentCategoryName || null, // Sending parentCategoryName or null if not provided
        }),
      });
       
      if (!response.ok) {
        throw new Error("Failed to add category");
      }else{
        alert("Added category successfully!")
      }


      // On successful category addition
      setCategoryName(""); // Reset form fields
      setDescription("");
      setSlug("");
      setParentCategoryName(null); // Reset parent category
      setSuccessMessage("Category added successfully!");
      onCategoryAdded(); // Call callback to update the UI
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
        onClose(); // Close modal
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the category.");
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Category</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label
              htmlFor="CategoryName"
              className="text-sm font-medium text-gray-600"
            >
              Category Name
            </label>
            <input
              id="CategoryName"
              type="text"
              placeholder="Enter Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="SlugName"
              className="text-sm font-medium text-gray-600"
            >
              Slug
            </label>
            <input
              id="Slug"
              type="text"
              placeholder="Enter Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter Category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="parentCategoryName"
              className="text-sm font-medium text-gray-600"
            >
              Parent Category
            </label>
            <input
              id="parentCategoryName"
              type="text"
              placeholder="Enter Parent Category Name"
              value={parentCategoryName || ""}
              onChange={(e) => setParentCategoryName(e.target.value || null)}
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
              Add Category
            </button>
          </div>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-600 font-medium text-center">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
}
