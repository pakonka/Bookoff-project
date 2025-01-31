"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  userIdToUpdate: number | null;
}

export default function UpdateUserForm({
  isOpen,
  onClose,
  onUserUpdated,
  userIdToUpdate,
}: UpdateUserFormProps) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [roleName, setRoleName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  // Fetch user data
  useEffect(() => {
    if (isOpen && userIdToUpdate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/users/${userIdToUpdate}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.user_name || "");
          setEmail(data.email || "");
          setPassword(""); // Không hiển thị mật khẩu
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setCity(data.city || "");
          setCountry(data.country || "");
          setPostalCode(data.postal_code || "");
          setRoleName(data.role_name || "");
          setOccupation(data.occupation || "");
          setGender(data.gender || "");
          setUserAvatar(data.user_avatar || "");
        })
        
        .catch((error) => console.error("Error fetching user data:", error))
        .finally(() => setLoading(false));
    }
  }, [isOpen, userIdToUpdate, token]);

  // Validate fields and update user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userIdToUpdate || !userName.trim() || !email.trim()) {
      toast.error("All required fields must be filled.");
      return;
    }

    const payload = {
      user_name: userName,
      email: email,
      password: password || undefined, // Không gửi nếu trống
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      address: address,
      city: city,
      country: country,
      postal_code: postalCode,
      role_name: roleName,
      occupation: occupation,
      gender: gender,
      user_avatar: userAvatar,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${userIdToUpdate}`,
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
        onUserUpdated();
        toast.success("User updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating user.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[4050] transition-opacity duration-300">
      <div className="bg-white w-full max-w-[800px] mx-4 sm:mx-8 rounded-lg shadow-lg relative">
        <h2 className="text-[22px] p-6 bg-[#1c2434] text-white rounded-t-lg">
          Update User
        </h2>
        {loading ? (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleUpdateUser} className="p-6 space-y-6"
          style={{
            maxHeight: '500px',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            {/* Render các trường */}
            <div>
              <label htmlFor="userName" className="block mb-2 text-sm">
                User Name
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="roleName" className="block mb-2 text-sm">
                Role Name
              </label>
              <select
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full p-3 border rounded-md"
              >
                <option value="">Select Role</option> 
              <option value="Admin">Admin</option>  
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-sm">
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="country" className="block mb-2 text-sm">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block mb-2 text-sm">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block mb-2 text-sm">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border rounded-md"
              >
                  <option value="">Select gender</option>
                <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
                </select>
            </div>
            <div>
              <label htmlFor="occupation" className="block mb-2 text-sm">
                Occupation
              </label>
              <input
                id="occupation"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="userAvatar" className="block mb-2 text-sm">
                Avatar
              </label>
              <input
                id="userAvatar"
                type="text"
                value={userAvatar}
                onChange={(e) => setUserAvatar(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-[#081a52] text-white rounded-md"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-[#ccc] rounded-md"
              >
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
