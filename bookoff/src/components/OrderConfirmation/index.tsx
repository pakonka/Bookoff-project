import React from "react";

interface OrderConfirmationProps {
  cart: { name: string; price: number; quantity: number }[];
  total?: number;
  paymentMethod: string;
  onCompleteOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  cart,
  paymentMethod,
  onCompleteOrder,
}) => {
  return (
    <div className="col-span-2">
      <h1 className="text-[40px] text-customBlue font-bold pb-4 border-b">
        注文確認
      </h1>
      <div className="py-6">
        <h2 className="text-lg font-semibold pb-4">
          注文内容を確認してください
        </h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between p-2 border-b">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>¥{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        {/* <div className="flex justify-between p-2 border-t font-bold">
          <span>合計</span>
          <span>¥{total.toLocaleString()}</span>
        </div> */}
        <div className="mt-4">
          <h3 className="font-semibold">支払い方法: {paymentMethod}</h3>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="text-[16px] w-1/2 h-[51px] border-[2px] bg-customOrange hover:opacity-80 text-white transition duration-500 ease-in-out rounded-full cursor-pointer font-semibold py-2"
          onClick={onCompleteOrder}
        >
          注文を完了する
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
