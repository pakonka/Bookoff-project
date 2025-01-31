"use client";
import { useState } from "react";

interface AddAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthorAdded: () => void;
}

export default function AddAuthorForm({ isOpen, onClose, onAuthorAdded }: AddAuthorModalProps) {
  const [authorName, setAuthorName] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Trạng thái cho thông báo thành công

  const handleSubmit = async () => {
    if (!authorName.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author_name: authorName, bio }),
      });

      if (!response.ok) {
        throw new Error("Failed to add author");
      }else{
        alert("Added author successfully")
      }

      // Khi thêm thành công
      setAuthorName(""); // Reset form fields
      setBio("");
      setDateOfBirth("");
      setNationality(""); // Reset form fields
      setSuccessMessage("Author added successfully!"); // Hiển thị thông báo thành công
      onAuthorAdded(); // Gọi callback để cập nhật giao diện
      setTimeout(() => {
        setSuccessMessage(""); // Xóa thông báo sau 3 giây
        onClose(); // Đóng modal
      }, 3000);
    } catch (error) {
      alert("An error occurred while adding the author.");
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
    <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
      <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Add Author</h2>
        <form
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="authorName" className="text-sm font-medium text-gray-600">
              Author Name
            </label>
            <input
              id="authorName"
              type="text"
              placeholder="Enter author name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              placeholder="Enter author name"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nationality" className="text-sm font-medium text-gray-600">
              Nationality
            </label>
            <input
              id="nationality"
              type="text"
              placeholder="Enter author name"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-sm font-medium text-gray-600">
              Bio
            </label>
            <textarea
              id="bio"
              placeholder="Enter author bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            ></textarea>
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
              Add Author
            </button>
          </div>
        </form>
        {successMessage && (
          <p className="mt-4 text-green-600 font-medium text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
}
