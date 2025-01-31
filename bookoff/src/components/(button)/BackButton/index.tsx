"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="mt-8 w-full flex justify-center">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="w-[320px] text-[20px] py-3 flex justify-center border-[2px] font-semibold border-customBlue rounded-full text-customBlue hover-opacity"
      >
        戻る
      </button>
    </div>
  );
};

export default BackButton;
