"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Confirm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    email,
    confirmEmail,
    password,
    gender,
    birthYear,
    birthMonth,
    birthDay,
    occupation,
    postalCode,
    newsletter,
    termsAccepted,
  } = Object.fromEntries(searchParams.entries());

  return (
    <div className="mt-[125px] px-[18%] bg-[#f5f5f5]">
      <h1 className="text-[40px] text-customBlue font-bold p-5">確認ページ</h1>
      <div className="bg-[#fff] py-10 px-20 rounded-md">
        <h2 className="text-lg font-semibold">以下の情報をご確認ください</h2>
        <ul>
          <li>メールアドレス: {email}</li>
          <li>確認用メールアドレス: {confirmEmail}</li>
          <li>パスワード: {password}</li>
          <li>性別: {gender}</li>
          <li>
            生年月日: {birthYear}年 {birthMonth}月 {birthDay}日
          </li>
          <li>職業: {occupation}</li>
          <li>郵便番号: {postalCode}</li>
          <li>ニュースレター: {newsletter ? "受け取る" : "受け取らない"}</li>
          <li>利用規約に同意: {termsAccepted ? "はい" : "いいえ"}</li>
        </ul>
        <div className="flex justify-between gap-5 mt-6 mx-[50px]">
          <Link
            href="#"
            onClick={() => router.back()}
            className="px-6 py-3 flex justify-center border font-semibold border-customBlue text-customBlue w-2/3 rounded-full hover-opacity"
          >
            戻る
          </Link>
          <Link
            href={"/success"}
            className={`px-6 py-3 w-full text-[#fff] flex justify-center font-semibold rounded-full bg-blue-500 bg-customOrange hover-opacity`}
          >
            登録する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
