'use client';

import React from "react";


// Premium Custom SVG Characters (Peekaboo effect)
const UniqueCharacters = [
  // ১. কিউট নিনজা বিড়াল
  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl" key="cat">
    <defs>
      <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    <path d="M20 90 C 20 40, 80 40, 80 90 Z" fill="url(#catGrad)" />
    <path d="M20 55 L 10 20 L 45 45 Z M80 55 L 90 20 L 55 45 Z" fill="#ea580c" />
    <circle cx="35" cy="65" r="6" fill="#1e293b" />
    <circle cx="65" cy="65" r="6" fill="#1e293b" />
    <circle cx="37" cy="63" r="2" fill="white" />
    <circle cx="67" cy="63" r="2" fill="white" />
    <path d="M45 75 Q 50 80 55 75" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>,
  // ২. কিউট টেডি বিয়ার
  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl" key="bear">
    <defs>
      <linearGradient id="bearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <circle cx="25" cy="40" r="16" fill="#78350f" />
    <circle cx="75" cy="40" r="16" fill="#78350f" />
    <circle cx="50" cy="75" r="38" fill="url(#bearGrad)" />
    <circle cx="50" cy="80" r="20" fill="#fef3c7" />
    <circle cx="38" cy="65" r="5" fill="#1e293b" />
    <circle cx="62" cy="65" r="5" fill="#1e293b" />
    <path d="M45 83 Q 50 88 55 83" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>,
  // ৩. রোবট বাডি
  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl" key="robot">
    <defs>
      <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect x="20" y="40" width="60" height="55" rx="15" fill="url(#botGrad)" />
    <rect x="47" y="10" width="6" height="30" fill="#94a3b8" />
    <circle cx="50" cy="10" r="8" fill="#fbbf24" className="animate-pulse" />
    <rect x="30" y="60" width="40" height="18" rx="6" fill="#0f172a" />
    <circle cx="40" cy="69" r="4" fill="#22d3ee" className="animate-pulse" />
    <circle cx="60" cy="69" r="4" fill="#22d3ee" className="animate-pulse" />
  </svg>,
  // ৪. লিটল মনস্টার
  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl" key="monster">
    <defs>
      <linearGradient id="monGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <path d="M15 95 C 15 30, 85 30, 85 95 Z" fill="url(#monGrad)" />
    <circle cx="50" cy="60" r="20" fill="white" />
    <circle cx="50" cy="60" r="9" fill="#1e293b" />
    <circle cx="53" cy="57" r="3" fill="white" />
    <path d="M35 85 Q 50 92 65 85" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>,
  // ৫. ম্যাজিক খরগোশ
  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl" key="bunny">
    <defs>
      <linearGradient id="bunnyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
    </defs>
    <ellipse cx="35" cy="35" rx="12" ry="35" fill="url(#bunnyGrad)" transform="rotate(-15 35 35)" />
    <ellipse cx="65" cy="35" rx="12" ry="35" fill="url(#bunnyGrad)" transform="rotate(15 65 35)" />
    <circle cx="50" cy="75" r="32" fill="url(#bunnyGrad)" />
    <circle cx="40" cy="70" r="5" fill="#1e293b" />
    <circle cx="60" cy="70" r="5" fill="#1e293b" />
    <circle cx="50" cy="78" r="4" fill="#fda4af" />
  </svg>,
  // ৬. কসমিক এলিয়েন
  <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl" key="alien">
    <defs>
      <linearGradient id="alienGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#84cc16" />
      </linearGradient>
    </defs>
    <path d="M50 95 C 5 95, 15 35, 50 35 C 85 35, 95 95, 50 95 Z" fill="url(#alienGrad)" />
    <circle cx="36" cy="60" r="4" fill="white" />
    <circle cx="64" cy="60" r="4" fill="white" />
    <path d="M30 35 Q 20 15 10 25" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
];

const categories = [
  { id: 0, type: "HSC", year: "27", icon: "🏆", badge: "২০২৬ সালে ভর্তি চলছে", colorClass: "bg-gradient-to-b from-[#0B1D3A] to-[#043D5C]", glow: "shadow-[0_15px_30px_rgba(10,135,158,0.25)]" },
  { id: 1, type: "HSC", year: "28", icon: "🎯", badge: "২০২৬ সালে ভর্তি চলছে", colorClass: "bg-gradient-to-b from-[#1E0B3A] to-[#431B6D]", glow: "shadow-[0_15px_30px_rgba(157,54,179,0.25)]" },
  { id: 2, type: "SSC", year: "27", icon: "🎒", badge: "২০২৬ সালে ভর্তি চলছে", colorClass: "bg-gradient-to-b from-[#3A180B] to-[#6b2c05]", glow: "shadow-[0_15px_30px_rgba(217,108,24,0.25)]" },
  { id: 3, type: "SSC", year: "28", icon: "📜", badge: "২০২৬ সালে ভর্তি চলছে", colorClass: "bg-gradient-to-b from-[#3A0B1A] to-[#6b102e]", glow: "shadow-[0_15px_30px_rgba(229,50,101,0.25)]" },
  { id: 4, type: "SSC", year: "FRB", icon: "⚡", badge: "২০২৬ সালে ভর্তি চলছে", colorClass: "bg-gradient-to-b from-[#290B3A] to-[#500f59]", glow: "shadow-[0_15px_30px_rgba(207,38,121,0.25)]" },
  { id: 5, type: "CLASS", year: "9", icon: "📚", badge: "২০২৬ সালে ভর্তি চলছে", colorClass: "bg-gradient-to-b from-[#0B3A23] to-[#095431]", glow: "shadow-[0_15px_30px_rgba(21,176,99,0.25)]" },
];

export default function CategoryCards() {
  const soundUrl = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"; 




  return (
    <section className="relative w-full pt-6 pb-16 sm:pt-10 sm:pb-24 bg-transparent font-sans  overflow-hidden">
      
      {/* Background Decorative Premium Orbs */}
      <div className="absolute top-1/4 left-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-12 sm:mb-20 px-2">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 drop-shadow-sm leading-tight">
            &ldquo;খুলনায় সবচেয়ে সমৃদ্ধ বায়োলজি,
          </h2>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 drop-shadow-sm mt-2 sm:mt-3">
            লজিক ও বেসিক কনসেপ্ট-এর জগতে স্বাগতম&rdquo;
          </h3>
        </div>
        
        {/* Grid Layout - Mobile: 2 Columns Side by Side, Tablet: 3, Desktop: 6 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-3 sm:gap-x-6 gap-y-24 sm:gap-y-28 mt-4 sm:mt-8 px-1 sm:px-0">
          {categories.map((item, index) => {
            const waveAnimationClass = `animate-wave-${index}`;

            return (
              <div key={item.id} className="relative group w-full flex flex-col items-center mt-10 sm:mt-12">
                
                {/* === PEEKABOO CARTOON (Triangle Sequential Wave) === */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none z-0 overflow-visible">
                  <div className={`w-full h-full flex items-center justify-center ${waveAnimationClass}`}>
                    {UniqueCharacters[index]}
                  </div>
                </div>

                {/* === MAIN PREMIUM 3D CARD (z-10 to stay strictly in front of the cartoon) === */}
                <div 
                  
                  className={`relative w-full h-[170px] sm:h-[200px] cursor-pointer rounded-[22px] sm:rounded-[28px] z-10 transition-all duration-500 hover:-translate-y-2.5 hover:scale-[1.04] ${item.glow} shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}
                >
                  {/* Premium Glossy Inner Block */}
                  <div className={`relative w-full h-full rounded-[22px] sm:rounded-[28px] overflow-hidden flex flex-col items-center justify-start pt-4 sm:pt-6 ${item.colorClass} border border-white/30 border-b-black/60 shadow-[inset_0_4px_15px_rgba(255,255,255,0.25),_inset_0_-4px_15px_rgba(0,0,0,0.4)]`}>
                    
                    {/* Super Glossy Top Highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                    {/* Subtle Diagonal Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 mix-blend-overlay group-hover:opacity-100 opacity-50 transition-opacity duration-700 pointer-events-none" />

                    {/* === TEXT AT THE TOP === */}
                    <div className="relative z-20 text-center flex flex-col items-center">
                      <span className="text-[13px] sm:text-[16px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/90 mb-0.5 sm:mb-1 drop-shadow-md">
                        {item.type}
                      </span>
                      <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70">
                        {item.year}
                      </h3>
                    </div>

                    {/* === GIANT ICON (Bottom Right) === */}
                    <div className="absolute -bottom-2 right-1 sm:right-2 z-10 opacity-90 group-hover:opacity-100 transition-transform duration-300 pointer-events-none group-hover:scale-110">
                      <span className="block text-[65px] sm:text-[85px] drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] animate-[float-icon-bottom_3.5s_ease-in-out_infinite]">
                        {item.icon}
                      </span>
                    </div>

                  </div>
                </div>

                {/* === DETACHED, BLINKING RED LAMP & ADMISSION TEXT === */}
                <div className="absolute -bottom-9 sm:-bottom-10 left-1/2 -translate-x-1/2 z-30 w-full flex justify-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="relative flex items-center justify-center cursor-pointer group/badge transition-transform duration-300 hover:scale-105"
                  >
                    {/* Soft Glowing Red Background Light */}
                    <div className="absolute -inset-1 bg-red-500 rounded-full blur-[10px] sm:blur-[12px] opacity-75 animate-[subtle-red-blink_1.6s_ease-in-out_infinite]"></div>
                    
                    {/* Compact Red Pill Button */}
                    <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-rose-600 border border-red-300/40 text-white rounded-full font-bold text-[11px] sm:text-[12px] tracking-wider uppercase shadow-[0_4px_20px_rgba(239,68,68,0.5)] flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-1.5 whitespace-nowrap">
                      {/* Small Pulsing White Dot */}
                      <span className="relative flex h-2 w-2 sm:h-2 sm:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2 sm:w-2 bg-white shadow-[0_0_6px_#fff]"></span>
                      </span>
                      {item.badge}
                    </div>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
      {/* Custom Keyframes for Triangle Sequence & Blinking Red Light */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave0 {
          0%, 5% { transform: translateY(45px); }
          10%, 75% { transform: translateY(-75px); }
          80%, 100% { transform: translateY(45px); }
        }
        @keyframes wave1 {
          0%, 10% { transform: translateY(45px); }
          15%, 70% { transform: translateY(-75px); }
          75%, 100% { transform: translateY(45px); }
        }
        @keyframes wave2 {
          0%, 15% { transform: translateY(45px); }
          20%, 65% { transform: translateY(-75px); }
          70%, 100% { transform: translateY(45px); }
        }
        @keyframes wave5 {
          0%, 20% { transform: translateY(45px); }
          25%, 60% { transform: translateY(-75px); }
          65%, 100% { transform: translateY(45px); }
        }
        @keyframes wave4 {
          0%, 25% { transform: translateY(45px); }
          30%, 55% { transform: translateY(-75px); }
          60%, 100% { transform: translateY(45px); }
        }
        @keyframes wave3 {
          0%, 30% { transform: translateY(45px); }
          35%, 50% { transform: translateY(-75px); }
          55%, 100% { transform: translateY(45px); }
        }

        /* Adjust rise height on larger screens */
        @media (min-width: 640px) {
          @keyframes wave0 { 0%, 5% { transform: translateY(45px); } 10%, 75% { transform: translateY(-88px); } 80%, 100% { transform: translateY(45px); } }
          @keyframes wave1 { 0%, 10% { transform: translateY(45px); } 15%, 70% { transform: translateY(-88px); } 75%, 100% { transform: translateY(45px); } }
          @keyframes wave2 { 0%, 15% { transform: translateY(45px); } 20%, 65% { transform: translateY(-88px); } 70%, 100% { transform: translateY(45px); } }
          @keyframes wave5 { 0%, 20% { transform: translateY(45px); } 25%, 60% { transform: translateY(-88px); } 65%, 100% { transform: translateY(45px); } }
          @keyframes wave4 { 0%, 25% { transform: translateY(45px); } 30%, 55% { transform: translateY(-88px); } 60%, 100% { transform: translateY(45px); } }
          @keyframes wave3 { 0%, 30% { transform: translateY(45px); } 35%, 50% { transform: translateY(-88px); } 55%, 100% { transform: translateY(45px); } }
        }

        .animate-wave-0 { animation: wave0 5s infinite linear; }
        .animate-wave-1 { animation: wave1 5s infinite linear; }
        .animate-wave-2 { animation: wave2 5s infinite linear; }
        .animate-wave-3 { animation: wave3 5s infinite linear; }
        .animate-wave-4 { animation: wave4 5s infinite linear; }
        .animate-wave-5 { animation: wave5 5s infinite linear; }
        
        @keyframes float-icon-bottom {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          50% { transform: translateY(-8px) scale(1.05) rotate(5deg); }
        }
        
        @keyframes subtle-red-blink {
          0%, 100% { opacity: 0.3; transform: scale(0.92); }
          50% { opacity: 0.95; transform: scale(1.1); }
        }
      `}} />
    </section>
  );
}