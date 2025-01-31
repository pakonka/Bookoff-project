import { titles } from "../../../data/Title";
import Image from "next/image";

function Title() {
  return (
    <div className="mx-[11%] my-[100px] relative">
      <div className="flex justify-between p-5 items-center">
        <h1 className="text-[30px] font-semibold">気になるテーマから探す</h1>
      </div>
      <div className="flex flex-wrap justify-between">
        {titles.map((title, index) => (
          <div
            key={index}
            className="flex w-[179px] flex-col gap-5 items-center hover-opacity"
          >
            <Image
              src={title.title_image}
              alt={title.title_name}
              width={179}
              height={179}
            />
            <h3 className="truncate-lines">{title.title_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Title;
