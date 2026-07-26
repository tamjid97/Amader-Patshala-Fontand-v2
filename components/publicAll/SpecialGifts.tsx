'use client'

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Gift } from "lucide-react";

export default function SpecialGifts() {
  const gifts = [
    {
      id: 1,
      title: "Exclusive T-Shirt",
      subtitle: "Roots Of Biology Brand T-Shirt",
      img: "/sir 1.jpeg", // আপনার টি-শার্টের ছবি এখানে দিন
      tag: "Free",
    },
    {
      id: 2,
      title: "Premium Bookmark",
      subtitle: "Customized Wooden Bookmark",
      img: "/sir2.jpg", // আপনার বুকমার্কের ছবি এখানে দিন
      tag: "Free",
    },
    {
      id: 3,
      title: "Academic Calendar",
      subtitle: "2026 Complete Study Calendar",
      img: "/sir 1.jpeg", // আপনার ক্যালেন্ডারের ছবি এখানে দিন
      tag: "Free",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

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
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>সঞ্চালক ও শিক্ষার্থীদের জন্য বিশেষ আকষর্ণ</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            নতুন সদস্যদের জন্য বিশেষ উপহার
          </motion.h2>
          
          {/* গ্রিন গ্র্যাডিয়েন্ট আন্ডারলাইন উইথ অ্যানিমেশন */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-40 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
          />
        </div>

        {/* 🌟 Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/90 backdrop-blur-md dark:bg-[#05130e]/90 rounded-[2.2rem] p-7 shadow-[0_15px_40px_-10px_rgba(4,120,87,0.12)] dark:shadow-[0_15px_40px_-10px_rgba(5,150,105,0.2)] border border-emerald-100/80 dark:border-emerald-900/60 flex flex-col items-center text-center transition-all duration-500 overflow-hidden ring-1 ring-black/5 dark:ring-white/5 hover:ring-emerald-300/50 dark:hover:ring-emerald-700/50"
            >
              {/* Top Free Badge */}
              <div className="absolute top-5 right-5 z-10 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-emerald-500/30">
                <Gift className="w-3.5 h-3.5" />
                <span>{gift.tag}</span>
              </div>

              {/* Image Container with Glow Effect */}
              <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-50/80 to-teal-50/30 dark:from-emerald-950/30 dark:to-emerald-900/10 p-5 border border-emerald-100/60 dark:border-emerald-900/40">
                <Image
                  src={gift.img}
                  alt={gift.title}
                  fill
                  className="object-cover rounded-xl p-1 transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Glow on Hover */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500 rounded-2xl" />
              </div>

              {/* Content Details */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                  {gift.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-slate-500 dark:text-emerald-200/70">
                  {gift.subtitle}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="w-12 h-1 bg-emerald-500/20 group-hover:w-24 group-hover:bg-emerald-500 rounded-full transition-all duration-500 mt-6" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}