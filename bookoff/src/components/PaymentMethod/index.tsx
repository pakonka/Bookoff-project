import React from "react";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod,
  onPreviousStep,
  onNextStep,
}) => {
  const isPaymentMethodSelected = paymentMethod !== "";

  return (
    <div className="col-span-2">
      <h1 className="text-[40px] text-customBlue font-bold pb-4 border-b">
        お支払い方法
      </h1>
      <div className="py-6">
        <h2 className="text-lg font-semibold pb-4">
          お支払い方法を選択してください
        </h2>
        <div className="flex flex-col  space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="COD"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "COD"}
              className="mr-2 "
            />
            代金引換 (Cash on Delivery)
          </label>
          <label className="flex items-center">
            <input
              required
              type="radio"
              name="payment"
              value="Credit"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "Credit"}
              className="mr-2"
            />
            クレジットカード
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="ATM"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "ATM"}
              className="mr-2"
            />
            ATM振込
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="Cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === "Cash"}
              className="mr-2"
            />
            現金
          </label>
        </div>
      </div>
      <div className="flex justify-between gap-5 mt-6 mx-[50px]">
        <button
          onClick={onPreviousStep}
          className="px-6 py-3 border font-semibold border-customBlue text-customBlue w-2/3 rounded-full hover-opacity"
        >
          戻る
        </button>
        <button
          onClick={onNextStep}
          disabled={!isPaymentMethodSelected}
          className={`px-6 py-3 w-full text-[#fff] font-semibold rounded-full ${
            isPaymentMethodSelected
              ? "bg-blue-500 bg-customOrange  hover-opacity"
              : "bg-gray-300 bg-[#ccc] cursor-not-allowed"
          }`}
        >
          受取方法を確定する
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
