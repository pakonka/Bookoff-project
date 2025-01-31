"use client";
import Image from "next/image";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import AddProductModal from "@/components/dashboard/AddProductForm";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UpdateProductForm from "@/components/UpdateProductForm";
import { FaStar } from "react-icons/fa";
import { fetchCategories } from "../../api/categoryApi";
import { useRouter } from "next/navigation";


export default function TableProduct() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [categories, setCategories] = useState<{ category_id: number; category_name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorTerm, setAuthorTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<{ category_id: number; category_name: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const handleNavigateToDetails = (productId: number) => {
  router.push(`/dashboard/product-list/${productId}`);
  };

  const handleProductAdded = () => {
    fetchProducts();
    setIsModalOpen(false); // Close modal after product added
  };

    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
        setFilteredCategories(categoryData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

   

    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const productData = await fetch("http://localhost:5000/api/v1/products/details", {
          method: "GET", // or "POST", "PUT", etc. depending on the request
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Add content type if needed
          },
          next: { revalidate: 60 },
        });

        if (!productData.ok) {
          if (productData.status === 403) {
            throw new Error("Không có quyền truy cập"); // Thông báo nếu không có quyền
          }
          throw new Error("Error loading products");
        }

        const data: Product[] = await productData.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    useEffect(() => {
      loadCategories();
      fetchProducts();
    }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategoryTerm(value);
  
    if (value) {
      // Lọc các category dựa trên giá trị tìm kiếm
      const filtered = categories.filter((category) =>
        category.category_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      // Nếu không nhập gì, hiển thị tất cả categories
      setFilteredCategories(categories);
    }
  };

  const handleSelectCategory = (category: { category_id: number; category_name: string }) => {
    setCategoryTerm(category.category_name);
    setFilteredCategories([]); // Đóng danh sách sau khi chọn
    setIsDropdownOpen(false); // Ẩn dropdown
  };

  const handleCategoryClick = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      // Nếu mở dropdown, hiển thị tất cả categories
      setFilteredCategories(categories);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.author_name?.toLowerCase().includes(authorTerm.toLowerCase()) &&
      (categoryTerm ? product.category_name?.toLowerCase() === categoryTerm.toLowerCase() : true)
  );

  const pageCount = Math.ceil(filteredProducts.length / 10);
  const handlePageClick = (selected: number) => {
    setCurrentPage(selected);
  };
  const displayedProducts = filteredProducts.slice(currentPage * 10, (currentPage + 1) * 10);

  const handleDelete = async (productId: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`, // Thêm token vào header
            "Content-Type": "application/json", // Nếu cần gửi dữ liệu JSON
          },
          next: { revalidate: 60 }, // Cấu hình revalidate (nếu bạn đang sử dụng Next.js hoặc tính năng liên quan)
        }
      );
      if (response.ok) {
        console.log(`Deleted product with ID: ${productId}`);
        setProducts(products.filter((product) => product.product_id !== productId));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };



  const handleProductUpdated = () => {
    setEditingProductId(1); // Close update modal
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">Products</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-[14px] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Product
        </button>
      </div>
       {/* Product Statistics */}
    <div className="px-4 py-4 md:px-6 xl:px-7.5 flex flex-wrap gap-4">
      <div className="flex items-center space-x-2">
        <p className="text-[#2550a5] dark:text-white font-medium">All</p>
        <p className="text-[#9c9c9c] dark:text-white">({products.length})</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-[#2550a5] dark:text-white font-medium">On Discount</p>
        <p className="text-[#9c9c9c] dark:text-white">
        ({products.filter((product) => (product.discount_percentage ?? 0) > 0).length || 0})
        </p>
      </div>
    </div>

      {/* Search Inputs */}
    <div className="px-4 py-2 md:px-6 xl:px-7.5">
      <div className="flex flex-wrap items-center gap-4">
    {/* Search by Product Name */}
        <div className="flex-1 md:flex-[0_0_50%]">
      <label>Search by Product Name</label>
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded-lg p-2 w-full mb-2"
      />
    </div>

    {/* Search by Author */}
    <div className="flex-1 md:flex-[0_0_50%]">
      <label>Search by Author</label>
      <input
        type="text"
        placeholder="Search author..."
        value={authorTerm}
        onChange={handleAuthorChange}
        className="border rounded-lg p-2 w-full mb-2"
      />
    </div>

    {/* Search by Category */}
    <div className="flex-1 md:flex-[0_0_50%] relative">
      <label>Search by Category</label>
      <div>
        <input
          type="text"
          value={categoryTerm}
          onChange={handleCategoryChange}
          onClick={handleCategoryClick} // Toggle dropdown visibility on click
          className="border rounded-lg p-2 w-full mb-2"
          placeholder="Select a category"
        />
        <span
          className="absolute right-3 top-2/3 transform -translate-y-2/3 cursor-pointer"
          onClick={handleCategoryClick} // Toggle dropdown when clicking the icon
        >
          {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isDropdownOpen && (
        <ul
          className="absolute z-50 bg-white border border-gray-200 w-full rounded-md"
          style={{
            maxHeight: '150px',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filteredCategories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleSelectCategory(category)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {category.category_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>

      {/* Product List Header */}
      <div className="grid grid-cols-10 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">No.</p>
        </div>
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Author</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rating</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {/* Product List */}
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product: Product, key: number) => (
          <div
            className="grid grid-cols-10 border-t border-stroke px-4 py-8 dark:border-strokedark md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.product_id}</p>
            </div>
            <div
              className="col-span-4 flex items-center cursor-pointer"
              onClick={() => handleNavigateToDetails(product.product_id)}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md flex items-center">
                  <Image
                    src={product.primary_image_url || ""}
                    width={60}
                    height={50}
                    alt={"Product Image"}
                  />
                </div>
                <p className="text-sm text-black dark:text-white truncate w-[300px]">
                  {product.title}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{product.author_name}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{product.category_name}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black flex gap-2 border dark:text-white border-[#ccc] rounded-md px-2 py-1 items-center justify-center">
                <span className="text-[#ddcd36]"><FaStar /></span>{product.average_rating}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white ">{product.price}¥</p>
            </div>
            <div className="col-span-1 flex items-center gap-2">
              <button
                className="text-[#4250cf] border border-[#4250cf] rounded-lg p-2"
                onClick={() => {
                  setEditingProductId(product.product_id);
                  setIsUpdateModalOpen(true);
                }}
              >
                <MdOutlineEdit />
              </button>
              <button
                className="text-[#f24c5c] border border-[#f24c5c] rounded-lg p-2"
                onClick={() => handleDelete(product.product_id)}
              >
                <MdOutlineDelete />
              </button>
            </div>
          </div>
        ))
      )  : (
        <p className="text-center text-black dark:text-white">No products found.</p>
      )}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
       {/* Add New Product Modal */}
       {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      )}
      {/* Update Product Modal */}
      {isUpdateModalOpen && (
        <UpdateProductForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          productId={editingProductId}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}
