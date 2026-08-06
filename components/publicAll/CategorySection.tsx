'use client';

import React from "react";

const categories = [
  {
    id: 1,
    type: "HSC",
    year: "27",
    label: "HSC ২৭",
    icon: "🏆", 
    innerColor: "from-[#38bdf8] to-[#2563eb]",
    badge: null,
  },
  {
    id: 2,
    type: "HSC",
    year: "28",
    label: "HSC ২৮",
    icon: "🎯",
    innerColor: "from-[#38bdf8] to-[#2563eb]",
    badge: "২০২৬ সালে ভর্তি চলছে",
  },
  {
    id: 3,
    type: "SSC",
    year: "27",
    label: "SSC ২৭",
    icon: "🎒",
    innerColor: "from-[#fbbf24] to-[#f97316]",
    badge: null,
  },
  {
    id: 4,
    type: "SSC",
    year: "28",
    label: "SSC ২৮",
    icon: "📜",
    innerColor: "from-[#fbbf24] to-[#f97316]",
    badge: "২০২৬ সালে ভর্তি চলছে",
  },
  {
    id: 5,
    type: "SSC",
    year: "27-frb",
    label: "SSC '27 FRB",
    icon: "⚡",
    innerColor: "from-[#fbbf24] to-[#f97316]",
    badge: "২০২৬ সালে ভর্তি চলছে",
  },
  {
    id: 6,
    type: "CLASS",
    year: "9",
    label: "৯ম শ্রেণি",
    icon: "📚",
    innerColor: "from-[#4ade80] to-[#16a34a]",
    badge: "২০২৬ সালে ভর্তি চলছে",
  },
];

export default function CategoryCards() {
  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section with Smooth Fade-in */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-3 md:space-y-4 px-2 animate-[fadeIn_0.8s_ease-out]">
          <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold text-[#008a45] tracking-tight leading-tight drop-shadow-sm">
            &quot;খুলনায় সবচেয়ে সমৃদ্ধ বায়োলজি,
          </h2>
          <p className="text-xl md:text-3xl lg:text-3xl font-bold text-[#008a45]">
            লজিক ও বেসিক কনসেপ্ট-এর জগতে স্বাগতম&quot;
          </p>
        </div>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((item, index) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center opacity-0 animate-[slideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              
              {/* Outer Card with Smooth Hover Motion */}
              <div
                className="group cursor-pointer relative w-full p-2.5 rounded-[32px] bg-white/70 backdrop-blur-md border border-emerald-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,138,69,0.22)] transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02]"
              >
                {/* Inner 3D Box */}
                <div
                  className={`relative w-full aspect-[4/3] rounded-[24px] bg-gradient-to-br ${item.innerColor} flex flex-col items-center justify-center overflow-visible shadow-[inset_0_4px_12px_rgba(255,255,255,0.5),0_8px_16px_rgba(0,0,0,0.2)]`}
                >
                  {/* Glassy Top Highlight */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/25 rounded-t-[24px] rounded-b-[40px] blur-[1px] pointer-events-none"></div>

                  {/* Main Text Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-1">
                    <h3 className="text-white/95 text-lg md:text-xl font-extrabold tracking-wider drop-shadow-sm leading-none">
                      {item.type}
                    </h3>
                    <span className="text-white text-[32px] sm:text-4xl md:text-[42px] font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] mt-2 leading-none">
                      {item.year}
                    </span>
                  </div>
                  
                  {/* 3D Icon with Fluid Bounce on Hover */}
                  <div className="absolute -bottom-3 -right-2 md:-bottom-4 md:-right-3 z-20 transform rotate-6 group-hover:scale-125 group-hover:-rotate-12 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                    <span className="block text-4xl md:text-5xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]">
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Label text inside outer card */}
                <div className="mt-4 mb-1 text-center">
                  <p className="text-gray-800 font-extrabold text-sm md:text-[15px] drop-shadow-sm">
                    {item.label}
                  </p>
                </div>
              </div>

              {/* Bottom Red Badge with Smooth Pulse & Glow */}
              <div className="mt-5 h-[40px] flex items-center justify-center">
                {item.badge ? (
                  <span className="inline-block animate-pulse bg-[#e31e25] text-white text-[11px] md:text-xs font-bold px-5 py-2 md:py-2.5 rounded-full shadow-[0_0_18px_rgba(227,30,37,0.7)] border border-red-400/50 cursor-pointer tracking-wide transform hover:scale-105 transition-transform duration-300">
                    {item.badge}
                  </span>
                ) : (
                  <span className="hidden"></span>
                )}
              </div>

            </div>
          ))}
        </div>
        
      </div>

      {/* Custom Tailwind CSS Keyframe Animations for Smooth Entry */}
      <style jsx global>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(35px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}