'use client';

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

import "swiper/css";

export default function Extrasection() {
  const extraImages = [
    "/sir 1.jpeg",
    "/sir2.jpg",
    "/sir 1.jpeg",
    "/sir2.jpg",
    "/sir 1.jpeg",
    "/sir2.jpg",
    "/sir 1.jpeg",
    "/sir2.jpg",
  ];

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-20 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

      {/* 🌟 Section Title */}
      <div className="w-full px-4 mb-10 text-center flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-3 shadow-sm"
        >
          <HeartHandshake className="w-4 h-4 text-emerald-500" />
          <span>সামাজিক দায়বদ্ধতা</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
        >
          সমাজের জন্য আমাদের উদ্যোগ
        </motion.h2>
        
        {/* গ্রিন গ্র্যাডিয়েন্ট আন্ডারলাইন */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1.5 w-40 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
        />
      </div>

      {/* 🌟 Full Screen Width Slider Grid */}
      <div className="w-full relative z-10 space-y-4 md:space-y-5">
        
        {/* 🌟 Top Row - Right to Left Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <Swiper
            spaceBetween={14}
            slidesPerView={1.15}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            speed={7500}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              768: { slidesPerView: 2.2, spaceBetween: 18 },
              1024: { slidesPerView: 2.8, spaceBetween: 20 },
              1280: { slidesPerView: 3.3, spaceBetween: 22 },
              1536: { slidesPerView: 3.6, spaceBetween: 24 },
            }}
            modules={[Autoplay]}
            className="w-full !ease-linear [&_.swiper-wrapper]:!ease-linear"
          >
            {extraImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative group overflow-hidden rounded-2xl shadow-sm bg-slate-100 dark:bg-emerald-950/20">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={img}
                      alt={`Social Initiative ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* 🌟 Bottom Row - Left to Right Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <Swiper
            spaceBetween={14}
            slidesPerView={1.15}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={7500}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              768: { slidesPerView: 2.2, spaceBetween: 18 },
              1024: { slidesPerView: 2.8, spaceBetween: 20 },
              1280: { slidesPerView: 3.3, spaceBetween: 22 },
              1536: { slidesPerView: 3.6, spaceBetween: 24 },
            }}
            modules={[Autoplay]}
            className="w-full !ease-linear [&_.swiper-wrapper]:!ease-linear"
          >
            {extraImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative group overflow-hidden rounded-2xl shadow-sm bg-slate-100 dark:bg-emerald-950/20">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={img}
                      alt={`Social Initiative ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>

      {/* 🌟 Bottom Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center px-4 relative z-10"
      >
        <p className="inline-block px-6 py-3 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-base md:text-lg font-semibold shadow-sm">
          ✨ আমাদের বিশ্বাস, ভালো ফলাফলের পাশাপাশি ভালো মানুষ হওয়াটাই প্রকৃত শিক্ষা।
        </p>
      </motion.div>

    </section>
  );
}