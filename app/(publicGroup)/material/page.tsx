"use client";

import React, { useState, useEffect } from "react";
import { Search, FileText, Sparkles, Dna, GraduationCap, Users, Calendar, Lock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPdfs } from "@/app/(dashbordGroup)/moderator_dashbord/_actions/pdf";

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
  "Preparing study materials...",
  "Organizing chapters...",
  "Loading PDFs...",
  "Almost ready...",
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

interface IPdf {
  id?: string;
  _id?: string;
  title: string;
  subject?: string;
  className?: string;
  pdfUrl?: string;
  link?: string;
  image?: string;
  createdAt?: string;
}

export default function PdfPage() {
  const [pdfs, setPdfs] = useState<IPdf[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"HSC" | "SSC">("HSC");
  
  // মডাল কন্ট্রোল করার জন্য স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pdfResponse, userResponse] = await Promise.all([
          getPdfs(),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://amader-patshal-backend.vercel.app"}/api/auth/me`, {
            credentials: "include"
          }).then(res => res.json()).catch(() => null)
        ]);

        if (userResponse?.success && userResponse?.data?.role) {
          setUserRole(userResponse.data.role);
        }

        const rawData = Array.isArray(pdfResponse) ? pdfResponse : pdfResponse?.data;
        if (pdfResponse?.success && Array.isArray(rawData)) {
          const formatted = rawData.map((item: Record<string, unknown>) => ({
            ...(item as unknown as IPdf),
            id: (item._id as string) || (item.id as string) || "",
            pdfUrl: (item.pdfUrl as string) || (item.link as string) || "",
            image: (item.image as string) || "",
            title: (item.title as string) || "",
            subject: (item.subject as string) || "",
            className: (item.className as string) || "",
            createdAt: (item.createdAt as string) || new Date().toISOString().split("T")[0],
          }));
          setPdfs(formatted);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPdfs = pdfs.filter((pdf) => {
    const className = (pdf.className || "").toLowerCase();
    const isSsc = className.includes("ssc") || className.includes("class 9") || className.includes("class 10");
    
    if (activeTab === "SSC" && !isSsc) return false;
    if (activeTab === "HSC" && isSsc) return false;

    const query = searchTerm.toLowerCase();
    return (
      (pdf.title || "").toLowerCase().includes(query) ||
      (pdf.subject || "").toLowerCase().includes(query) ||
      (pdf.className || "").toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <GlobalLoading />;
  }

  return (
    <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-400/10 dark:bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300/50 dark:border-emerald-800/60 rounded-full mb-4 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span className="text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-widest">
              স্টাডি ম্যাটেরিয়ালস ও লেকচার শিট
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-emerald-50 tracking-tight leading-tight">
            সকল পিডিএফ লেকচার শিট
          </h1>
          
          <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 rounded-full mt-4 mb-6 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
          
          <p className="text-slate-600 dark:text-emerald-100/70 max-w-2xl text-base md:text-lg font-medium leading-relaxed">
            আপনার প্রয়োজনীয় অধ্যায়ের নোট বা পিডিএফ সহজে খুঁজে পেতে নিচের অপশনগুলো ব্যবহার করুন।
          </p>
        </div>

        <div className="flex justify-center animate-in fade-in duration-700">
          <div className="flex p-1.5 bg-white/90 dark:bg-[#071712]/90 backdrop-blur-2xl rounded-2xl shadow-xl shadow-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40">
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

        <div className="flex justify-center animate-in fade-in duration-700 mt-6 w-full px-4">
          <div className="relative w-full max-w-3xl group z-20">
            <div className="absolute -inset-1.5 bg-emerald-400/40 dark:bg-emerald-600/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70" />
            <div className="relative flex items-center bg-white/95 dark:bg-[#040f0a]/95 backdrop-blur-xl rounded-full border border-emerald-100/60 dark:border-emerald-800/50 p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-emerald-400/60 transition-all duration-300">
              <div className="pl-4 pr-3 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="অধ্যায়ের নাম, বিষয় বা ক্লাস দিয়ে সার্চ করুন..."
                className="w-full bg-transparent text-slate-800 dark:text-emerald-50 placeholder-slate-400 dark:placeholder-emerald-200/50 focus:outline-none font-semibold text-base sm:text-lg px-2"
              />
              <button 
                type="button"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#00a859] to-emerald-600 hover:from-[#00904c] hover:to-emerald-700 text-white rounded-full font-extrabold text-sm shadow-[0_4px_15px_rgba(0,168,89,0.3)] hover:shadow-[0_6px_20px_rgba(0,168,89,0.4)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                সার্চ করুন
              </button>
            </div>
          </div>
        </div>

        {filteredPdfs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {filteredPdfs.map((pdf, index) => (
              <div 
                key={pdf.id || index}
                className="group relative h-[410px] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2.5 animate-in fade-in slide-in-from-bottom-8 border border-emerald-900/30 bg-slate-900"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
              >
                {pdf.image ? (
                  <img 
                    src={pdf.image} 
                    alt={pdf.title} 
                    className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-85" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 to-slate-950 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-emerald-500/40" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 group-hover:from-black transition-colors duration-300" />

                <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-emerald-500/30 text-emerald-300 shadow-lg">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold tracking-wide">
                      {pdf.createdAt ? new Date(pdf.createdAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }) : 'সাম্প্রতিক'}
                    </span>
                  </div>

                  {pdf.className && (
                    <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-[11px] rounded-full shadow-lg border border-emerald-400/30">
                      {pdf.className}
                    </span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col items-center text-center space-y-4">
                  
                  {pdf.subject && (
                    <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800/60 backdrop-blur-md">
                      {pdf.subject}
                    </span>
                  )}

                  <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md line-clamp-2">
                    {pdf.title}
                  </h3>

                  {/* 🌟 স্টুডেন্ট হলে সবুজ বাটন, অন্য রোল হলে লাল বাটন যা ক্লিক করলে মডাল ওপেন হবে */}
                  {pdf.pdfUrl && (
                    userRole?.toUpperCase() === "STUDENT" ? (
                      <a
                        href={pdf.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#00a859] hover:bg-[#00904c] text-white font-extrabold text-sm shadow-[0_4px_20px_rgba(0,168,89,0.4)] transition-all duration-300 hover:scale-[1.02]"
                      >
                        <FileText className="w-4 h-4" />
                        PDF দেখুন
                      </a>
                    ) : (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-[0_4px_20px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        শুধুমাত্র স্টুডেন্টদের জন্য
                      </button>
                    )
                  )}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-700">
            <div className="px-10 py-10 bg-white/85 dark:bg-[#05130d]/85 backdrop-blur-2xl border border-emerald-100 dark:border-emerald-900/40 rounded-3xl text-center shadow-2xl max-w-md">
              <h3 className="text-2xl font-black text-slate-800 dark:text-emerald-100 mb-2">
                কোনো পিডিএফ পাওয়া যায়নি
              </h3>
              <p className="text-slate-500 dark:text-emerald-200/60 font-medium text-sm">
                {searchTerm ? "আপনার সার্চের সাথে মিলে এমন কোনো পিডিএফ নেই।" : `বর্তমানে ${activeTab} এর জন্য কোনো পিডিএফ আপলোড করা হয়নি।`}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* 🌟 কাস্টম প্রিমিয়াম মডাল (Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* ব্যাকগ্রাউন্ড ব্লার ওভারলে */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* মডাল কন্টেন্ট বক্স */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-md bg-white dark:bg-[#06140f] border border-emerald-200 dark:border-emerald-900/80 rounded-[2.5rem] shadow-2xl p-8 text-center space-y-6 z-10"
            >
              {/* ক্লোজ বাটন */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-emerald-950/50 text-slate-500 dark:text-emerald-300 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* আইকন */}
              <div className="w-20 h-20 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-red-200 dark:border-red-900/40">
                <Lock className="w-10 h-10" />
              </div>

              {/* টেক্সট মেসেজ */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-emerald-50 tracking-tight">
                  অ্যাক্সেস সীমিত (Restricted)
                </h3>
                <p className="text-slate-600 dark:text-emerald-200/80 text-sm font-semibold leading-relaxed px-2">
                  পিডিএফ দেখতে হলে স্টুডেন্ট হওয়ার জন্য অনুরোধ করুন।
                </p>
              </div>

              {/* অ্যাকশন বাটন */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                বুঝেছি
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}