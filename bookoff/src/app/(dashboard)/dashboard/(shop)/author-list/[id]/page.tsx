"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Author } from '@/types/author';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

const AuthorDetailsPage = () => {
  const { id } = useParams(); // Get the author ID from URL params
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/authors/${id}`);

          const authorData = await response.json();
          if (authorData && authorData.products && typeof authorData.products === "string") {
            try {
              authorData.products = JSON.parse(authorData.products); // Parse JSON string to array
            } catch (parseError) {
              console.error("Error parsing products JSON:", parseError);
            }
          }

          // Process author items if valid
          if (authorData && Array.isArray(authorData.products)) {
            authorData.products = authorData.products.map((item: Product) => ({
              ...item
            }));
          }

          setAuthor(authorData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching author details:', error);
          setLoading(false);
        }
      }
    };

    fetchAuthorDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!author) {
    return <div>No author found.</div>;
  }

  return (
    <div className="container mx-auto p-6 ">
      <div className="mb-6 bg-white p-8">
        <h1 className="text-3xl font-semibold mb-2">{author.author_name}</h1>
        <p className="text-lg text-gray-700 mb-4">{author.bio}</p>
        <div className="text-sm text-gray-500">
          <p><strong>Date of Birth:</strong> {new Date(author.date_of_birth).toLocaleDateString()}</p>
          <p><strong>Nationality:</strong> {author.nationality}</p>
          <p><strong>Created At:</strong> {new Date(author.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Display Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Products by {author.author_name}</h2>
        {author.products.length === 0 ? (
          <p>No products found for this author.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {author.products.map((product) => (
              <Link href={`/dashboard/product-list/${product.product_id}`} key={product.product_id} className="flex border rounded-lg overflow-hidden shadow-lg bg-white p-4">
                {product.image_url ? (
                    <Image
                    src={product.image_url || ""}
                    width={80}
                    height={130}
                    alt={"Product Image"}
                    className='object-cover p-2'
                  />
                ) : (
                  <div className="h-56 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{product.title}</h3>
                  <p className="text-sm text-gray-600">{new Date(product.release_date).toLocaleDateString()}</p>
                  <p className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
