import React from "react";

interface OrderSuccessProps {
  onGoHome: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onGoHome }) => {
  return (
    <div className="shadow-lg rounded-lg max-w-md mx-auto mt-5 p-8 bg-white">
      <div className="py-16 text-center">
        <h2 className="text-2xl text-customBlue font-semibold">
          ご注文が完了しました！
        </h2>
        <p className="mt-2 text-gray-600">
          お買い上げいただきありがとうございます。
        </p>
        <div className="mt-8">
          <p className="text-gray-700">ホームページに戻りますか？</p>
          <button
            className="text-[16px] mt-5 w-1/2 h-[51px] border-[2px] bg-customOrange hover-opacity text-[#fff] transition duration-500 ease-in-out rounded-full cursor-pointer font-semibold py-2"
            onClick={onGoHome}
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
