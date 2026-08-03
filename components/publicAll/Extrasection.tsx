"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";

export default function Extrasection() {
  // প্রথম ৪টি ছবি (Row 1 এর জন্য)
  const rowOneImages = [
    { name: "Initiative 1", src: "/socialPic/1.jpg" },
    { name: "Initiative 2", src: "/socialPic/22.jpg" },
    { name: "Initiative 3", src: "/socialPic/3.jpeg" },
    { name: "Initiative 4", src: "/socialPic/4.jpeg" },
  ];

  // শেষের ৪টি ছবি (Row 2 এর জন্য)
  const rowTwoImages = [
    { name: "Initiative 5", src: "/socialPic/5.jpeg" },
    { name: "Initiative 6", src: "/socialPic/6.jpeg" },
    { name: "Initiative 7", src: "/socialPic/7.jpeg" },
    { name: "Initiative 8", src: "/socialPic/55.jpeg" },
  ];

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-20 transition-colors duration-300">
      {/* 🌟 Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <style jsx>{`
        @keyframes scroll-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes scroll-ltr {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-rtl {
          animation: scroll-rtl 35s linear infinite;
        }
        .animate-marquee-ltr {
          animation: scroll-ltr 35s linear infinite;
        }
        .animate-marquee-rtl:hover,
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
        .mask-edges {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>

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

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1.5 w-40 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
        />
      </div>

      {/* 🌟 Marquee Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full mask-edges overflow-hidden flex flex-col gap-4 md:gap-5 py-2 z-10"
      >
        {/* Row 1 - Top Row (First 4 Images - Right to Left Scroll) */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-rtl flex w-max flex-nowrap items-center gap-4">
            {[...rowOneImages, ...rowOneImages, ...rowOneImages].map(
              (item, index) => (
                <div
                  key={`top-${index}`}
                  className="flex shrink-0 items-center justify-center w-[280px] sm:w-[350px] md:w-[420px]"
                >
                  <div className="relative group overflow-hidden rounded-2xl shadow-sm bg-slate-100 dark:bg-emerald-950/25 w-full border border-slate-200/60 dark:border-white/5">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Row 2 - Bottom Row (Last 4 Images - Left to Right Scroll) */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-ltr flex w-max flex-nowrap items-center gap-4">
            {[...rowTwoImages, ...rowTwoImages, ...rowTwoImages].map(
              (item, index) => (
                <div
                  key={`bottom-${index}`}
                  className="flex shrink-0 items-center justify-center w-[280px] sm:w-[350px] md:w-[420px]"
                >
                  <div className="relative group overflow-hidden rounded-2xl shadow-sm bg-slate-100 dark:bg-emerald-950/25 w-full border border-slate-200/60 dark:border-white/5">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </motion.div>

      {/* 🌟 Bottom Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center px-4 relative z-10"
      >
        <p className="inline-block px-6 py-3 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-base md:text-lg font-semibold shadow-sm">
          ✨ আমাদের বিশ্বাস, ভালো ফলাফলের পাশাপাশি ভালো মানুষ হওয়াটাই প্রকৃত
          শিক্ষা।
        </p>
      </motion.div>
    </section>
  );
}
