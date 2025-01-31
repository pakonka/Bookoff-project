import Services from "@/components/Services";
import BackButton from "@/components/(button)/BackButton";

const WishListPage = () => {
  return (
    <div className="mt-[132px] mx-[10%] my-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>トップ &gt; マイページ &gt; 保有ポイント</span>
      </div>

      {/* Main container */}
      <div className="flex gap-x-[48px]">
        {/* Sidebar */}
        <Services />

        {/* Points section */}
        <div className="w-[792px]">
          <h1 className="text-[40px] text-customBlue font-bold pb-5">
            お気に入り
          </h1>
          <div className="text-[14px] py-4">ポイント履歴がありません</div>

          {/* Back button */}
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
