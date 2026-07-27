'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Terminal, MessageSquareText, ExternalLink, Sparkles, UserCircle } from "lucide-react";

export default function ProfessionalComingSoon() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-[#020806] flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans text-slate-200">
      
      {/* 🌟 Professional Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* 🌟 Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* 🌟 Main Glass Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-slate-950/40 border border-emerald-900/50 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl shadow-emerald-950/30"
      >
        
        {/* ================= LEFT COLUMN: ANIMATION ================= */}
        <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[350px] bg-emerald-950/10 rounded-2xl border border-emerald-900/30 overflow-hidden group">
          
          {/* Subtle Radar/Pulse in background */}
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-64 h-64 border border-emerald-500/20 rounded-full" />
          <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} className="absolute w-96 h-96 border border-emerald-500/20 rounded-full" />

          {/* Animated SVG Character */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 z-10">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_10px_25px_rgba(16,185,129,0.2)]">
              <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                {/* Body */}
                <path d="M140 290 C140 225, 260 225, 260 290 L270 330 L130 330 Z" fill="#047857" />
                <path d="M185 240 L200 265 L215 240" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <rect x="188" y="210" width="24" height="25" rx="6" fill="#fed7aa" />

                {/* Head */}
                <motion.g animate={{ rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "200px 180px" }}>
                  <rect x="160" y="135" width="80" height="80" rx="28" fill="#ffedd5" />
                  <path d="M155 150 C155 110, 245 110, 245 150 L245 130 C245 105, 155 105, 155 130 Z" fill="#065f46" />
                  <rect x="145" y="142" width="110" height="12" rx="6" fill="#10b981" />
                  
                  {/* Blinking Eyes */}
                  <motion.ellipse cx="182" cy="170" rx="5" ry="6" fill="#0f172a" animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.6, 0.65, 1] }} />
                  <motion.ellipse cx="218" cy="170" rx="5" ry="6" fill="#0f172a" animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.6, 0.65, 1] }} />
                  
                  {/* Glasses */}
                  <rect x="172" y="160" width="22" height="18" rx="5" fill="none" stroke="#0f172a" strokeWidth="3" />
                  <rect x="206" y="160" width="22" height="18" rx="5" fill="none" stroke="#0f172a" strokeWidth="3" />
                  <line x1="194" y1="168" x2="206" y2="168" stroke="#0f172a" strokeWidth="3" />
                  <path d="M193 186 Q200 193 207 186" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>

                {/* Laptop & Typing */}
                <path d="M135 285 L265 285 L285 305 L115 305 Z" fill="#1e293b" />
                <path d="M145 285 L255 285 L265 300 L135 300 Z" fill="#334155" />
                <rect x="155" y="215" width="90" height="65" rx="6" fill="#020617" stroke="#1e293b" strokeWidth="3" />
                
                {/* Code Lines */}
                <motion.line x1="165" y1="230" x2="210" y2="230" stroke="#10b981" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <motion.line x1="165" y1="242" x2="230" y2="242" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                <motion.line x1="165" y1="254" x2="195" y2="254" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />
                
                <motion.circle cx="172" cy="290" r="9" fill="#ffedd5" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }} />
                <motion.circle cx="228" cy="290" r="9" fill="#ffedd5" animate={{ y: [-4, 0, -4] }} transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }} />
              </motion.g>

              {/* Floating Items */}
              <motion.g animate={{ y: [-8, 8, -8] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                <rect x="75" y="220" width="22" height="26" rx="5" fill="#ef4444" />
                <motion.path d="M82 212 Q86 205 82 200" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" animate={{ opacity: [0, 1, 0], y: [-2, -8, -12] }} transition={{ duration: 2, repeat: Infinity }} />
              </motion.g>
              <motion.g animate={{ y: [10, -10, 10], rotate: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <rect x="285" y="160" width="50" height="36" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="295" y="183" fill="#10b981" fontSize="15" fontWeight="bold">&lt;/&gt;</text>
              </motion.g>
            </svg>
          </div>

          <div className="absolute bottom-4 flex gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse delay-75" />
             <div className="w-2 h-2 rounded-full bg-emerald-500/20 animate-pulse delay-150" />
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONTENT ================= */}
        <div className="flex flex-col justify-center text-left space-y-6 lg:pl-4">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-900/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-800/50">
              <Sparkles className="w-3 h-3" /> System Upgrade
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              কাজ দ্রুত এগিয়ে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">চলছে!</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            ডিজাইন থেকে শুরু করে কোডিং—সবটাই সিঙ্গেল-হ্যান্ডেল করছি তো, তাই একটু দেরি হচ্ছে! আশা করি খুব শীঘ্রই আপনাদের মনমতো ফিচারটি পেয়ে যাবেন।
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-inner">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal className="w-3 h-3" /> Compiling features...
              </span>
              <span>85%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full"
                animate={{ width: ["20%", "85%", "85%"] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
              />
            </div>
          </div>

          {/* 🌟 Portfolio & Feedback Box */}
          <div className="w-full bg-gradient-to-r from-emerald-950/40 to-slate-900/40 border border-emerald-900/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-900/50 rounded-lg shrink-0">
                <UserCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm md:text-base">নতুন ফিচারের আইডিয়া বা মতামত আছে?</h3>
              </div>
            </div>
            
            {/* Styled Direct Message Button */}
            <a 
              href="https://epickdev.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group shrink-0 inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-950/50 transition-all text-sm font-medium"
            >
              <MessageSquareText className="w-4 h-4 shrink-0 text-emerald-200 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="leading-tight font-semibold">আমাকে মেসেজ দিন</span>
                <span className="text-[11px] text-emerald-100/80 font-normal">পোর্টফোলিও ভিজিট করুন</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Navigation Actions */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-1">
              {/* Outline Back Button */}
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-emerald-500/50 bg-emerald-950/10 text-emerald-400 hover:bg-emerald-900/40 transition-all font-medium text-sm sm:text-base cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span>পূর্বের পেজে যান</span>
              </button>

              {/* Solid Green Home Button */}
              <Link href="/">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00a86b] hover:bg-emerald-500 text-white transition-all font-medium text-sm sm:text-base shadow-lg shadow-[#00a86b]/20 cursor-pointer active:scale-95">
                  <Home className="w-4 h-4 text-white" />
                  <span>হোমপেজে ফিরে যাই চলো</span>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}