import Link from "next/link";
import React from "react";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col px-16 py-5">
      <h1 className="text-[30px] font-semibold mb-6">はじめてご利用の方</h1>
      <p className="text-xs mb-6">
        商品の注文などサービスのご利用には会員登録（無料）が必要です
      </p>
      <Link href={"/register"} className="w-full justify-center items-center">
        <button
          type="submit"
          className="w-[320px] font-semibold flex justify-center bg-customBlue text-white py-3 rounded-full hover-opacity transition duration-200"
        >
          新規会員登録
        </button>
      </Link>
    </div>
  );
};

export default Register;
