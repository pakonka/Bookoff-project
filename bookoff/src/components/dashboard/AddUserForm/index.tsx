"use client";
import { useState } from "react";

interface AddUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export default function AddUserForm({ isOpen, onClose, onUserAdded }: AddUserFormProps) {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    role_name: "",
    occupation: "",
    gender: "",
    user_avatar:"",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["user_name", "email", "password", "address", "city", "postal_code"];
    const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]?.trim());

    if (emptyFields.length) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      alert("User added successfully!");

      // Reset the form
      setFormData({
        user_name: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postal_code: "",
        role_name: "",
        occupation: "",
        gender: "",
        user_avatar: "",
      });
      setSuccessMessage("User added successfully!");
      onUserAdded();

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the user.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-[800px] mx-4 sm:mx-8 relative transform transition-transform duration-300 z-[4050] scale-100">
        <h2 className="no-scroll flex justify-between text-[#fff] items-center p-6 sm:p-6 md:p-8 bg-[#1c2434] text-[18px]">Add User</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{
            maxHeight: '500px',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="user_name" className="text-sm font-medium text-gray-600">
              User Name
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              placeholder="Enter user name"
              value={formData.user_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="role_name" className="text-sm font-medium text-gray-600">
              Role
            </label>
            <select
              id="role_name"
              name="role_name"
              value={formData.role_name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Role</option> 
              <option value="Admin">Admin</option>  
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-600">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country" className="text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="postal_code" className="text-sm font-medium text-gray-600">
              Postal Code
            </label>
            <input
              id="postal_code"
              name="postal_code"
              type="text"
              placeholder="Enter postal code"
              value={formData.postal_code}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="occupation" className="text-sm font-medium text-gray-600">
              Occupation
            </label>
            <input
              id="occupation"
              name="occupation"
              type="text"
              placeholder="Enter Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="user_avatar" className="text-sm font-medium text-gray-600">
              Avatar
            </label>
            <input
              id="user_avatar"
              name="user_avatar"
              type="text"
              placeholder="Enter avatar"
              value={formData.user_avatar}
              onChange={handleChange}
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
              Add
            </button>
          </div>
        </form>
        {successMessage && <div>{successMessage}</div>}
      </div>
    </div>
  );
}
