"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";

interface UserModalProps {
  userName?: string; // Optional user name
  points?: number; // Optional points
  onLogout: () => void; // Logout function
}

const UserModal: React.FC<UserModalProps> = ({
  userName,
  points,
  onLogout,
}) => {
  const router = useRouter();
  console.log(`UserModal`,points)
  return (
    <div className="bg-[#fff] rounded-[5px] p-4 shadow-custom w-[220px]">
      {userName ? ( // Check if userName is provided
        <div className="flex flex-col space-y-3 ">
          <div className="flex flex-col pb-2 border-custom">
            <div className="font-semibold text-[16px]">
              {userName} <span className="font-normal text-[14px]">様</span>
            </div>
            <div className="font-normal text-[12px]">利用可能ポイント</div>
            <div className="w-full flex float-right items-center justify-end font-semibold text-[16px]">
              {points} <span className="text-[12px]">P</span>{" "}
              <MdKeyboardArrowRight className="text-customBlue" size={20} />
            </div>
          </div>

          <button
            className="text-[14px] pb-2 border-custom flex justify-start"
            onClick={() => {
              router.push("/mypage");
            }}
          >
            マイページ
          </button>
          <button
            className="text-[14px] pb-2 border-custom flex justify-start"
            onClick={() => {
              router.push("/order-history");
            }}
          >
            注文履歴
          </button>
          <button
            className="text-[14px] pb-2 border-custom flex justify-start"
            onClick={() => {
              router.push("/point"); // Redirect to Get Coupons
            }}
          >
            取得クーポン
          </button>
          <button
            className=" text-customRed text-[14px] pb-2 flex justify-start"
            onClick={onLogout} // Call the logout function
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <button
            className="bg-customBlue text-white w-full py-2 rounded-full"
            onClick={() => {
              router.push("/login");
            }}
          >
            ログイン
          </button>
          <button
            className="bg-customOrange text-white py-2 rounded-full w-full"
            onClick={() => {
              router.push("/register");
            }}
          >
            新規会員登録
          </button>
        </div>
      )}
    </div>
  );
};

export default UserModal;
