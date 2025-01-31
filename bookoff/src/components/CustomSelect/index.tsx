"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

const options = [
  { value: 9, label: "9件" },
  { value: 15, label: "15件" },
  { value: 18, label: "18件" },
];

const CustomSelect: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: number) => {
    onChange(optionValue);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const selectedOption =
    options.find((option) => option.value === value) || options[0]; // Lấy lựa chọn hiện tại hoặc mặc định

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center p-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click
      >
        <span className="flex-grow">{selectedOption.label}</span>
        <MdKeyboardArrowDown className="h-6 w-6 text-customBlue" />
      </div>
      {isOpen && (
        <div className="absolute w-[80px] z-10 bg-default mt-3 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover-opacity cursor-pointer border-custom flex items-center justify-between"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
              {selectedOption.value === option.value && ( // So sánh với giá trị của lựa chọn hiện tại
                <IoMdCheckmark
                  size={18}
                  className="text-customBlue float-right"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
