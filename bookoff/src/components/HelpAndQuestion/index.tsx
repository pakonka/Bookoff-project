import Image from "next/image";
import { helps } from "../../../data/HelpAndQuestion";
import { MdOutlineQuestionAnswer } from "react-icons/md";

function HelpAndQuestion() {
  return (
    <div className="mx-[15%] my-[100px] relative">
      <div className="flex justify-between p-5 items-center">
        <h1 className="text-[30px] font-semibold ">ブックオフはこんなに便利</h1>
      </div>
      <div className="flex flex-row">
        {helps.map((help, index) => {
          return (
            <div key={index} className="flex flex-row gap-5 items-center">
              <Image
                src={help.icon}
                alt={help.title}
                width={102}
                height={102}
              />
              <span className="font-semibold basis-[232px] mr-[50px]">
                {help.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <div className="flex gap-[30px] my-[50px] justify-center font-bold items-center w-[380px] h-[58px] rounded-full bg-[#003894] text-[#fff] hover-opacity">
          <span>
            <MdOutlineQuestionAnswer size={20} />
          </span>
          <span>ヘルプ・ご質問</span>
        </div>
      </div>
    </div>
  );
}

export default HelpAndQuestion;
