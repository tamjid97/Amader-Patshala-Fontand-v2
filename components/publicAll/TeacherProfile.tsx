'use client'

import React, { useState } from "react";
import Image from "next/image";
import sir1 from "@/public/sir 1.jpeg";
import sir2 from "@/public/sir2.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Phone, Quote, Award } from "lucide-react";

export default function TeacherProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-emerald-300/10 dark:bg-emerald-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* 🌟 Animated Section Title */}
      <div className="mb-14 text-center px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
        >
          <Award className="w-4 h-4 text-emerald-500" />
          <span>প্রতিষ্ঠাতা ও শিক্ষক</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
        >
          শিক্ষার্থীদের আস্থার নাম
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

      {/* 🌟 Main Card with Scroll Animation */}
      <div className="container mx-auto px-4 flex justify-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="group relative w-full max-w-[380px] rounded-[2rem] bg-white/90 backdrop-blur-sm dark:bg-[#05130e]/90 shadow-[0_15px_40px_-10px_rgba(4,120,87,0.15)] dark:shadow-[0_15px_40px_-10px_rgba(5,150,105,0.2)] transition-all duration-500 border border-emerald-100/60 dark:border-emerald-900/50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5 hover:ring-emerald-300/50 dark:hover:ring-emerald-700/50"
        >
          <div className="relative h-[340px] w-full overflow-hidden bg-emerald-100 dark:bg-emerald-900/30">
            <Image
              src={sir1} 
              alt="Sarfaraz Islam"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
            
            <div className="absolute bottom-0 left-0 p-6 text-left w-full transform transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-tight">Sarfaraz Islam</h3>
              <p className="mt-1.5 text-sm font-semibold text-emerald-300 drop-shadow-md flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> BSC: Zoology | MSC: Fisheries
              </p>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30">
                <p className="text-xs font-semibold text-emerald-100">
                  Founder: Roots Of Biology
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 text-center relative bg-white dark:bg-[#05130e]">
            <Quote className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 text-emerald-100 dark:text-emerald-900/40 -z-0" />
            <p className="mb-7 text-lg font-semibold italic text-slate-700 dark:text-slate-300 px-2 relative z-10 leading-relaxed">
              "তোমাদের আস্থা আমাদের কাছে আমানত স্বরূপ"
            </p>
            <button
              onClick={toggleModal}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/50 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <span className="text-[15px] tracking-wide">View Details</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🌟 Advanced Animated Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl transition-all"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[520px] rounded-[2.5rem] bg-white p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] dark:bg-[#071a13] border border-emerald-100 dark:border-emerald-800/50 md:p-10 overflow-hidden z-10"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-400/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-400/20 blur-3xl rounded-full pointer-events-none" />

              <button
                onClick={toggleModal}
                className="absolute right-5 top-5 rounded-full bg-emerald-50 p-2.5 text-emerald-600 transition-all duration-300 hover:bg-red-50 hover:text-red-500 hover:rotate-90 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center mt-2 relative z-10">
                <div className="relative mb-5 h-36 w-36 rounded-full border-[5px] border-white dark:border-[#071a13] shadow-[0_0_25px_rgba(16,185,129,0.4)] overflow-hidden bg-emerald-100 ring-4 ring-emerald-500/30">
                  <Image
                    src={sir2} 
                    alt="সরফরাজ ইসলাম"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-emerald-50 mb-1.5 tracking-tight">
                  সরফরাজ ইসলাম
                </h3>
                
                <div className="flex flex-col items-center gap-2 mt-2 text-[15px] font-semibold text-slate-600 dark:text-emerald-200/90">
                  <span className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/60">
                    <GraduationCap className="h-4 w-4 text-emerald-500" />
                    B.Sc. in Zoology | M.Sc. in Fisheries
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">Founder: Roots Of Biology</span>
                  <span className="flex items-center gap-2 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 rounded-full text-white shadow-md shadow-emerald-500/20">
                    <Phone className="h-4 w-4" />
                    Mobile: 01922555575
                  </span>
                </div>
              </div>

              <div className="mt-8 relative z-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-inner dark:bg-emerald-950/20 dark:border-emerald-800/50 backdrop-blur-sm">
                <Quote className="absolute -top-3 -left-2 w-8 h-8 text-emerald-300 dark:text-emerald-800 bg-white dark:bg-[#071a13] rounded-full p-1" />
                <p className="text-[15px] md:text-base leading-relaxed text-slate-700 dark:text-emerald-100/90 text-justify font-medium">
                  প্রিয় শিক্ষার্থীরা, জীববিজ্ঞান শুধু একটি বিষয় নয়—এটি জীবনের ভাষা। প্রতিটি কোষ, প্রতিটি অঙ্গ আর প্রতিটি প্রক্রিয়ার ভেতর লুকিয়ে আছে সৃষ্টির অসাধারণ নিয়ম। মুখস্থ নয়, বোঝার চেষ্টা করলেই বায়োলজি সহজ ও আনন্দদায়ক হয়ে উঠবে। ভুল করলে ভয় পেও না, কারণ ভুল থেকেই শেখার শুরু। নিয়মিত পড়াশোনা আর প্রশ্ন করার অভ্যাস তোমাকে অন্যদের থেকে এগিয়ে রাখবে। মনে রেখো, আজকের পরিশ্রমই আগামী দিনের সাফল্যের ভিত্তি। নিজের ওপর বিশ্বাস রাখো, তুমি পারবে।
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}