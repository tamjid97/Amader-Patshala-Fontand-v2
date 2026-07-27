"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dna } from "lucide-react";

// 🌟 কিউট কার্টুন ফ্লাস্ক (Biology Theme) 🌟
const CartoonFlask = () => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="relative flex justify-center items-center"
  >
    <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-2xl">
      {/* ফ্লাস্কের বডি (Glass) */}
      <path
        d="M40 20 L40 40 L20 80 A10 10 0 0 0 30 95 L70 95 A10 10 0 0 0 80 80 L60 40 L60 20 Z"
        className="fill-emerald-200 dark:fill-emerald-900/80 stroke-emerald-500 dark:stroke-emerald-400"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      
      {/* ভেতরের তরল পদার্থ (Liquid) */}
      <motion.path
        animate={{ d: [
          "M23 75 Q50 65 77 75 L70 90 A5 5 0 0 1 65 95 L35 95 A5 5 0 0 1 30 90 Z",
          "M23 75 Q50 85 77 75 L70 90 A5 5 0 0 1 65 95 L35 95 A5 5 0 0 1 30 90 Z"
        ]}}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="fill-emerald-500 dark:fill-emerald-500"
      />

      {/* কিউট চোখ (Eyes) */}
      <motion.circle cx="40" cy="78" r="4" fill="white" />
      <motion.circle cx="60" cy="78" r="4" fill="white" />
      <motion.circle 
        animate={{ cx: [41, 39, 41] }} 
        transition={{ duration: 3, repeat: Infinity }} 
        cx="41" cy="78" r="2" fill="black" 
      />
      <motion.circle 
        animate={{ cx: [61, 59, 61] }} 
        transition={{ duration: 3, repeat: Infinity }} 
        cx="61" cy="78" r="2" fill="black" 
      />

      {/* কিউট হাসি (Smile) */}
      <path
        d="M46 86 Q50 90 54 86"
        stroke="white"
        strokeWidth="2.5"
        fill="transparent"
        strokeLinecap="round"
      />

      {/* ফ্লাস্কের বুদবুদ (Bubbles) */}
      <motion.circle animate={{ y: [0, -40], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} cx="45" cy="60" r="3" className="fill-emerald-300" />
      <motion.circle animate={{ y: [0, -50], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} cx="55" cy="65" r="4" className="fill-emerald-200" />
      <motion.circle animate={{ y: [0, -35], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1 }} cx="35" cy="70" r="2" className="fill-emerald-100" />
    </svg>
  </motion.div>
);

const loadingTexts = [
  "Preparing lab materials...",
  "Extracting DNA samples...",
  "Loading bio-data...",
  "Warming up the microscope...",
];

export default function GlobalLoading() {
  const [textIndex, setTextIndex] = useState(0);

  // 🌟 Lazy Initial State ব্যবহার করে এররটি চিরতরে সমাধান করা হয়েছে 🌟
  const [backgroundElements] = useState(() =>
    [...Array(6)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      xOffset: Math.random() * 50 - 25,
      duration: 8 + Math.random() * 5,
    }))
  );

  // 🌟 useEffect এখন শুধুমাত্র টেক্সট পরিবর্তনের ইন্টারভালের জন্য ব্যবহৃত হচ্ছে 🌟
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-emerald-50/90 dark:bg-[#030a08]/90 backdrop-blur-md transition-colors duration-500 overflow-hidden">
      
      {/* 🌟 ব্যাকগ্রাউন্ডে ভাসমান মলিকিউল/ডিএনএ 🌟 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        {backgroundElements.map((el, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, el.xOffset, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              top: `${el.top}%`,
              left: `${el.left}%`,
            }}
          >
            <Dna className="w-12 h-12 text-emerald-600" />
          </motion.div>
        ))}
      </div>

      {/* 🌟 মেইন কন্টেন্ট 🌟 */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        <CartoonFlask />

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Dna className="w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">Roots Of Biology</span>
          </div>

          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-emerald-600/80 dark:text-emerald-400/80"
          >
            {loadingTexts[textIndex]}
          </motion.div>
        </div>

        <div className="w-48 h-1.5 bg-emerald-200/50 dark:bg-emerald-900/50 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

      </div>
    </div>
  );
}