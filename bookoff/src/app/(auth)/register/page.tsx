"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import {
  MdOutlineRemoveRedEye,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// Define an interface for the form data
interface RegisterFormData {
  email: string;
  confirmEmail: string;
  password: string;
  gender: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  occupation: string;
  postalCode: string;
  newsletter: boolean;
  termsAccepted: boolean;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validate on change
    defaultValues: {
      email: "",
      confirmEmail: "",
      password: "",
      gender: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      occupation: "",
      postalCode: "",
      newsletter: false,
      termsAccepted: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    // Handle registration logic here
  };

  return (
    <div className="mt-[125px] px-[18%] bg-[#f5f5f5]">
      <div>
        <h1 className="text-[40px] text-customBlue font-bold p-5">
          新規会員登録
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#fff] py-10 px-20 rounded-md flex flex-col gap-5"
        >
          <div className="flex gap-5 items-center">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              メールアドレス{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="xxxx@bookoff.co.jp"
              className="w-[486px] border rounded-[5px] py-2 px-4 text-sm bg-[#f5f5f5]"
              required
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Confirm Email */}
          <div className="flex gap-5 items-center mb-4">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              メールアドレス確認用{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <input
              type="email"
              {...register("confirmEmail", {
                required: "Confirm Email is required",
              })}
              placeholder="xxxx@bookoff.co.jp"
              className="w-[486px] border rounded-[5px] py-2 px-4 text-sm bg-[#f5f5f5]"
              required
            />
            {errors.confirmEmail && (
              <p className="text-red-500">{errors.confirmEmail.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex gap-5 items-center mb-4">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              パスワード{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="半角英数6～20文字"
                className="w-[486px] border rounded-[5px] py-2 px-4 text-sm bg-[#f5f5f5]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute right-2 top-2 text-[#b4b4b4]"
              >
                {showPassword ? (
                  <MdOutlineRemoveRedEye size={24} />
                ) : (
                  <IoMdEyeOff size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Gender */}
          <div className="flex gap-5 items-center mb-4">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              性別{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <div className="flex flex-row gap-5">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: "Gender is required" })}
                  className="form-radio"
                  required
                />
                <span className="ml-2 text-sm">男性</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: "Gender is required" })}
                  className="form-radio"
                  required
                />
                <span className="ml-2 text-sm">女性</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Birth Date */}
          <div className="flex gap-5 items-center mb-4">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              生年月日{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <div className="flex w-[486px] items-center space-x-2">
              {/* Year Dropdown */}
              <div className="relative w-1/4">
                <select
                  {...register("birthYear", {
                    required: "Birth Year is required",
                  })}
                  className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none w-full"
                  required
                >
                  <option value="">ー</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={2023 - i}>
                      {2023 - i}年
                    </option>
                  ))}
                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
                </span>
              </div>
              <span className="flex items-center whitespace-nowrap">年</span>

              {/* Month Dropdown */}
              <div className="relative w-1/4">
                <select
                  {...register("birthMonth", {
                    required: "Birth Month is required",
                  })}
                  className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none w-full"
                  required
                >
                  <option value="">ー</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}月
                    </option>
                  ))}
                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
                </span>
              </div>
              <span className="flex items-center whitespace-nowrap">月</span>

              {/* Day Dropdown */}
              <div className="relative w-1/4">
                <select
                  {...register("birthDay", {
                    required: "Birth Day is required",
                  })}
                  className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none w-full"
                  required
                >
                  <option value="">ー</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}日
                    </option>
                  ))}
                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
                </span>
              </div>
              <span className="flex items-center whitespace-nowrap">日</span>
            </div>
          </div>

          {/* Occupation */}
          <div className="flex gap-5 items-center mb-4">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              職業{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <div className="relative w-[486px]">
              <select
                {...register("occupation", {
                  required: "Occupation is required",
                })}
                className="h-10 border border-gray-300 rounded-[5px] bg-[#f5f5f5] p-2 appearance-none w-full"
                required
              >
                <option value="">お選びください</option>
                <option value="student">学生</option>
                <option value="employed">就業中</option>
                <option value="unemployed">無職</option>
              </select>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <MdKeyboardArrowDown className="text-customBlue text-[25px]" />
              </span>
            </div>
          </div>

          {/* Postal Code */}
          <div className="flex gap-5 items-center mb-4">
            <label className="block mb-2 text-[14px] font-semibold w-[25%]">
              郵便番号{" "}
              <span className="px-2 text-[12px] bg-customRed text-[#fff] ml-1">
                必須
              </span>
            </label>
            <input
              type="text"
              {...register("postalCode", {
                required: "Postal Code is required",
              })}
              placeholder="0000000（ハイフンなし）"
              className="w-[486px] border rounded-[5px] py-2 px-4 text-sm bg-[#f5f5f5]"
              required
            />
          </div>

          {/* Newsletter */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              お客様限定のクーポンやキャンペーン情報など、お得なお知らせを受け取ることができます
            </p>
            <label className="inline-flex mt-4 items-center">
              <input
                type="checkbox"
                {...register("newsletter")}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">メールマガジンを受け取る</span>
            </label>
          </div>

          <div className="flex flex-col">
            <p className="text-sm mb-3 text-gray-600">
              下記を必ずお読みいただき、同意の上ご登録ください
            </p>
            <label className="inline-flex items-center cursor-pointer">
              <MdKeyboardArrowRight className="text-customBlue mr-2" />
              <span
                className="text-sm text-customBlue underline cursor-pointer"
                onClick={() => {
                  // Handle link click for terms of service
                  console.log("Terms of Service clicked");
                }}
              >
                ご利用規約
              </span>
            </label>
            <label className="inline-flex items-center cursor-pointer mt-2">
              <MdKeyboardArrowRight className="text-customBlue mr-2" />
              <span
                className="text-sm text-customBlue underline cursor-pointer"
                onClick={() => {
                  // Handle link click for privacy policy
                  console.log("Privacy Policy clicked");
                }}
              >
                個人情報保護方針
              </span>
            </label>
          </div>
          <div>
            {/* Checkbox for agreement */}
            <label className="inline-flex items-center mt-4">
              <input
                type="checkbox"
                {...register("termsAccepted", {
                  required: "You must accept the terms",
                })}
                className="form-checkbox"
                required
              />
              <span className="ml-2">同意する</span>
            </label>
            {errors.termsAccepted && (
              <p className="text-red-500">{errors.termsAccepted.message}</p>
            )}
          </div>
          <div className="flex justify-between gap-5 mt-6 mx-[50px]">
            <Link
              href="#"
              onClick={() => router.back()}
              className="px-6 py-3 flex justify-center border font-semibold border-customBlue text-customBlue w-2/3 rounded-full hover-opacity"
            >
              戻る
            </Link>
            <Link
              href={"/confirm"}
              className={`px-6 py-3 w-full text-[#fff] flex justify-center font-semibold rounded-full ${
                isValid
                  ? "bg-blue-500 bg-customOrange hover-opacity"
                  : "bg-gray-300 bg-[#ccc] cursor-not-allowed"
              }`}
            >
              次へ進む
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
