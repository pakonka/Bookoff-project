import PageBanner from "@/components/PageBanner";
import ShopProducts from "@/components/ShopProducts";
function shop() {
  return (
    <div>
      <PageBanner bannerTitle="Collection" bannerUrl="HOME/ BEST SELLING" />
      <ShopProducts />
    </div>
  );
}

export default shop;
