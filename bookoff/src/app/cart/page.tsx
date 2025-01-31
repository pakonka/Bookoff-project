"use client";
import React, { useState } from "react";
import Stepper from "@/components/Stepper";
import CartContent from "@/components/CartContent"; // Import the new component
import OrderSuccess from "@/components/OrderSuccess";
import { customers } from "../../../data/customers";
import { cart } from "../../../data/cart";
import { CartItemProps } from "@/components/CartItem";
import Recommend from "@/components/Recommend";
import RecentCheck from "@/components/RecentCheck";

const Cart: React.FC = () => {
  const customer = customers[1];
  const [cartItems, setCart] = useState<CartItemProps[]>(cart || []);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [customerPoints, setCustomerPoints] = useState<number>(
    customer.availablePoints
  );
  const [usePoints, setUsePoints] = useState<boolean>(false); // Lifted state

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate points to use based on conditions
  const pointsToUse =
    usePoints && total >= customer.minTotalForPoints
      ? Math.min(customerPoints, total)
      : 0;

  // Calculate final total after applying points
  const finalTotal = total - pointsToUse;

  const handleQuantityChange = (index: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleCompleteOrder = () => {
    // Proceed to the success step first
    setCurrentStep(4);

    // Deduct the used points from the customer only if at step 4
    if (usePoints) {
      setCustomerPoints((prevPoints) => prevPoints - pointsToUse);
    }
  };

  return (
    <div className=" mt-[100px]">
      <div className="p-4 mx-[10%]">
        <Stepper currentStep={currentStep} />

        <CartContent
          currentStep={currentStep}
          cartItems={cartItems}
          handleQuantityChange={handleQuantityChange}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          finalTotal={finalTotal}
          customerPoints={customerPoints}
          minTotalForPoints={customer.minTotalForPoints}
          usePoints={usePoints}
          setUsePoints={setUsePoints}
          onNext={() => setCurrentStep(2)}
          onCompleteOrder={handleCompleteOrder}
          setCurrentStep={setCurrentStep}
        />

        {currentStep === 4 && (
          <OrderSuccess onGoHome={() => (window.location.href = "/")} />
        )}
      </div>
      <div className="bg-[#f5f5f5] py-10 mt-10">
        <Recommend />
      </div>
      <div className=" py-10 mt-10">
        <RecentCheck />
      </div>
    </div>
  );
};

export default Cart;
