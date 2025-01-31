"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { CategoryDetail } from "@/types/categories";
import { fetchCategories } from "../../api/categoryApi";
import AddCategoryForm from "@/components/dashboard/AddCategoryForm";
import UpdateCategoryForm from "@/components/dashboard/UpdateCategoryForm";

export default function TableCategory() {
  const [categories, setCategories] = useState<CategoryDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [editingCategoryId, setEditingCategoryId] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  

  console.log(editingCategoryId,isUpdateModalOpen)

  // Fetch categories from the API
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/categories/sub-category",
          {
            method: "GET", // or "POST", "PUT", etc. depending on the request
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json", // Add content type if needed
            },
            next: { revalidate: 60 },
          }
        );
        if (!response.ok) {
          throw new Error("Error loading categories");
        }
        const data: CategoryDetail[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories based on the search term
  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredCategories.length / itemsPerPage);
  const displayedCategories = filteredCategories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (selected: number) => {
    setCurrentPage(selected);
  };

  const handleDelete = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json", // Add content type if needed
        },
        next: { revalidate: 60 },
      });
      if (response.ok) {
        console.log(`Deleted product with ID: ${categoryId}`);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">Categories</h4>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1c2434] text-[14px] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 md:px-6 xl:px-7.5">
        <label>Search by Category Name</label>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 w-full mb-2"
        />
      </div>

      {/* Category Table Header */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">No.</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Category Name</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Description</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Parent Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Total Product</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Update</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div>
      </div>

      {/* Category Table Rows */}
      {displayedCategories.length > 0 ? (
        displayedCategories.map((category, index) => (
          <div
            key={category.category_id}
            className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
          >
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {currentPage * itemsPerPage + index + 1}
              </p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {category.category_name}
              </p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {category.description}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {category.parent_category_name || "None"}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {category.total_products}
              </p>
            </div>
            <div className="col-span-1 flex items-center " onClick={()=> setIsUpdateModalOpen(true)}>
        <button
          className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
          onClick={() => setEditingCategoryId(category.category_id)}
        >
          <MdOutlineEdit/>
        </button>
      </div>
      
      <div className="col-span-1 flex items-center ">
        <button
          className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
          onClick={() => handleDelete(category.category_id)}
        >
          <MdOutlineDelete/>
        </button>
      </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">No categories found.</div>
      )}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
       {/* Add New Product Modal */}
       {isAddModalOpen && (
        <AddCategoryForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCategoryAdded={() => {
            fetchCategories();
            setIsAddModalOpen(false);
          }}
        />
      )}
      {/* Update Product Modal */}
      {isUpdateModalOpen && (
        <UpdateCategoryForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          categoryIdToUpdate={editingCategoryId}
          onCategoryUpdated={() => {
            fetchCategories();
            setIsAddModalOpen(false);
          }
          }

        />
      )}
    </div>
  );
}
