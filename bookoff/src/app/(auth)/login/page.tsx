import React from "react";
import Login from "@/components/(auth)/Login";
import Register from "@/components/(auth)/Register";
import Breadcrumb from "@/components/Breadcrumb";

const LoginPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "トップ", href: "/" },
    { label: "ログイン", href: "", isCurrent: true }, // Current page (no link)
  ];
  return (
    <div className="mt-[125px] px-[15%] bg-[#f5f5f5] pb-20">
      {/* Breadcrumb */}
      <div className="text-xs py-5">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <h1 className="text-[40px] text-customBlue font-bold pb-5">ログイン</h1>
      {/* Left Side: Login Component */}
      <div className="flex gap-5 ">
        <div className="bg-[#fff] w-1/2 flex ">
          <Login />
        </div>

        {/* Right Side: Register Component */}
        <div className="bg-[#fff] w-1/2 flex ">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
