import CategoryBar from "@/components/CategoryBar";
import InfoComponent from "@/components/InforComponent";
import BoxList from "@/components/BoxList";
import Recommend from "@/components/Recommend";
import RecentCheck from "@/components/RecentCheck";
import Title from "@/components/Title";
import ProductCategory from "@/components/ProductCategory";
import HelpAndQuestion from "@/components/HelpAndQuestion";
import Salebanner from "@/components/Salebanner";
function home() {
  return (
    <div className="mt-[132px]">
      <Salebanner />
      <BoxList />
      <CategoryBar />
      <InfoComponent />
      <Title />
      <Recommend/>
      <ProductCategory />
      <RecentCheck />
      <HelpAndQuestion />
    </div>
  );
}

export default home;
