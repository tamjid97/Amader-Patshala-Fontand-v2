"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { getBanners } from "@/app/(publicGroup)/_acttion/banner";

import "swiper/css";
import "swiper/css/pagination";

type Banner = {
  id?: string;
  picture?: string;
  title?: string;
};

export default function BannerCard() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannersData = async () => {
      try {
        const res = await getBanners();
        const bannerList = Array.isArray(res) ? res : (res?.data || res?.banners || []);
        setBanners(bannerList);
      } catch (error) {
        console.error("Error loading banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannersData();
  }, []);

  if (loading) {
    return (
      <div className="w-full sm:max-w-7xl sm:mx-auto sm:px-4 mt-0 mb-6 h-48 md:h-[400px] flex items-center justify-center text-emerald-700 bg-emerald-50/50 ">
        লোডিং হচ্ছে...
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="w-full sm:max-w-7xl sm:mx-auto sm:px-6 lg:px-8 mt-0 mb-6">
      <div className="w-full  overflow-hidden shadow-none sm:shadow-lg bg-white dark:bg-gray-900 border-0 sm:border border-gray-100 dark:border-gray-800">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full mySwiper"
        >
          {banners.map((item, index) => (
            <SwiperSlide key={item.id || index} className="w-full">
              {item.picture && (
                <img
                  src={item.picture}
                  className="w-full h-auto object-cover block"
                  alt={item.title || `banner-slide-${index}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}