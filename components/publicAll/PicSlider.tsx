'use client'

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { Users } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function PicSlider() {
  const swiperRef = useRef<any>(null);

  const brandlogos = [
    { img: "/Students/1.jpeg", alt: "Student Batch 1" },
    { img: "/Students/2.jpeg", alt: "Student Batch 2" },
    { img: "/Students/3.jpeg", alt: "Student Batch 3" },
    { img: "/Students/5.jpg", alt: "Student Batch 5" },
    { img: "/Students/6.jpg", alt: "Student Batch 6" },
    { img: "/Students/7.jpg", alt: "Student Batch 7" },
    { img: "/Students/8.jpg", alt: "Student Batch 8" },
    { img: "/Students/9.jpeg", alt: "Student Batch 9" },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* Custom Styles for Pagination */}
      <style>{`
        .custom-pagination-container .swiper-wrapper {
          padding-bottom: 3.5rem;
        }
        .custom-pagination-container .swiper-pagination-bullets {
          bottom: 0 !important;
        }
        .custom-pagination-container .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #a7d3bc;
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .custom-pagination-container .swiper-pagination-bullet-active {
          background-color: #1a7342;
          transform: scale(1.1);
        }
      `}</style>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* Animated Section Title */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <Users className="w-4 h-4 text-emerald-500" />
            <span>আমাদের পরিবার</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            আমাদের শিক্ষার্থীদের একটি অংশ
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-40 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
          />
        </div>

        {/* Swiper Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full relative custom-pagination-container"
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={30}
            effect={'fade'}
            pagination={{ 
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay, EffectFade]}
            className="w-full overflow-visible"
          >
            {brandlogos.map((item, index) => (
              <SwiperSlide key={index}>
                {/* Border removed completely from here */}
                <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] shadow-2xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}