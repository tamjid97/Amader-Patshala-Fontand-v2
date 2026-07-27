"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { 
  LayoutDashboard, 
  UserCheck, 
  ShieldPlus, 
  BookOpen, 
  Calendar, 
  Award, 
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// ইউজারের জন্য ফিচার বা কুইক অ্যাকশন লিস্ট
const userFeatures = [
  {
    title: "Request Student Role",
    description: "আপনার একাউন্ট স্টুডেন্ট রোল বা ব্যাচ এক্সেসের জন্য আবেদন করুন।",
    icon: UserCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/80 dark:bg-emerald-900/30",
    href: "/user_dashboard/request-student"
  },
  {
    title: "Request Moderator Role",
    description: "মডারেটর হিসেবে কাজ করার জন্য এডমিনের কাছে আবেদন পাঠান।",
    icon: ShieldPlus,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/80 dark:bg-blue-900/30",
    href: "/user_dashboard/request-moderator"
  },
  {
    title: "Study Materials",
    description: "সকল প্রয়োজনীয় নোটস, পিডিএফ এবং বইগুলো একসাথে দেখুন।",
    icon: BookOpen,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100/80 dark:bg-purple-900/30",
    href: "/allBook"
  },
  {
    title: "Batch Schedule",
    description: "আপনার ক্লাসের রুটিন এবং ব্যাচ টাইম শিডিউল চেক করুন।",
    icon: Calendar,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100/80 dark:bg-amber-900/30",
    href: "/batchTime"
  },
  {
    title: "Exam Results",
    description: "আপনার পরীক্ষায় প্রাপ্ত ফলাফল এবং মার্কশিট দেখে নিন।",
    icon: Award,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100/80 dark:bg-rose-900/30",
    href: "/result"
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

export default function UserDashboard() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* 🌟 Welcome Banner */}
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
            <LayoutDashboard className="h-4 w-4" />
            User Dashboard
          </motion.div>
          
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome to User Dashboard! 👋
          </h1>
          <p className="text-emerald-50/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
            Roots of Biology-এর এই ড্যাশবোর্ড থেকে আপনি আপনার পড়াশোনার শিডিউল, ম্যাটেরিয়ালস এবং রোল আপডেটের জন্য আবেদন করতে পারবেন।
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

      {/* 🚀 Quick Actions Grid */}
      <div className="pt-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-xl font-bold text-slate-800 dark:text-emerald-50">
            Quick Actions & Menu (দ্রুত কার্যক্রম)
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {userFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.a
                key={index}
                href={feature.href}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-500/5 dark:border-emerald-900/40 dark:bg-[#030a08]/80 hover:dark:border-emerald-700/60 block"
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
              </motion.a>
            );
          })}
        </motion.div>
      </div>
      
    </div>
  );
}