import ProductDetail from "@/components/(product)/ProductDetail";
import Recommend from "@/components/Recommend";
import RecentCheck from "@/components/RecentCheck";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let shouldRefreshRecentCheck = false;
  

  try {
    // Fetch dữ liệu sản phẩm
    const productRes = await fetch(`http://localhost:5000/api/v1/products/details/slug/slug/${slug}`);
    if (!productRes.ok) {
      throw new Error("Failed to fetch product data");
    }else{
      shouldRefreshRecentCheck = true;
      
    }
    
    const productData = await productRes.json();

    // Fetch dữ liệu đánh giá
    const reviewsRes = await fetch(`http://localhost:5000/api/v1/reviews/productslug/${slug}`);
    if (!reviewsRes.ok) {
      throw new Error("Failed to fetch reviews data");
    }
    const reviewsData = await reviewsRes.json();
    // Kiểm tra nếu dữ liệu sản phẩm không có
    if (!productData || productData.length === 0) {
      throw new Error("Product data not found");
    }

    setTimeout(() => {
      shouldRefreshRecentCheck = false; 
    }, 1000); 

    return (
      <div className="mt-[132px]">
        <div className="mx-[10%]">
          {/* Pass sản phẩm và đánh giá vào ProductDetail */}
          <ProductDetail product={productData} review={reviewsData} />
        </div>

        <div className="bg-[#f5f5f5] py-10 mt-10">
          <Recommend />
        </div>
        <div className="py-10 mt-10">
          <RecentCheck shouldRefresh={shouldRefreshRecentCheck}  />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <p className="mt-[132px] mx-[10%] text-red-500">
        Failed to load product data.
      </p>
    );
  }
};

export default ProductPage;
