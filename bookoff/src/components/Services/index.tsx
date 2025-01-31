"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();

  const services = [
    { src: "account.svg", label: "マイページ", path: "/mypage" },
    { src: "point.svg", label: "保有ポイント", path: "/points" },
    { src: "coupon.svg", label: "取得クーポン", path: "/coupons" },
    { src: "favorite-blue.svg", label: "お気に入り", path: "/favorites" },
    { src: "history.svg", label: "注文履歴", path: "/order-history" },
    {
      src: "setting-mail.svg",
      label: "お知らせメール配信設定",
      path: "/settings",
    },
    { src: "myreview.svg", label: "マイレビュー", path: "/my-reviews" },
  ];

  const handleServiceClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-4 w-[360px]">
      <h2 className="text-[22px] pb-3 border-b-[2px] border-customBlue font-bold">
        サービス
      </h2>
      <div className="space-y-6">
        {services.map(({ src, label, path }) => (
          <div
            className="flex gap-2 hover-opacity cursor-pointer"
            key={label}
            onClick={() => handleServiceClick(path)}
          >
            <Image
              alt=""
              src={`https://my.bookoff.co.jp/library/common/svg/${src}`}
              width={24}
              height={24}
            />
            <h1 className="">{label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
