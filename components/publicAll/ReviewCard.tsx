'use client'

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function ReviewCard({ fidbac }) {
  const { name, role, feedback, img } = fidbac;

  return (
    <div className="bg-white/90 backdrop-blur-sm dark:bg-[#05130e]/90 rounded-[2rem] shadow-[0_15px_40px_-10px_rgba(4,120,87,0.15)] dark:shadow-[0_15px_40px_-10px_rgba(5,150,105,0.2)] border border-emerald-100/60 dark:border-emerald-900/50 p-8 flex flex-col h-full transition-all duration-500 hover:scale-[1.02]">
      
      {/* Quote Icon */}
      <div className="mb-4 text-emerald-500/40 dark:text-emerald-500/30">
        <Quote className="w-10 h-10" />
      </div>

      {/* Feedback Text */}
      <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed flex-1 mb-8 font-medium">
        {feedback}
      </p>

      {/* Profile Section */}
      <div className="flex items-center mt-auto space-x-4 border-t border-emerald-100/60 dark:border-emerald-900/40 pt-5">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
          <Image
            src={img || "/sir 1.jpeg"}
            alt={name || "User"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 dark:text-white text-lg">{name}</span>
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">{role}</span>
        </div>
      </div>
    </div>
  );
}