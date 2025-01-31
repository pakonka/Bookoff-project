import React from "react";
import { MdNavigateNext } from "react-icons/md";

interface InfoItem {
  iconName: string;
  title: string;
}

//   // Props interface for the InfoComponent
//   interface InfoComponentProps {
//     latestInfoItems: LatestInfoItem[]; // Array of latest info items
//     mediaInfoItems: MediaInfoItem[];     // Array of media info items
//   }
interface InfoColumnProps {
  title: string;
  items: InfoItem[];
}

interface InfoColumnProps {
  title: string;
  items: Array<{
    iconName: string;
    title: string;
  }>;
}
const latestInfoItems = [
  {
    iconName: "arrive",
    title: "最新入荷リスト",
  },
  {
    iconName: "discount",
    title: "本日の値下げリスト",
  },
];

const mediaInfoItems = [
  {
    iconName: "movie",
    title: "映画化情報まとめ",
  },
  {
    iconName: "drama",
    title: "ドラマ化情報まとめ",
  },
  {
    iconName: "anime",
    title: "アニメ化情報まとめ",
  },
];

const InfoColumn: React.FC<InfoColumnProps> = ({ title, items }) => {
  return (
    <div className="">
      <h2
        className={`relative text-lg pb-8 border-b-[1px] border-b-[#c2c2c2] font-semibold pl-4 pt-6 text-[26px]`}
      >
        {title}
        <span className="absolute inset-y-6 left-0 w-[6px] rounded-xl bg-[#003984]"></span>
      </h2>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="hover-opacity border-b border-[#c2c2c2] flex items-center justify-between py-2 "
          >
            <div className="flex items-center py-2">
              <div
                className={`relative mb-2 h-[24px] w-[24px] bg-no-repeat  bg-custom-sprite `}
                style={{
                  backgroundPosition:
                    item.iconName === "arrive"
                      ? "28.2328% 0"
                      : item.iconName === "discount"
                      ? "64.0537% 42.8571%"
                      : item.iconName === "movie"
                      ? "87.9343% 0px"
                      : item.iconName === "drama"
                      ? "11.9403% 71.4286%"
                      : "11.9403% 14.2857%",
                }}
              />
              <span className="ml-2">{item.title}</span>
            </div>
            <MdNavigateNext size={30} className="text-[#003894] ml-2" />
          </div>
        );
      })}
    </div>
  );
};

const InfoComponent = () => {
  return (
    <div className="flex mx-[10%] my-[30px] justify-between gap-x-6">
      <div className="mt-3 w-full">
        <InfoColumn title="最新情報をチェック" items={latestInfoItems} />
      </div>

      <div className=" w-full">
        <InfoColumn title="いま話題のメディア化作品" items={mediaInfoItems} />
      </div>
    </div>
  );
};

export default InfoComponent;
