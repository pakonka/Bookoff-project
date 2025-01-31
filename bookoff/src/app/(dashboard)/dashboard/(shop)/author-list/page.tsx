"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import AddAuthorModal from "@/components/dashboard/AddAuthorForm";
import { Author } from "@/types/author";
import Link from "next/link";
import UpdateAuthorForm from "@/components/dashboard/UpdateAuthorForm";
import { token } from "../../utils/getToken";

export default function TableAuthor() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingAuthorId, setEditingAuthorId] = useState<number | null>(null);


  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/authors",
        {headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },}
      );
      if (!response.ok) throw new Error("Failed to fetch authors");
      const data: Author[] = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const filteredAuthors = authors.filter((author) =>
    author.author_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredAuthors.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedAuthors = filteredAuthors.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (authorId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/authors/${authorId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (response.ok) {
        setAuthors(authors.filter((author) => author.author_id !== authorId));
      } else {
        console.error("Failed to delete author");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
      <h4 className="text-2xl font-semibold text-black dark:text-white">Authors</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Author
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Author Name</label>
        <input
          type="text"
          placeholder="Search author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Author List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-2 flex items-center font-medium">Author Name</div>
        <div className="col-span-7 flex items-center font-medium">Bio</div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Update</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div>
      </div>

      {displayedAuthors.map((author) => (
        <div
          key={author.author_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <Link href={`/dashboard/author-list/${author.author_id}`} className="col-span-1 flex items-center text-sm text-black dark:text-white">{author.author_id}</Link>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">{author.author_name}</div>
          <div className="col-span-7 flex items-center text-sm text-black dark:text-white">{author.bio || "N/A"}</div>
          <div className="col-span-1 flex items-center " onClick={()=> setIsUpdateModalOpen(true)}>
        <button
          className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
          onClick={() => setEditingAuthorId(author.author_id)}
        >
          <MdOutlineEdit/>
        </button>
      </div>
      
      <div className="col-span-1 flex items-center ">
        <button
          className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
          onClick={() => handleDelete(author.author_id)}
        >
          <MdOutlineDelete/>
        </button>
      </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add Author Modal */}
      {isModalOpen && (
        <AddAuthorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAuthorAdded={() => {
            fetchAuthors();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Update Author Modal */}
      {isUpdateModalOpen && (
        <UpdateAuthorForm
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          authorIdToUpdate={editingAuthorId}
          onAuthorUpdated={() => {
            fetchAuthors();
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
