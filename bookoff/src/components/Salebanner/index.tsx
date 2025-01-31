import { banners } from "../../../data/banners";
import Image from "next/image";

function Salebanner() {
  const activeBanners = banners.filter((banner) => banner.isActive);

  // Only render if there are active banners
  if (activeBanners.length === 0) {
    return null; // Return null if there are no active banners
  }

  return (
    <div>
      {activeBanners.map((banner, index) => (
        <div key={index} className="banner px-[10%] pt-3">
          <Image
            alt={banner.title}
            src={banner.image}
            layout="responsive"
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
}

export default Salebanner;
