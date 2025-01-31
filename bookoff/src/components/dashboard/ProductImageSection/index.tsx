'use client';

import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import Image from 'next/image';
import { Product, Images } from '@/types/product';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDropzone } from 'react-dropzone';

interface ProductImageSectionProps {
  product: Product;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({ product }) => { 
  const [images, setImages] = useState<Images[]>(
    typeof product.images === 'string' ? JSON.parse(product.images) : product.images
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isPrimary, setIsPrimary] = useState<boolean>(false);
  const [isUrlInput, setIsUrlInput] = useState(false); // Track whether the user wants to input a URL or use file upload

  const handleDeleteConfirmation = (image_id: number, isPrimary: boolean) => {
    confirmAlert({
      message: 'Are you sure you want to delete this image?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleImageDelete(image_id, isPrimary),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Handle deleting image
  const handleImageDelete = async (image_id: number, isPrimary: boolean) => {
    try {
      if (isPrimary) {
        setImages((prev) => prev.filter((image) => !image.is_primary));
      }
      const response = await fetch(`http://localhost:5000/api/v1/product-images/${image_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete image');
      setImages((prev) => prev.filter((image) => image.image_id !== image_id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Handle adding new image via Dropzone or URL input
  const handleAddImage = (isPrimary: boolean) => {
    setNewImageUrl('');
    setIsPrimary(isPrimary);
    setIsModalOpen(true);
  };

  // Handle submitting the image URL
  const handleImageUrlSubmit = async () => {
    if (!newImageUrl.trim()) return;

    try {
      const payload = {
        product_id: product.product_id,
        image_url: newImageUrl,
        alt_text: `Image for ${product.title}`,
        is_primary: isPrimary,
      };
      const response = await fetch('http://localhost:5000/api/v1/product-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Failed to add image: ${response.statusText}`);
      const newImage = await response.json();
      setImages((prev) => [
        ...prev,
        { image_id: newImage.image_id, image_url: newImage.image_url, is_primary: isPrimary },
      ]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  // Handle image drops
  const handleDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImages((prev) => [
          ...prev,
          { image_id: Date.now(), image_url: imageUrl, is_primary: isPrimary },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  const primaryImage = images.find((img) => img.is_primary);

  return (
    <div className="flex flex-wrap gap-6 bg-white mt-10 p-4 rounded-lg shadow-md">
      {/* Primary Image */}
      <div className="w-1/4">
        {primaryImage ? (
          <div className="relative">
            <div className="flex justify-center">
              <Image
                src={primaryImage.image_url}
                width={150}
                height={250}
                alt={product.title}
                className="rounded-lg w-[150px] shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <button
              onClick={() => handleImageDelete(primaryImage.image_id, true)}
              className="absolute top-2 right-2 p-1 bg-[#ca2727] text-white rounded-full shadow-md hover:opacity-90"
            >
              <MdOutlineDelete size={20} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => handleAddImage(true)}
            className="w-[150px] h-[400px] border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100"
          >
            <span className="text-xl">+</span> Add Primary Image
          </div>
        )}
      </div>

      {/* Additional Images */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Images</h2>
        <div className="flex space-x-4">
          {images
            .filter((img) => !img.is_primary)
            .map((image) => (
              <div key={image.image_id} className="relative">
                <Image
                  src={image.image_url}
                  width={120}
                  height={200}
                  alt={product.title}
                  className="rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => handleDeleteConfirmation(image.image_id, image.is_primary)}
                  className="absolute top-2 right-2 p-1 bg-[#ca2727] text-white rounded-full shadow-md hover:opacity-90"
                >
                  <MdOutlineDelete />
                </button>
              </div>
            ))}
          <div
            onClick={() => handleAddImage(false)}
            className="w-[120px] h-[150px] border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100"
          >
            <span className="text-xl">+</span> Add Image
          </div>
        </div>
      </div>

      {/* Modal for URL input */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 bg-[#000000] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Image</h2>
            <div className="mb-4">
              <button
                onClick={() => setIsUrlInput(false)}
                className={`px-4 py-2 w-[180px] border ${!isUrlInput ? 'bg-[#284cc5] text-white' : 'bg-[#ccc]'}`}
              >
                Upload Image
              </button>
              <button
                onClick={() => setIsUrlInput(true)}
                className={`px-4 py-2 w-[150px] ml-4 border ${isUrlInput ? 'bg-[#284cc5] text-white' : 'bg-[#ccc]'}`}
              >
                Enter URL
              </button>
            </div>

            {isUrlInput ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2 border border-[#ccc] rounded-md mb-4"
                />
              </div>
            ) : (
              <div {...getRootProps()} className="border-2 border-dashed p-4 rounded-lg cursor-pointer">
                <input {...getInputProps()} />
                <p>Drag & drop some files here, or click to select files</p>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={isUrlInput ? handleImageUrlSubmit : () => {}}
                className="px-4 py-2 bg-[#284cc5] text-white rounded-lg hover:opacity-90"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageSection;
