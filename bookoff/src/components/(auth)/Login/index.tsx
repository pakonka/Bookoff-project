"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md"; // Import icon hiển thị mật khẩu
import { IoMdEyeOff } from "react-icons/io"; // Import icon ẩn mật khẩu
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      console.log(result);
      
      if (result && result.isAuthenticated) {
        alert("Login successful");
  
        // Lấy thông tin người dùng từ state
        const user = useAuth.getState().user; // Lấy thông tin người dùng từ store
  
        // Kiểm tra vai trò của người dùng để điều hướng
        const userRole = user?.role_id; // Lấy role_id từ user
  
        if (userRole === null) {
          // Nếu không có vai trò, di chuyển đến trang chính
          router.push("/");
        } else if (userRole === 1 || userRole === 2 || userRole === 3) {
          // Nếu là staff, di chuyển đến trang dashboard
          router.push("/dashboard");
        } else {
          // Di chuyển đến trang chính cho các vai trò khác
          router.push("/");
        }
      } else {
        alert("Login failed");
      }
    } catch (e) {
      alert("An error occurred during login");
      console.log(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Nếu đã xác thực, chuyển hướng người dùng đến trang chính hoặc dashboard
      const user = useAuth.getState().user; // Lấy thông tin người dùng từ store
      const userRole = user?.role_id;
  
      if (userRole === 1 || userRole === 2 || userRole === 3) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, router]);
  

  return (
    <div className="flex flex-col px-16 py-5">
      <h1 className="text-[30px] font-semibold mb-6">会員登録されている方</h1>
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-y-5">
        <label className="block  font-medium">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="xxxx@bookoff.co.jp"
          className="w-full border rounded-[5px] py-2 px-4 text-sm bg-[#f5f5f5]"
          required
        />

        <label className="block  text-sm font-medium text-gray-700">
          パスワード
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"} // Thay đổi loại input dựa trên trạng thái showPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="半角英数6～20文字"
            className="w-full border rounded-[5px] py-2 px-4 text-sm bg-[#f5f5f5]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Đổi trạng thái hiển thị mật khẩu
            className="absolute right-2 top-2 text-[#b4b4b4]"
          >
            {showPassword ? (
              <MdOutlineRemoveRedEye size={24} />
            ) : (
              <IoMdEyeOff size={24} />
            )}
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <button
            type="submit"
            className="w-[320px] font-semibold flex justify-center bg-customOrange text-white py-3 rounded-full hover-opacity transition duration-200"
          >
            ログイン
          </button>

          <button
            type="button"
            className="relative w-[320px] font-semibold flex gap-5 justify-center border py-3 rounded-full mt-2 hover-opacity transition duration-200"
          >
            <FcGoogle className="absolute left-5 top-3 text-[30px]" />
            Googleでログイン
          </button>
        </div>
      </form>

      <p className="mt-4 text-xs">
        すでにブックオフグループのサービスで会員登録をされている方は、先にログインをして会員メニューのご登録情報よりLINEアカウントを連携してください
      </p>

      <Link
        href="/forgot-password"
        className="mt-5 text-xs text-customBlue hover:underline"
      >
        パスワードをお忘れですか？
      </Link>
    </div>
  );
};

export default Login;
