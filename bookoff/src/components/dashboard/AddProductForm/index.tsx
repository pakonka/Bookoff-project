"use client";

import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { axiosClient } from '@/libs/axiosClient';
import { generateRandomSKU } from '@/app/(dashboard)/dashboard/utils/genarateRadom';
import { NewProduct } from '@/types/product';
import { fetchCategories } from '@/app/(dashboard)/dashboard/api/categoryApi';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded:() => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded
}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<NewProduct>();
  const [categories, setCategories] = useState<{ category_name: string; category_id: number }[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<{ category_name: string; category_id: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [images, setImages] = useState<{ image_url: string; is_primary: boolean }[]>([]); // State to handle images

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
        setFilteredCategories(categoryData);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setValue('category_name', term); // Đồng bộ giá trị cho react-hook-form
    setFilteredCategories(
      categories.filter((category) =>
        category.category_name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSelectCategory = (category: { category_name: string; category_id: number }) => {
    setValue('category_name', category.category_name, { shouldValidate: true }); // Cập nhật giá trị category_name
    setSearchTerm(category.category_name); // Hiển thị tên danh mục trong ô input
    setFilteredCategories([]); // Ẩn danh sách danh mục sau khi chọn
  };
  
  


  const handleAddImage = (image_url: string, is_primary: boolean) => {
    if (!image_url.trim()) return; 
    const newImage = { image_url, is_primary };
    setImages((prevImages) => [...prevImages, newImage]);
    setValue('images', [...images, newImage]); // Update form data with the new image
  };

  const handleRemoveImage = (image_url: string) => {
    setImages((prevImages) => prevImages.filter(image => image.image_url !== image_url));
    setValue('images', images.filter(image => image.image_url !== image_url)); // Update form data
  };

  if (!isOpen) return null;

  if (loading) {
    console.log("Add product form is loading!");
  }

  if (error) {
    console.log("Add product form is error!", error);
  }

  // const fetchIdByName = async (name: string, endpoint: string, key: string) => {
  //   try {
  //     const response = await axiosClient.get(`http://localhost:5000/api/v1/${endpoint}`);
      
  //     // Tìm trong mảng 'response.data', nơi mỗi phần tử là một đối tượng
  //     // Tìm đối tượng mà trong đó trường 'key' có giá trị bằng 'name'
  //     const item = response.data.find((item: { [key: string]: string }) => item[key] === name);
  
  //     // console.log("item", item,"key",key,"name",name,"endid",endpointId,"id",item.endpointId); // item là đối tượng được tìm thấy, hoặc 'undefined' nếu không tìm thấy
  
  //     return item ? (item.publisher_id ?  item.publisher_id: item.author_id ): null; // Trả về 'id' nếu tìm thấy đối tượng, hoặc null nếu không tìm thấy
  //   } catch (error) {
  //     console.error(`Error fetching ID for ${name} from ${endpoint}:`, error);
  //     return null; // Trả về null trong trường hợp có lỗi
  //   }
  // };
  

  // Main handler function to add a product
  const handleAddProduct = async (data: NewProduct) => {
    console.log(data)
    try {
      // Fetch the IDs directly based on the names provided in `data`
      // const author_id = await fetchIdByName(data.author_name, 'authors', 'author_name');
      // const publisher_id = await fetchIdByName(data.publisher_name, 'publishers', 'publisher_name');
      // const category_id = data.category_id; // Assuming category_id is directly available in the data
  
      // console.log(author_id, publisher_id, category_id);
  
      // // Check if any IDs are missing before proceeding
      // if (!category_id || !author_id || !publisher_id) {
      //   console.error('Missing IDs for category, author, or publisher');
      //   return;
      // }
    
      // console.log("slug",data.slug)
    // Create product API call with IDs
    const productResponse = await axiosClient.post('http://localhost:5000/api/v1/products/create', {
      category_name: data.category_name,
      author_name: data.author_name,
      publisher_name: data.publisher_name,
      title: data.title,
      slug: data.slug,
      release_date: data.release_date,
      description: data.description,
      price: data.price,
      discount_code: data.discount_code, // Assume discount_id comes from discount_code mapping
      available_stock: data.available_stock,
      SKU: generateRandomSKU() // Function to generate SKU if needed
    });
    
    let productId = productResponse.data.product_id || null;

// Nếu product_id không có, thử lấy thông tin sản phẩm từ slug
if (!productId) {
  console.log("product_id is missing, using slug to fetch product...");

  const slug = productResponse.data.slug; // Lấy slug từ response

  try {
    // Gọi API để lấy thông tin sản phẩm từ slug
    const response = await axiosClient.get(`http://localhost:5000/api/v1/products/slug/${slug}`);
    
    // Kiểm tra nếu response trả về dữ liệu
    if (response.data && response.data.product_id) {
      productId = response.data.product_id;
      console.log("Found product_id from slug:", productId);
    } else {
      console.log("No product found for slug:", slug);
    }
  } catch (error) {
    console.error("Error fetching product_id from slug:", error);
  }
}


      // Create images API calls for each image
      for (const image of data.images) {
        await axiosClient.post('http://localhost:5000/api/v1/product-images', {
          product_id: productId,
          image_url: image.image_url,
          is_primary: image.is_primary,
        });
      }
  
      // Create stock API call
      await axiosClient.post('http://localhost:5000/api/v1/stocks', {
        product_id: productId,
        location: 'default_location', // Update this as needed
        reserved_stock: 0, // Default or computed value
        available_stock: data.available_stock,
        transaction_id: 'generated_transaction_id', // Generate or pass a real transaction ID
        batch_number: 'batch001', // Example batch number
      });
  
  
      // Once the product is created and all related data (images, stock, author) is set, close the modal
  
      alert('Product added successfully!');
      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error adding the product. Please try again.');
    }
  };
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center transition-opacity z-[4050] duration-300`}>
      <div className={`bg-white w-[800px] mx-4 sm:mx-8 relative transform transition-transform duration-300 z-[4050] scale-100`}>
        <div className="no-scroll flex justify-between text-[#fff] items-center p-6 sm:p-6 md:p-8 mb-6 bg-[#1c2434]">
          <h2 className="text-[18px] sm:text-[20px] md:text-[24px]">Add New Product</h2>
          <button onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <form className="space-y-4 px-4 sm:px-6 md:px-8 pb-6" onSubmit={handleSubmit(handleAddProduct)}
          style={{
            maxHeight: '500px',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
          <div>
            <label className="text-[#1c2434]">Product Name</label>
            <input
              type="text"
              {...register('title', { required: 'Product Name is required' })}
              className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
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
                {...register('category_name', { required: 'Category is required' })} // Validation
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  if (!searchTerm) setTimeout(() => setIsFocused(false), 200);
                }}
                className={`w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md ${errors.category_name ? 'border-red-500' : ''}`}
            />
            {errors.category_name && <span className="text-red-500">{errors.category_name.message}</span>}

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
          <div>
            <label className="text-[#1c2434]">Image URL</label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter image URL"
                onBlur={(e) => handleAddImage(e.target.value, true)} // Primary image
                className="w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md"
              />
              <input
                type="text"
                placeholder="Enter additional image URL"
                onBlur={(e) => handleAddImage(e.target.value, false)} // Additional image
                className="w-full py-1 px-3 bg-[#fff] border-[#ccc] border rounded-md"
              />
            </div>
            {images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-[#1c2434]">Added Images:</h3>
                <ul>
                  {images.map((image, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{image.image_url}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.image_url)}
                        className="text-red-500"
                      >
                        <IoMdClose/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-6 w-full flex justify-center">
            <button
              type="submit"
              className=" py-2 px-4 bg-[#4CAF50] text-white rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
