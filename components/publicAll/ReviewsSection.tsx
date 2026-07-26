'use client'

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import { Star } from "lucide-react";

// Swiper এর প্রয়োজনীয় CSS
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "M.D Tausif",
      role: "Dhaka University",
      feedback: "গর্বের সাথে বলতে পারি, এই এলাকায় এটি অন্যতম সেরা ব্যাচ। খুলনা সিটিতে সেরা সার্ভিস।",
      img: "/sir 1.jpeg"
    },
    {
      id: 2,
      name: "Abdullah Al",
      role: "Khulna University",
      feedback: "To get a good grade in biology you need to have a clear concept. If you can't do a good result, try here. One of the best coaching in the city.",
      img: "/sir2.jpg"
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      role: "BUET",
      feedback: "পড়াশোনার পরিবেশ এবং গাইডলাইন সত্যি অতুলনীয়। ভাইয়ার বায়োলজি পড়ানোর কৌশল দারুণ।",
      img: "/sir 1.jpeg"
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      role: "Medical College",
      feedback: "বায়োলজি কঠিন লাগতো, কিন্তু এখানে পড়ার পর বিষয়টি পানির মতো সহজ হয়ে গেছে।",
      img: "/sir2.jpg"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-emerald-300/10 dark:bg-emerald-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* 🌟 Animated Section Title */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span>শিক্ষার্থী ও অভিভাবক মতামত</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            কেন আমরাই শিক্ষার্থী ও অভিভাবককদের প্রথম পছন্দ?
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

        {/* 🌟 Swiper Review Slider */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full pb-12"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-swiper py-6"
          >
            {reviews.map((fidbac) => (
              <SwiperSlide key={fidbac.id} className="h-auto">
                <ReviewCard fidbac={fidbac} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}