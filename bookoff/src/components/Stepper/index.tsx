import { FaCheck } from "react-icons/fa6";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "カート" },
  { number: 2, label: "注文手続" },
  { number: 3, label: "注文確認" },
  { number: 4, label: "注文完了" },
];
const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className=" flex justify-center items-center py-8">
      {steps.map((step) => (
        <div key={step.number} className="flex items-center ">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex justify-center items-center font-bold transition-all duration-300 ease-in-out ${
                currentStep === step.number
                  ? "bg-customBlue text-white"
                  : "bg-[#fff] border-[#ccc] border-[3px] text-[#7f7f7f]"
              }`}
            >
              {step.number === 4 ? <FaCheck /> : step.number}
            </div>
            <div className="mt-2 text-[12px] font-semibold text-customBlue">
              {step.label}
            </div>
          </div>
          {step.number !== steps.length && (
            <div
              className={`w-[150px] h-[2px] ${
                currentStep >= step.number ? "bg-customBlue" : "bg-[#ccc]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
