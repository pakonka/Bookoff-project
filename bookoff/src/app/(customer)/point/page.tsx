"use client";
import Image from "next/image";
import { user } from "../../../../data/users";
import { useState } from "react";
import Services from "@/components/Services";
import BackButton from "@/components/(button)/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

const PointsPage = () => {
  const breadcrumbItems = [
    { label: "トップ", href: "/" }, // Root page link
    { label: "マイページ", href: "/mypage" }, // Parent page link
    { label: "保有ポイント", href: "", isCurrent: true }, // Current page (no link)
  ];
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="mt-[132px] mx-[10%] my-10">
      {/* Breadcrumb */}
      <div className="text-xs py-5">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main container */}
      <div className="flex gap-x-[48px]">
        {/* Sidebar */}
        <Services />

        {/* Points section */}
        <div className="w-[792px]">
          <h1 className="text-[40px] text-customBlue font-bold pb-5">
            保有ポイント
          </h1>

          <div className="border p-6 rounded-md shadow-sm grid grid-cols-2">
            <div className="flex flex-col items-center border-[#dedede] border-r-[1px]">
              <div className="flex gap-2">
                <Image
                  alt=""
                  src="https://my.bookoff.co.jp/library/common/svg/point.svg"
                  width={24}
                  height={24}
                />
                <h1 className="font-semibold">利用可能ポイント</h1>
              </div>

              <div className="text-customRed text-[36px] flex items-center justify-center font-bold">
                {user.availablePoints}{" "}
                <span className="text-[20px] pl-1">P</span>
              </div>
            </div>

            <div className="flex flex-col items-center pl-3">
              <div className="w-full text-[14px] flex justify-between py-2">
                <h1>通常ポイント</h1>
                <div className="font-semibold text-[24px] flex items-center">
                  {user.regularPoints}{" "}
                  <span className="text-[14px] pl-1"> P</span>{" "}
                </div>
              </div>
              <div className="w-full text-[14px] flex justify-between py-2">
                <h1>期間限定ポイント</h1>
                <div className="font-semibold text-[24px] flex items-center">
                  {user.limitedTimePoints}{" "}
                  <span className="text-[14px] pl-1"> P</span>{" "}
                </div>
              </div>
              <div className="w-full text-[14px] flex justify-between py-2">
                <h1>買取ポイント</h1>
                <div className="font-semibold text-[24px] flex items-center">
                  {user.purchasePoints}{" "}
                  <span className="text-[14px] pl-1"> P</span>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <div className="mt-6">
            <div className="flex border-b">
              {[
                { label: "ポイント履歴", tab: "history" },
                { label: "獲得予定ポイント詳細", tab: "details" },
              ].map(({ label, tab }) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? "text-customBlue font-semibold border-b-[3px] border-customBlue"
                      : "text-[#707070] font-semibold"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="text-[14px] py-4">ポイント履歴がありません</div>
          </div>

          {/* Back button */}
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
