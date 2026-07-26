'use client'

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

import "swiper/css";

export default function Extrasection() {
  // সাময়িক ডেমো ছবি (API যুক্ত করার পর এই অ্যারেতে API-এর ডাটা বসাতে পারবেন)
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
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        {/* 🌟 Section Title */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <HeartHandshake className="w-4 h-4 text-emerald-500" />
            <span>সামাজিক দায়বদ্ধতা</span>
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

        {/* 🌟 Top Row - Right to Left Slider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true, // ডান থেকে বামে স্ক্রোল হবে
            }}
            speed={4500}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Autoplay]}
            className="py-2"
          >
            {extraImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative group overflow-hidden rounded-[1.5rem] bg-white/90 p-2 backdrop-blur-sm dark:bg-[#05130e]/90 shadow-[0_10px_30px_-10px_rgba(4,120,87,0.15)] border border-emerald-100/60 dark:border-emerald-900/50">
                  <div className="relative w-full h-52 overflow-hidden rounded-[1.2rem]">
                    <Image
                      src={img}
                      alt={`Extra Initiative ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* 🌟 Bottom Row - Left to Right Slider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={4500}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Autoplay]}
            className="py-2"
          >
            {extraImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative group overflow-hidden rounded-[1.5rem] bg-white/90 p-2 backdrop-blur-sm dark:bg-[#05130e]/90 shadow-[0_10px_30px_-10px_rgba(4,120,87,0.15)] border border-emerald-100/60 dark:border-emerald-900/50">
                  <div className="relative w-full h-52 overflow-hidden rounded-[1.2rem]">
                    <Image
                      src={img}
                      alt={`Extra Initiative ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* 🌟 Bottom Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="inline-block px-6 py-3 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-base md:text-lg font-semibold shadow-sm">
            ✨ আমাদের বিশ্বাস, ভালো ফলাফলের পাশাপাশি ভালো মানুষ হওয়াটাই প্রকৃত শিক্ষা।
          </p>
        </motion.div>

      </div>
    </section>
  );
}