import Image from "next/image";
interface BoxProps {
  imageUrl: string;
  description: string;
}

const Box: React.FC<BoxProps> = ({ imageUrl, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover-opacity">
      <Image
        src={imageUrl}
        alt={imageUrl}
        width={282}
        height={218}
        className="object-cover w-full h-auto"
      />
      <div className="">
        <span className="bg-[#e60009] text-white text-xs px-2 py-1">特集</span>
        <p className="p-2 mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Box;
