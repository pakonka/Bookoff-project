"use client";

import React, { useEffect, useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { axiosClient } from "@/libs/axiosClient";
import { UpdateProduct } from "@/types/product";
import { formatDateForInput } from "@/app/(dashboard)/dashboard/utils/dateUtils";


interface UpdateProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    onProductUpdated: (updatedProduct: UpdateProduct) => void; // Change to accept updated product details
  }

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  isOpen,
  onClose,
  productId,
  onProductUpdated,
}) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<UpdateProduct>();
  const [categories, setCategories] = useState<{ category_name: string; category_id: number }[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<{ category_name: string; category_id: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("http://localhost:5000/api/v1/categories/sub-category");
        setCategories(res.data);
        setFilteredCategories(res.data);
        console.log("fetch data category!")
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const handleSelectCategory = (category: { category_name: string; category_id: number }) => {
    // setValue('category_id', category.category_id); // Set category_id directly
    setSearchTerm(category.category_name);
    setFilteredCategories([]); // Clear the dropdown after selection
  };

  
  // Fetch product details
  const fetchProductDetails = useCallback(async () => {
    try {
      const res = await axiosClient.get(`http://localhost:5000/api/v1/products/details/${productId}`);
      const product = res.data[0];

      setValue("product_id", product.product_id);
      setValue("title", product.title);
      setValue("author_name", product.author_name);
      setValue("category_name", product.category_name);
      setSearchTerm(product.category_name)
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("slug", product.slug);
      setValue("release_date", formatDateForInput(product.release_date) );
      setValue("publisher_name", product.publisher_name);
      setValue("discount_code", product.discount_code);
      setValue("discount_percentage", product.discount_percentage)
      setValue("available_stock", product.available_stock);


      console.log("fetch data product!",product)
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }, [productId, setValue]);

  useEffect(() => {
    if (isOpen && productId) {
      fetchProductDetails();
    } else {
      reset();
    }
  }, [isOpen, productId, fetchProductDetails, reset]);

  // Handle updating product
  const handleUpdateProduct = async (data: UpdateProduct) => {
    console.log("data",data)
    try {
      const updatedProduct = {data}; // Include the updated images as well
      
      await axiosClient.put(`http://localhost:5000/api/v1/products/update/${data.product_id}`, updatedProduct);
      
  
      alert("Product updated successfully!");
      onProductUpdated(data); // Pass the updated product
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // Other helper functions (similar to AddProductForm)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredCategories(
      categories.filter((category) =>
        category.category_name.toLowerCase().includes(term.toLowerCase())
      )
    );
    setValue("category_id", 0);
  };




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center transition-opacity z-[4050] duration-300">
      <div className="bg-white w-[800px] mx-4 sm:mx-8 relative transform transition-transform duration-300 z-[4050] scale-100">
        <div className="flex justify-between items-center p-6 bg-[#1c2434] text-white">
          <h2 className="text-lg">Update Product</h2>
          <button onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <form
          className="space-y-4 p-6"
          onSubmit={handleSubmit(handleUpdateProduct)}
          style={{
            maxHeight: '500px',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Form fields similar to AddProductForm */}
          <div>
            <label className="text-[#1c2434]">Product Name</label>
            <input type="text" {...register("title", { required: "Product Name is required" })}  className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.publisher_name ? 'border-red-500' : ''}`}/>
          </div>
          <div>
            <label className="text-[#1c2434]">Product Slug</label>
            <input
              type="text"
              {...register('slug')}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.slug ? 'border-red-500' : ''}`}
            />
          </div>
          <div>
            <label className="text-[#1c2434]">Author Name</label>
            <input
              type="text"
              {...register('author_name', { required: 'Author Name is required' })}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.author_name ? 'border-red-500' : ''}`}
            />
            {errors.author_name && <span className="text-red-500">{errors.author_name.message}</span>}
          </div>
          <div className="relative">
            <label className="text-[#1c2434]">Category</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md"
            />
            {isFocused && filteredCategories.length > 0 && (
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
          <div>
            <label className="text-[#1c2434]">Description</label>
            <textarea
              {...register('description')}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div>
            <label className="text-[#1c2434]">Price</label>
            <input
              type="number"
              {...register('price', { required: 'Price is required', valueAsNumber: true })}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </div>
          <div>
            <label className="text-[#1c2434]">Release Date</label>
            <input
              type="date"
              {...register('release_date', { required: 'Release Date is required' })}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.release_date ? 'border-red-500' : ''}`}
            />
            {errors.release_date && <span className="text-red-500">{errors.release_date.message}</span>}
          </div>
          <div>
            <label className="text-[#1c2434]">Publisher Name</label>
            <input
              type="text"
              {...register('publisher_name', { required: 'Publisher Name is required' })}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.publisher_name ? 'border-red-500' : ''}`}
            />
            {errors.publisher_name && <span className="text-red-500">{errors.publisher_name.message}</span>}
          </div>
          <div>
            <label className="text-[#1c2434]">Discount Code</label>
            <input
              type="text"
              {...register('discount_code')}
              className="w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md"
            />
          </div>
          <div>
            <label className="text-[#1c2434]">Discount Percentage</label>
            <input
              type="number"
              {...register('discount_percentage', { min: 0, max: 100 })}
              className="w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md"
            />
          </div>
          <div>
            <label className="text-[#1c2434]">Available Stock</label>
            <input
              type="number"
              {...register('available_stock', { required: 'Stock is required' })}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.available_stock ? 'border-red-500' : ''}`}
            />
            {errors.available_stock && <span className="text-red-500">{errors.available_stock.message}</span>}
          </div>
          <button type="submit" className="bg-[#4250cf] text-white py-2 px-4 rounded">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
