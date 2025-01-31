import React from "react";
import CartItem from "@/components/CartItem";
import PaymentMethod from "@/components/PaymentMethod";
import OrderConfirmation from "@/components/OrderConfirmation";
import TotalCost from "@/components/TotalCost";
import { CartItemProps } from "@/components/CartItem";

interface CartContentProps {
  currentStep: number;
  cartItems: CartItemProps[];
  handleQuantityChange: (index: number, amount: number) => void;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  finalTotal: number;
  customerPoints: number;
  minTotalForPoints: number;
  usePoints: boolean;
  setUsePoints: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
  onCompleteOrder: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const CartContent: React.FC<CartContentProps> = ({
  currentStep,
  cartItems,
  handleQuantityChange,
  paymentMethod,
  setPaymentMethod,
  finalTotal,
  customerPoints,
  minTotalForPoints,
  usePoints,
  setUsePoints,
  onNext,
  onCompleteOrder,
  setCurrentStep,
}) => {
  return (
    <div className="bg-white rounded-lg grid grid-cols-3 gap-8 p-4">
      <div className="col-span-2">
        {currentStep === 1 && (
          <>
            <h1 className="text-[40px] text-customBlue font-bold pb-4 border-b">
              カート
            </h1>
            {cartItems.length === 0 ? (
              <p className="">
                現在、カートに入っている商品はありません
                <br />
                ・保存期間を超えた場合はカートの中身は空になります
                <br />
                ・ログアウトするとカートの中身は表示されません
              </p>
            ) : (
              cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  {...item}
                  onQuantityChange={(amount) =>
                    handleQuantityChange(index, amount)
                  }
                />
              ))
            )}
          </>
        )}

        {currentStep === 2 && (
          <PaymentMethod
            onPreviousStep={() => setCurrentStep(1)}
            onNextStep={() => setCurrentStep(3)}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        )}

        {currentStep === 3 && (
          <OrderConfirmation
            onCompleteOrder={onCompleteOrder}
            cart={cartItems}
            total={finalTotal}
            paymentMethod={paymentMethod}
          />
        )}
      </div>

      {/* Total Cost Section */}
      {currentStep === 1 && (
        <TotalCost
          total={finalTotal}
          itemCount={cartItems.length}
          availablePoints={customerPoints}
          minTotalForPoints={minTotalForPoints}
          onNext={onNext}
          buttonLabel="注文手続きへ"
          usePoints={usePoints} // Pass usePoints down
          setUsePoints={setUsePoints} // Pass setter down
          isStep1
        />
      )}
      {currentStep >= 2 && currentStep <= 3 && (
        <TotalCost
          total={finalTotal}
          itemCount={cartItems.length}
          availablePoints={customerPoints}
          minTotalForPoints={minTotalForPoints}
          usePoints={usePoints} // Pass usePoints down
          setUsePoints={setUsePoints} // Pass setter down
        />
      )}
    </div>
  );
};

export default CartContent;
