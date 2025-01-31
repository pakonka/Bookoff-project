"use client";
import { formatDateForInput } from "@/app/(dashboard)/dashboard/utils/dateUtils";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateAuthorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthorUpdated: () => void;
  authorIdToUpdate: number | null;
}

export default function UpdateAuthorForm({
  isOpen,
  onClose,
  onAuthorUpdated,
  authorIdToUpdate,
}: UpdateAuthorFormProps) {
  const [authorName, setAuthorName] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch author data
  useEffect(() => {
    if (isOpen && authorIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/authors/${authorIdToUpdate}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      })
        .then((response) => response.json())
        .then((data) => {
          setAuthorName(data.author_name || "");
          setBio(data.bio || "");
          setDateOfBirth((formatDateForInput(data.date_of_birth)) || "");
          setNationality(data.nationality || "");
        })
        .catch((error) => console.error("Error fetching author data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, authorIdToUpdate, token]);

  // Validate fields and update author
  const handleUpdateAuthor = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are filled
    if (!authorIdToUpdate || !authorName.trim()) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      author_name: authorName,
      bio: bio,
      date_of_birth: dateOfBirth,
      nationality: nationality,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/authors/${authorIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        onAuthorUpdated();
        toast.success("Author updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update author. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating author.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">Update Author</h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateAuthor} className="p-6 space-y-6">
            <div>
              <label htmlFor="authorName" className="block mb-2 text-sm">
                Author Name
              </label>
              <input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block mb-2 text-sm">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border rounded-md"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block mb-2 text-sm">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="nationality" className="block mb-2 text-sm">
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="submit" className="px-6 py-2 bg-[#081a52] text-white rounded-md">
                Update
              </button>
              <button type="button" onClick={onClose} className="px-6 py-2 bg-[#ccc] rounded-md">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer position="top-center" className="z-10 fixed text-black" autoClose={1000} />
    </div>
  );
}
