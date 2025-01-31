"use client"
import { token } from "@/app/(dashboard)/dashboard/utils/getToken";
import { WishlistItem } from "@/types/wishlistItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";


const TableOne = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);


  const fetchwishlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/wishlists",
          {headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },}
        );
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const data: WishlistItem[] = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchwishlist();
    }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Most desired products
      </h4>

      <div className="flex flex-col">
        <div className="flex gap-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ranking
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Product
            </h5>
          </div>
          <div className="p-4 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {" "}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase pl-[200px] xsm:text-base">
              Wish
            </h5>
          </div>
        </div>

        {wishlist.map((item, key) => (
          <div
            className={`flex gap-5 ${
              key === wishlist.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div key={item.product_id} className="flex items-center p-2.5 xl:p-5">
                <div className="px-5 flex items-center">
                  {/* Hiển thị thứ hạng với biểu tượng */}
                  {key === 0 && (
                    <FaMedal className="text-yellow-500 text-xl mr-2" title="Rank 1" />
                  )}
                  {key === 1 && (
                    <FaMedal className="text-gray-400 text-xl mr-2" title="Rank 2" />
                  )}
                  {key === 2 && (
                    <FaMedal className="text-orange-400 text-xl mr-2" title="Rank 3" />
                  )}
                  <span>{key + 1}</span>
                </div>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">
              <div className="h-10.5 w-13 rounded-md flex items-center justify-center ">
                    <Image
                        src={item.image_url || ""}
                        width={60}
                        height={50}
                        alt={"Product Image"}
                    />
                </div>
              </p>
            </div>
            <div className="flex items-center p-4 xl:p-5 w-[280px]">
              <p className="text-black dark:text-white">{item.product_title}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3 float-right flex">{item.wishlist_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
