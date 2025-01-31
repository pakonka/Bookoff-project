"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { User } from "@/types/user";
import Link from "next/link";
import Image from "next/image";
import UpdateUserForm from "@/components/dashboard/UpdateUserForm";
import AddUserForm from "@/components/dashboard/AddUserForm";

export default function TableCustomer() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

    
  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/v1/customers",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Add content type if needed
          },
          next: { revalidate: 60 },
        }
      );
      console.log(response)
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data: User[] = await response.json();
      setUsers(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / 10);
  const handlePageClick = (selected: number) => setCurrentPage(selected);

  const displayedUsers = filteredUsers.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.user_id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">Customers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Customer
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-2">
        <label>Search by Username</label>
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* User List */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-1 flex items-center font-medium"></div>
        <div className="col-span-2 flex items-center font-medium">Username</div>
        <div className="col-span-2 flex items-center font-medium">Email</div>
        <div className="col-span-2 flex items-center font-medium">Phone</div>
        <div className="col-span-2 flex items-center font-medium">Is_active</div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Update</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div>
      </div>

      {displayedUsers.map((user, index) => (
        <div
          
          key={user.user_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <Link href={`/dashboard/customer-list/${user.user_id}`} className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </Link>
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
              <div className="h-12.5 w-15 rounded-md flex items-center">
                  <Image
                      src={user.user_avatar || ""}
                      width={60}
                      height={50}
                      alt={"Product Image"}
                    />
              </div>
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {user.user_name}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {user.email}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {user.phone}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white"
          style={{
            color: user.is_active ? 'green' : 'red', // Màu xanh nếu active, đỏ nếu không
            fontWeight: 'bold'
          }}>
            {user.is_active?'Active' : 'Inactive' }
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => {
                setEditingUserId(user.user_id);
                setIsUpdateModalOpen(true);
              }}
            >
              <MdOutlineEdit />
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(user.user_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

      {/* Add User Modal */}
            {isModalOpen && (
              <AddUserForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserAdded={() => {
                  fetchCustomers();
                  setIsModalOpen(false);
                }}
              />
            )}
      
            {/* Update User Modal */}
            {isUpdateModalOpen && (
              <UpdateUserForm
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                userIdToUpdate={editingUserId}
                onUserUpdated={() => {
                  fetchCustomers();
                  setIsModalOpen(false);
                }}
              />
            )}
    </div>
  );
}
