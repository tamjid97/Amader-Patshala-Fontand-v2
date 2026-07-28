"use client";

import React, { useState, useEffect } from "react";
import { Clock, CalendarDays, BookOpen, GraduationCap, Users, Dna, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { getBatchTime } from "@/app/(dashbordGroup)/moderator_dashbord/_actions/batchTime";

const BACKGROUND_ELEMENTS = [
  { top: 12, left: 10, xOffset: -15, duration: 9 },
  { top: 65, left: 82, xOffset: 20, duration: 11 },
  { top: 38, left: 20, xOffset: -10, duration: 8 },
  { top: 85, left: 15, xOffset: 15, duration: 12 },
  { top: 22, left: 78, xOffset: -25, duration: 10 },
  { top: 55, left: 60, xOffset: 18, duration: 13 },
];

const CartoonFlask = () => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    className="relative flex justify-center items-center"
  >
    <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
      <path
        d="M40 20 L40 40 L20 80 A10 10 0 0 0 30 95 L70 95 A10 10 0 0 0 80 80 L60 40 L60 20 Z"
        className="fill-emerald-200/90 dark:fill-emerald-950/80 stroke-emerald-500 dark:stroke-emerald-400"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <motion.path
        animate={{ d: [
          "M23 75 Q50 65 77 75 L70 90 A5 5 0 0 1 65 95 L35 95 A5 5 0 0 1 30 90 Z",
          "M23 75 Q50 85 77 75 L70 90 A5 5 0 0 1 65 95 L35 95 A5 5 0 0 1 30 90 Z"
        ]}}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="fill-emerald-500 dark:fill-emerald-400"
      />
      <motion.circle cx="40" cy="78" r="4" fill="white" />
      <motion.circle cx="60" cy="78" r="4" fill="white" />
      <motion.circle animate={{ cx: [41, 39, 41] }} transition={{ duration: 3, repeat: Infinity }} cx="41" cy="78" r="2" fill="black" />
      <motion.circle animate={{ cx: [61, 59, 61] }} transition={{ duration: 3, repeat: Infinity }} cx="61" cy="78" r="2" fill="black" />
      <path d="M46 86 Q50 90 54 86" stroke="white" strokeWidth="2.5" fill="transparent" strokeLinecap="round" />
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

function GlobalLoading() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-emerald-50/90 dark:bg-[#030a08]/90 backdrop-blur-xl transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-15">
        {BACKGROUND_ELEMENTS.map((el, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -100, 0], x: [0, el.xOffset, 0], rotate: [0, 360] }}
            transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{ top: `${el.top}%`, left: `${el.left}%` }}
          >
            <Dna className="w-12 h-12 text-emerald-600" />
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <CartoonFlask />
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Dna className="w-5 h-5" />
            </motion.div>
            <span className="text-xl font-extrabold tracking-tight">Roots Of Biology</span>
          </div>
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-emerald-600/90 dark:text-emerald-400/90"
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

interface IBatch {
  _id?: string;
  id?: string;
  batchName: string;
  date: string;
  classTime: string;
}

export default function BatchTimePage() {
  const [batches, setBatches] = useState<IBatch[]>([]);
  const [activeTab, setActiveTab] = useState<"HSC" | "SSC">("HSC");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await getBatchTime();
        if (response?.success && Array.isArray(response?.data)) {
          setBatches(response.data);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const filteredBatches = batches.filter((batch) => {
    const name = (batch.batchName || "").toLowerCase();
    if (activeTab === "SSC") return name.includes("ssc");
    if (activeTab === "HSC") return !name.includes("ssc");
    return false;
  });

  if (loading) {
    return <GlobalLoading />;
  }

  return (
    <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-400/10 dark:bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-14">
        
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300/50 dark:border-emerald-800/60 rounded-full mb-4 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span className="text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-widest">
              আমাদের চলমান ব্যাচসমূহ
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-emerald-50 tracking-tight leading-tight">
            ব্যাচ শিডিউল ও সময়
          </h1>
          
          <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 rounded-full mt-4 mb-6 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
          
          <p className="text-slate-600 dark:text-emerald-100/70 max-w-2xl text-base md:text-lg font-medium leading-relaxed">
            আপনার প্রয়োজনীয় ব্যাচের সময় ও দিন এখান থেকে দেখে নিন — ক্লাসের শিডিউল অনুযায়ী নিজেকে প্রস্তুত রাখুন।
          </p>
        </div>

        <div className="flex justify-center animate-in fade-in duration-700">
          <div className="flex p-1.5 bg-white/80 dark:bg-[#071712]/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-950/5 border border-emerald-100 dark:border-emerald-900/40">
            <button
              onClick={() => setActiveTab("HSC")}
              className={`flex items-center gap-2.5 px-8 py-3 rounded-xl font-extrabold text-sm transition-all duration-300 ${
                activeTab === "HSC"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-100"
                  : "text-slate-600 dark:text-emerald-200/70 hover:text-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 scale-95"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              HSC Batches
            </button>

            <button
              onClick={() => setActiveTab("SSC")}
              className={`flex items-center gap-2.5 px-8 py-3 rounded-xl font-extrabold text-sm transition-all duration-300 ${
                activeTab === "SSC"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-100"
                  : "text-slate-600 dark:text-emerald-200/70 hover:text-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 scale-95"
              }`}
            >
              <Users className="w-5 h-5" />
              SSC Batches
            </button>
          </div>
        </div>

        {filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBatches.map((batch, index) => (
              <div 
                key={batch._id || batch.id || index}
                className="group relative rounded-[2.2rem] transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 120}ms`, animationFillMode: "both" }}
              >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/20 via-teal-400/10 to-emerald-500/20 rounded-[2.25rem] blur-sm opacity-50 group-hover:opacity-100 group-hover:from-emerald-500 group-hover:to-teal-400 transition-all duration-500" />

                <div className="relative h-full bg-white/90 dark:bg-[#05130d]/90 backdrop-blur-2xl rounded-[2.2rem] p-8 border border-emerald-100/80 dark:border-emerald-900/30 flex flex-col justify-between overflow-hidden shadow-xl shadow-emerald-950/[0.03]">
                  
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800/60 rounded-2xl text-emerald-600 dark:text-emerald-400 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      
                      <span className="px-3.5 py-1 bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
                        Active Batch
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 dark:text-emerald-50 leading-snug tracking-tight">
                      {batch.batchName}
                    </h3>
                  </div>

                  <div className="w-full h-px bg-slate-100 dark:bg-emerald-900/30 my-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors" />

                  <div className="relative z-10 space-y-3.5">
                    
                    <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#020a07]/60 border border-slate-100 dark:border-emerald-900/30 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50 transition-colors">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-extrabold text-slate-400 dark:text-emerald-200/50 uppercase tracking-widest">
                          Class Days
                        </span>
                        <span className="text-slate-800 dark:text-emerald-100 font-bold text-sm">
                          {batch.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#020a07]/60 border border-slate-100 dark:border-emerald-900/30 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50 transition-colors">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-extrabold text-slate-400 dark:text-emerald-200/50 uppercase tracking-widest">
                          Class Time
                        </span>
                        <span className="text-slate-800 dark:text-emerald-100 font-bold text-sm">
                          {batch.classTime}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-700">
            <div className="px-10 py-8 bg-white/80 dark:bg-[#05130d]/80 backdrop-blur-2xl border border-emerald-100 dark:border-emerald-900/40 rounded-3xl text-center shadow-xl">
              <h3 className="text-2xl font-black text-slate-800 dark:text-emerald-100 mb-2">
                কোনো ব্যাচ পাওয়া যায়নি
              </h3>
              <p className="text-slate-500 dark:text-emerald-200/60 font-medium">
                বর্তমানে {activeTab} এর জন্য কোনো ব্যাচের সময়সূচী যুক্ত করা নেই।
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}