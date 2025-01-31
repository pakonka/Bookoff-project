"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar";
import Link from "next/link";
import UserModal from "../UserModal";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const searchHistory = ["本 A", "漫画 B", "DVD C"]; // Ví dụ các lịch sử tìm kiếm giả
  const productSuggestions = ["本 A1", "漫画 B2", "CD D1", "ゲーム E1"];
  const navItems = [
    { label: "書籍", href: "/category/book" },
    { label: "コミック", href: "/category/comic" },
    { label: "CD", href: "/category/cd" }, 
    { label: "DVD・ブルーレイ", href: "/category/dvd" },
    { label: "ゲーム", href: "/category/game" },
    { label: "セット・まとめ買い", href: "#" },
  ];

  const [showHeader, setShowHeader] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const toggleUserModal = (event: React.MouseEvent) => {
    setUserModalOpen(!isUserModalOpen);

    // Calculate position of the modal based on the user icon
    const icon = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: icon.bottom + window.scrollY + 10, // Position below the icon with some margin
      left: icon.left + window.scrollX, // Align with the left of the icon
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Kiểm tra hướng cuộn
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // Khi cuộn xuống
      if (scrollDirection === "down") {
        if (currentScrollY > 300) {
          setShowNav(false); // Ẩn nav trước khi cuộn quá 300px
        }
        if (currentScrollY > 500) {
          setShowHeader(false); // Ẩn header khi cuộn quá 500px
        }
      }

      // Khi cuộn lên
      if (scrollDirection === "up") {
        setShowNav(true);
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollDirection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setUserModalOpen(false);
      }
    };

    if (isUserModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserModalOpen]);

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear user session, call API)
    console.log("User logged out");
    setUserModalOpen(false); // Close the modal after logout
  };

  return (
    <div>
      {/* Header */}
      <header
        className={`bg-default border-t-[6px] border-[#fff000] transition-all duration-500 ease-in-out fixed w-full top-0 left-0 z-20 ${
          showHeader ? "translate-y-0" : "-translate-y-[100px]"
        }`}
      >
        <div className="mx-[10%] px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center">
              <Image
                src="https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fshopping.bookoff.co.jp%2Flibrary%2Fcommon%2Fimages%2Fimg-logo.png@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9"
                alt="Book Off Logo"
                width={160}
                height={40}
                className="w-[160px] h-[40px]"
              />
            </a>

            <div className="flex-1 mx-[12%] my-3">
              <SearchBar
                productSuggestions={productSuggestions}
                searchHistory={searchHistory}
              />
            </div>

            {/* Right Side Icons */}
            <div className="bg-default flex items-center border-collapse space-x-6">
              <button className="text-customBlue font-semibold hover-opacity rounded-full py-1 px-4 bg-[#fff000] transition duration-300">
                宅配買取
              </button>
              <Link
                href={"/wishlist"}
                className="text-blue-800 font-semibold hover:text-blue-600 transition duration-300"
              >
                <Image
                  src="https://shopping.bookoff.co.jp/cart/img/favorite-blue.bbd8ea86.svg"
                  alt="Wish List Icon"
                  width={24}
                  height={24}
                  className="hover-opacity w-[24px] h-[24px]"
                />
              </Link>
              <Link
                href="#"
                onClick={toggleUserModal}
                className="text-blue-800 font-semibold hover:text-blue-600 transition duration-300 relative"
              >
                <Image
                  src="https://shopping.bookoff.co.jp/cart/img/account.f2e2a8f8.svg"
                  alt="User Icon"
                  width={24}
                  height={24}
                  className="hover-opacity w-[24px] h-[24px]"
                />
              </Link>
              <Link
                href={"/cart"}
                className="text-blue-800 font-semibold hover:text-blue-600 transition duration-300"
              >
                <Image
                  src="https://shopping.bookoff.co.jp/cart/img/cart.e750711c.svg"
                  alt="Cart Icon"
                  width={24}
                  height={24}
                  className="hover-opacity w-[24px] h-[24px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      {isUserModalOpen && modalPosition && (
        <div
          ref={modalRef}
          className="absolute z-20"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <UserModal
            userName={user?.user_name}
            points={user?.user_point}
            onLogout={handleLogout}
          />
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`bg-default transition-all duration-500 ease-in-out fixed w-full top-[65px] z-10 bg-white shadow-md ${
          showNav ? "translate-y-0" : "-translate-y-[200px]"
        }`}
      >
        <div className="flex justify-between mx-[12%]">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative flex justify-center w-full py-4 font-semibold hover:text-blue-800 hover:border-b-[5px] border-b-[5px] border-b-[#fff] hover:border-b-blue-800 transition duration-300 ease-in-out"
            >
              {item.label}
              {/* Border decorations */}
              <span className="absolute inset-y-[25%] left-0 w-[0.3px] bg-[#c2c2c2]"></span>
              <span className="absolute inset-y-[25%] right-0 w-[0.3px] bg-[#c2c2c2]"></span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
