import React from "react";

interface TotalCostProps {
  total: number;
  itemCount: number;
  availablePoints: number; // Số điểm mà khách hàng có
  minTotalForPoints: number; // Mức tiền tối thiểu để được dùng điểm
  onNext?: () => void; // Optional callback function for the next step
  buttonLabel?: string; // Label for the button
  isStep1?: boolean;
  usePoints: boolean; // Accept usePoints as prop
  setUsePoints: React.Dispatch<React.SetStateAction<boolean>>; // Accept setter function as prop
}

const TotalCost: React.FC<TotalCostProps> = ({
  total,
  itemCount,
  availablePoints,
  minTotalForPoints,
  onNext,
  buttonLabel,
  isStep1,
  usePoints,
  setUsePoints,
}) => {
  // Calculate points to use based on conditions
  const pointsToUse =
    usePoints && total >= minTotalForPoints
      ? Math.min(availablePoints, total)
      : 0;

  // Calculate final total after applying points
  const finalTotal = total - pointsToUse;

  return (
    <div className="raleway p-6 rounded-lg shadow-md sticky top-4 h-fit">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">合計</h2>
        <p className="text-gray-500">商品合計：{itemCount}点</p>
      </div>

      {/* Points usage section */}
      {availablePoints > 0 && isStep1 && (
        <div className="my-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={usePoints}
              onChange={() => setUsePoints(!usePoints)} // Use the setter from props
            />
            <span className="text-sm text-gray-600">
              {`使用するポイント: ${availablePoints}P`}
            </span>
          </label>
        </div>
      )}

      {/* Display total after applying points */}
      <div className="text-right py-4">
        <p className="text-2xl font-bold text-red-600">
          ¥{finalTotal.toLocaleString()}
        </p>
        {usePoints && (
          <p className="text-sm text-gray-500">
            {`（ポイント使用: ¥${availablePoints.toLocaleString()}）`}
          </p>
        )}
      </div>

      {onNext && (
        <div className="mt-4 flex justify-center">
          <button
            className="text-[16px] w-full h-[51px] border-[2px] bg-customOrange hover-opacity text-[#fff] transition duration-500 ease-in-out rounded-full cursor-pointer font-semibold py-2"
            onClick={onNext}
            disabled={finalTotal <= 0} // Disable button if final total is <= 0
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default TotalCost;
