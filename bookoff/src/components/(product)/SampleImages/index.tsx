"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Images } from "@/types/product";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SampleImagesProps {
  images: Images[];
  mainImage: string;
  setMainImage: (image: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({
  images,
  mainImage,
  setMainImage,
}) => {
  // Parse images nếu nó là chuỗi JSON
  const parsedImages =
    typeof images === "string" ? JSON.parse(images) : images || [];

  return (
    <div className="mt-10 w-[232px]">
      <h2 className="text-xl font-semibold mb-4">サンプル画像</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="sampleSwiper"
      >
        {parsedImages.length > 0 ? (
          parsedImages.map((image: Images, index: number) => (
            <SwiperSlide key={index}>
              <div
                className={`w-[50px] h-[100px] cursor-pointer ${
                  mainImage === image.image_url ? "" : "opacity-40"
                }`}
                onClick={() => setMainImage(image.image_url)}
              >
                <Image
                  src={image.image_url}
                  alt={`Sample ${index + 1}`}
                  width={50}
                  height={50}
                  className="object-cover hover:opacity-80"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </Swiper>
    </div>
  );
};

export default SampleImages;
