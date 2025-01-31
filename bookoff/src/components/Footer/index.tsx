"use client";
import { CiFacebook, CiTwitter, CiMail } from "react-icons/ci";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const items = [
    "ヘルプ・ご質問",
    "配送料について",
    "支払い方法について",
    "メールサービス",
    "ご意見・ご感想",
  ];
  return (
    <footer className="">
      <div className="bg-[#ebebeb] text-[#333] h-[77px] flex items-center justify-between px-[5%] shadow-md">
        {/* Navigation Items */}
        <div className="flex space-x-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <FaChevronRight className=" text-blue-800" />
              <span className="hover:opacity-80">{item}</span>
            </div>
          ))}
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center hover:opacity-80 space-x-2"
        >
          <FaChevronUp className=" text-blue-800" size={30} />
        </button>
      </div>
      <div className="bg-[#003894] px-[5%] h-[260px] text-white py-6">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-4">
          <a href="#" aria-label="Facebook">
            <CiFacebook className="text-[#fff]" size={35} />
          </a>
          <a href="#" aria-label="Twitter">
            <CiTwitter className="text-[#fff]" size={35} />
          </a>
          <a href="#" aria-label="LINE">
            <CiMail className="text-[#fff]" size={35} />
          </a>
        </div>

        {/* Links */}
        <div className=" text-sm space-x-4 mb-4">
          <a href="#" className="hover:underline">
            BOOKOFF公式サイト
          </a>
          <a href="#" className="hover:underline">
            企業情報
          </a>
          <a href="#" className="hover:underline">
            BOOKOFF会員サービス利用規約
          </a>
          <a href="#" className="hover:underline">
            利用規約
          </a>
          <br />
          <a href="#" className="hover:underline">
            個人情報保護方針
          </a>
          <a href="#" className="hover:underline">
            ソーシャルメディアポリシー
          </a>
          <a href="#" className="hover:underline">
            カスタマーハラスメントに対する基本方針
          </a>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-500 mx-auto my-6" />

        {/* Company Information */}
        <div className=" text-sm mb-4">
          <p>ブックオフコーポレーション株式会社</p>
        </div>

        {/* Copyright */}
        <div className="flex justify-between text-sm">
          <p>古物商許可番号 第452760001146号 神奈川県公安委員会許可</p>
          <p>Copyright(C) BOOKOFF CORPORATION LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
