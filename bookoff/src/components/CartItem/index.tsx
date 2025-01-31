import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";

// Define the CartItem type
export interface CartItemProps {
  name: string;
  price: number;
  category: string;
  author: string;
  image: string;
  quantity: number;
}

interface CartItemComponentProps extends CartItemProps {
  onQuantityChange: (amount: number) => void;
}

const CartItem: React.FC<CartItemComponentProps> = ({
  name,
  price,
  category,
  author,
  image,
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className=" flex space-x-4 p-4 border-b">
      <Image
        src={image}
        alt={name}
        width={98}
        height={144}
        className="object-cover"
      />
      <div className="flex-1">
        <span className="text-customBlue text-[12px] px-2 py-1 font-semibold bg-[#bacff0]">
          {category}
        </span>
        <h3 className="text-[18px]">{name}</h3>
        <h3 className="text-[14px] text-[#666] ">{author}(著者)</h3>
        <div className="flex justify-between w-full mt-14">
          <div className="flex justify-end items-center border border-[#ccc] rounded-[5px] py-1 px-2 bg-[#f5f5f5] font-semibold ">
            <button
              onClick={() => onQuantityChange(-1)}
              className=" text-blue-800"
            >
              −
            </button>
            <span className="px-4 font-thin">{quantity}</span>
            <button
              onClick={() => onQuantityChange(1)}
              className="text-gray-500"
            >
              ＋
            </button>
          </div>
          <div>
            <FaRegTrashCan size={25} />
          </div>
        </div>
      </div>

      <p className="text-red-600 text-[18px] font-semibold">
        ¥{price.toLocaleString()}
      </p>
    </div>
  );
};
export default CartItem;
