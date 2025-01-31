import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { user } from "../../../../data/users";
import Breadcrumb from "@/components/Breadcrumb";

const MyPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "トップ", href: "/" }, // Root page link
    { label: "マイページ", href: "", isCurrent: true },
  ];

  return (
    <div className="mt-[132px] mx-[10%] my-10">
      <div className="text-xs py-3">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <h1 className="text-[40px] text-customBlue font-bold py-5">マイページ</h1>
      <div className="flex gap-10">
        <div className="w-[384px] rounded-[5px] shadow-custom flex flex-col ">
          <h1 className="text-[22px] rounded-t-[5px] py-[24px] px-[16px] bg-customBlue text-[#fff] font-semibold mb-4 hover-opacity">
            {user.name} <span className="text-[14px]"> さん</span>
          </h1>
          <div className="p-[24px] flex-grow">
            <div className="">
              <Link
                href={"/point"}
                className="font-semibold w-full text-[14px] flex justify-between pb-3 border-custom hover-opacity"
              >
                <h1>利用可能ポイント</h1>
                <div className="text-customRed text-[24px] flex items-center">
                  {user.availablePoints}{" "}
                  <span className="text-[14px] pl-1"> P</span>{" "}
                  <MdKeyboardArrowRight className="text-customBlue" size={23} />
                </div>
              </Link>
              <div className="w-full text-[14px] flex justify-between py-2">
                <h1>通常ポイント:</h1>
                <div className="font-semibold text-[16px] flex items-center">
                  {user.regularPoints}{" "}
                  <span className="text-[12px] pl-1"> P</span>{" "}
                </div>
              </div>
              <div className="w-full text-[14px] flex justify-between py-2">
                <h1>期間限定ポイント:</h1>
                <div className="font-semibold text-[16px] flex items-center">
                  {user.limitedTimePoints}{" "}
                  <span className="text-[12px] pl-1"> P</span>{" "}
                </div>
              </div>
              <div className="w-full text-[14px] flex justify-between py-2">
                <h1>買取ポイント:</h1>
                <div className="font-semibold text-[16px] flex items-center">
                  {user.purchasePoints}{" "}
                  <span className="text-[12px] pl-1"> P</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[804px] flex flex-col">
          <div className="flex-grow">
            <div className="grid grid-cols-1 gap-2 mb-4">
              <Link
                href={"/order-history"}
                className="p-2 border rounded shadow-custom flex"
              >
                <div className="flex flex-col h-full w-1/3 justify-center items-center border-r-[1px] border-[#dedede] hover-opacity">
                  <Image
                    alt=""
                    src="https://my.bookoff.co.jp/library/common/svg/history.svg"
                    width={36}
                    height={36}
                  />
                  <h3 className="font-semibold py-2">注文履歴</h3>
                </div>
                <div className="p-[24px] hover-opacity">
                  <h1 className="font-semibold">最新のご注文状況</h1>
                  <h2>ご注文履歴はありません</h2>
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <Link
                href={"/coupons"}
                className="p-2 border rounded-[6px] shadow-custom flex flex-col items-center hover-opacity"
              >
                <Image
                  alt="取得クーポン"
                  src="https://my.bookoff.co.jp/library/common/svg/coupon.svg"
                  width={36}
                  height={36}
                />
                <h3 className="font-semibold py-2">取得クーポン</h3>
              </Link>
              <Link
                href={"/favorites"}
                className="p-2 border rounded-[6px] shadow-custom flex flex-col items-center hover-opacity"
              >
                <Image
                  alt="お気に入り"
                  src="https://my.bookoff.co.jp/library/common/svg/favorite-blue.svg"
                  width={36}
                  height={36}
                />
                <h3 className="font-semibold py-2">お気に入り</h3>
              </Link>
              <Link
                href={"/notifications"}
                className="p-2 border rounded-[6px] shadow-custom flex flex-col items-center hover-opacity"
              >
                <Image
                  alt="お知らせメール"
                  src="https://my.bookoff.co.jp/library/common/svg/mail.svg"
                  width={36}
                  height={36}
                />
                <h3 className="font-semibold py-2">お知らせメール</h3>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Link
                href={"/settings"}
                className="p-2 border rounded-[6px] shadow-custom flex flex-col items-center hover-opacity"
              >
                <Image
                  alt="会員情報の設定"
                  src="https://my.bookoff.co.jp/library/common/svg/signup.svg"
                  width={36}
                  height={36}
                />
                <h3 className="font-semibold py-2">会員情報の設定</h3>
              </Link>
              <Link
                href={"/shipping-address"}
                className="p-2 border rounded-[6px] shadow-custom flex flex-col items-center hover-opacity"
              >
                <Image
                  alt="お届け先住所"
                  src="https://my.bookoff.co.jp/library/common/svg/shipping_address.svg"
                  width={36}
                  height={36}
                />
                <h3 className="font-semibold py-2">お届け先住所</h3>
              </Link>
              <Link
                href={"/payment-method"}
                className="p-2 border rounded-[6px] shadow-custom flex flex-col items-center hover-opacity"
              >
                <Image
                  alt="お支払い方法"
                  src="https://my.bookoff.co.jp/library/common/svg/payment.svg"
                  width={36}
                  height={36}
                />
                <h3 className="font-semibold py-2">お支払い方法</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
