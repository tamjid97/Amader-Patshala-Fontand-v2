"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  FileText, 
  Award, 
  MessageSquare, 
  Image as ImageIcon, 
  Clock, 
  UploadCloud, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// মডারেটর কী কী করতে পারবে তার ডাটা
const moderatorFeatures = [
  {
    title: "PDF Management",
    description: "আপলোড করা সমস্ত স্টাডি ম্যাটেরিয়াল এবং পিডিএফ ফাইলগুলো পরিচালনা ও আপডেট করুন।",
    icon: FileText,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/80 dark:bg-blue-900/30",
  },
  {
    title: "Results Publishing",
    description: "শিক্ষার্থীদের পরীক্ষার ফলাফল এবং মার্কশিট পাবলিশ বা এডিট করুন।",
    icon: Award,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/80 dark:bg-emerald-900/30",
  },
  {
    title: "Review Management",
    description: "শিক্ষার্থীদের ফিডব্যাক এবং রিভিউগুলো মনিটর করুন এবং উত্তর দিন।",
    icon: MessageSquare,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100/80 dark:bg-amber-900/30",
  },
  {
    title: "Banner Update",
    description: "ওয়েবসাইটের হোমপেজ বা ড্যাশবোর্ডের প্রমোশনাল ব্যানারগুলো পরিবর্তন করুন।",
    icon: ImageIcon,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100/80 dark:bg-purple-900/30",
  },
  {
    title: "Batch Schedule",
    description: "নতুন ব্যাচের সময়সূচি তৈরি করুন এবং ক্লাস রুটিন ম্যানেজ করুন।",
    icon: Clock,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100/80 dark:bg-rose-900/30",
  },
  {
    title: "Media Upload",
    description: "ক্লাসের রেকর্ডিং, ছবি এবং অন্যান্য গুরুত্বপূর্ণ মিডিয়া ফাইল সার্ভারে আপলোড করুন।",
    icon: UploadCloud,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100/80 dark:bg-indigo-900/30",
  },
];

// 🌟 Framer Motion Variants (টাইপ এরর ফিক্স করা হয়েছে)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, 
      stiffness: 300, 
      damping: 24 
    } 
  },
};

export default function ModeratorDashboard() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* 🌟 Welcome Banner (Slide Down Animation) */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14"
      >
        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-emerald-50 backdrop-blur-md"
          >
            <ShieldCheck className="h-4 w-4" />
            Moderator Access Verified
          </motion.div>
          
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome to Moderator Dashboard! 👋
          </h1>
          <p className="text-emerald-50/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
            এখান থেকে আপনি খুব সহজেই Roots of Biology-এর স্টাডি ম্যাটেরিয়াল, রুটিন, ফলাফল এবং অন্যান্য গুরুত্বপূর্ণ বিষয়গুলো নিয়ন্ত্রণ করতে পারবেন।
          </p>
        </div>
        
        {/* Animated Background Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-emerald-400/30 blur-[80px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-teal-300/20 blur-[80px]" 
        />
      </motion.div>

      {/* 🚀 Features Grid (Staggered Animation) */}
      <div className="pt-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-xl font-bold text-slate-800 dark:text-emerald-50">
            Quick Actions (কার্যপরিধি)
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {moderatorFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-500/5 dark:border-emerald-900/40 dark:bg-[#030a08]/80 hover:dark:border-emerald-700/60"
              >
                {/* Subtle Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 transition-all duration-500 group-hover:from-emerald-50/50 group-hover:to-transparent dark:group-hover:from-emerald-900/20" />
                
                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6",
                        feature.bgColor,
                        feature.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-emerald-700" />
                  </div>
                  
                  <h3 className="mb-2 text-lg font-bold text-slate-800 transition-colors group-hover:text-emerald-700 dark:text-emerald-100 dark:group-hover:text-emerald-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
    </div>
  );
}