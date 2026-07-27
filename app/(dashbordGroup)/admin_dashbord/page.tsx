"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  ShieldAlert, 
  Ban, 
  Activity, 
  Settings, 
  Crown,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// অ্যাডমিন কী কী করতে পারবে তার ডাটা
const adminFeatures = [
  {
    title: "All Users",
    description: "ওয়েবসাইটের সকল সাধারণ ইউজার এবং শিক্ষার্থীদের তালিকা দেখুন ও পরিচালনা করুন।",
    icon: Users,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/80 dark:bg-emerald-900/30",
  },
  {
    title: "Approve Students",
    description: "নতুন শিক্ষার্থীদের রেজিস্ট্রেশন রিকোয়েস্ট যাচাই করুন এবং ম্যানুয়ালি অ্যাপ্রুভ করুন।",
    icon: UserCheck,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-100/80 dark:bg-teal-900/30",
  },
  {
    title: "Manage Moderators",
    description: "নতুন মডারেটর তৈরি করুন এবং তাদের ড্যাশবোর্ড অ্যাক্সেস বা ক্ষমতা নিয়ন্ত্রণ করুন।",
    icon: ShieldAlert,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100/80 dark:bg-amber-900/30",
  },
  {
    title: "Banned Users",
    description: "নিয়ম ভঙ্গকারী বা স্প্যামার ইউজারদের একাউন্ট রেস্ট্রিক্ট বা ব্যান করুন।",
    icon: Ban,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100/80 dark:bg-rose-900/30",
  },
  {
    title: "System Analytics",
    description: "ওয়েবসাইটের ট্রাফিক, এক্টিভ ইউজার এবং অন্যান্য গুরুত্বপূর্ণ স্ট্যাটিস্টিকস দেখুন।",
    icon: Activity,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/80 dark:bg-blue-900/30",
  },
  {
    title: "Global Settings",
    description: "সম্পূর্ণ সিস্টেমের সাধারণ সেটিংস এবং অন্যান্য কোর কনফিগারেশন পরিবর্তন করুন।",
    icon: Settings,
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-200/80 dark:bg-slate-800/50",
  },
];

// 🌟 Framer Motion Variants
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

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* 🌟 Premium Welcome Banner (Matched with Website Theme) */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 px-6 py-10 text-white shadow-2xl border border-emerald-900/50 sm:px-10 sm:py-14"
      >
        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-100 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            <Crown className="h-4 w-4 text-amber-400 drop-shadow-md" />
            Super Admin Access Verified
          </motion.div>
          
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-200">
            Welcome to Admin Dashboard! 👋
          </h1>
          <p className="text-emerald-100/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium">
            এখান থেকে আপনি <span className="text-emerald-300 font-semibold">Roots of Biology</span>-এর সম্পূর্ণ সিস্টেম, ইউজার কন্ট্রোল, মডারেটর প্যানেল এবং গ্লোবাল সেটিংস সর্বোচ্চ নিরাপত্তার সাথে পরিচালনা করতে পারবেন।
          </p>
        </div>
        
        {/* Animated Background Glowing Orbs (Emerald Theme) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -top-24 h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-32 right-32 h-[300px] w-[300px] rounded-full bg-teal-400/20 blur-[90px]" 
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
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-emerald-50">
              Administrative Actions
            </h2>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {adminFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-emerald-500/10 dark:border-emerald-900/40 dark:bg-[#030a08]/80 hover:dark:border-emerald-700/60"
              >
                {/* Subtle Gradient Glow on Hover (Matched Theme) */}
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
                    <ArrowRight className="h-5 w-5 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-emerald-600" />
                  </div>
                  
                  <h3 className="mb-2 text-lg font-bold text-slate-800 transition-colors group-hover:text-emerald-700 dark:text-emerald-100 dark:group-hover:text-emerald-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400/90 leading-relaxed font-medium">
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