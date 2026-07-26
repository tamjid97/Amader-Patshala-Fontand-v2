'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { BookOpen, BadgeCheck, History } from 'lucide-react'

// ==========================================
// 🌟 Animation Variants
// ==========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // প্রতিটি কার্ড ০.২ সেকেন্ড পর পর আসবে
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom Smooth Bezier
    },
  },
}

// ==========================================
// 🌟 Data Array (অধ্যয়ন পদ্ধতির ডেটা)
// ==========================================
const studyMethods = [
  {
    id: 'understand-not-memorize',
    title: 'মুখস্থ নয়, বুঝে পড়া',
    description:
      'ছন্দ, পদ্য বা নেমোনিকের ওপর নির্ভর না করে Pure Logic ও Basic Concepts-এর মাধ্যমে বায়োলজি শেখানো হয় যাতে শিক্ষার্থীরা মুখস্থ নয়, বুঝে শিখতে পারে।',
    icon: BookOpen,
    colorClass: 'text-[#00c853] dark:text-[#00e676]',
    bgClass: 'bg-[#00c853] dark:bg-[#00c853]',
    shadowHover: 'hover:shadow-[#00c853]/20',
    ringHover: 'hover:ring-[#00c853]/30',
  },
  {
    id: 'weekly-exam',
    title: 'সাপ্তাহিক পরীক্ষা',
    description:
      'প্রতিটি সপ্তাহে পড়ানো বিষয়ের উপর সাপ্তাহিক পরীক্ষা নেওয়া হয়, যাতে শিক্ষার্থীরা নিজের অগ্রগতি নিজেই বুঝতে পারে এবং ভুলগুলো ঠিক করার সুযোগ পায়।',
    icon: BadgeCheck,
    colorClass: 'text-[#2962ff] dark:text-[#448aff]',
    bgClass: 'bg-[#2962ff] dark:bg-[#2962ff]',
    shadowHover: 'hover:shadow-[#2962ff]/20',
    ringHover: 'hover:ring-[#2962ff]/30',
  },
  {
    id: 'backup-class',
    title: 'ব্যাকআপ ক্লাস',
    description:
      'ক্লাস মিস মানেই পিছিয়ে পড়া নয়। সপ্তাহে তিন দিন ব্যাকআপ ক্লাসের মাধ্যমে প্রতিটি টপিক আবার বুঝিয়ে দেওয়া হয়।',
    icon: History,
    colorClass: 'text-[#aa00ff] dark:text-[#d500f9]',
    bgClass: 'bg-[#aa00ff] dark:bg-[#aa00ff]',
    shadowHover: 'hover:shadow-[#aa00ff]/20',
    ringHover: 'hover:ring-[#aa00ff]/30',
  },
]

// ==========================================
// 🌟 Main Component
// ==========================================
export default function StudyMethod() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] dark:opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-400/5 dark:bg-emerald-900/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 🌟 Animated Section Title */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>শেখার কৌশল</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            আমাদের অধ্যয়ন পদ্ধতি
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

        {/* 🌟 Staggered Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {studyMethods.map((method) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.id}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group flex flex-col items-center text-center rounded-[2rem] bg-white/90 p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-500 dark:bg-[#05130e]/90 border border-emerald-50 dark:border-emerald-900/30 ring-1 ring-transparent ${method.ringHover} ${method.shadowHover}`}
              >
                {/* Icon Circle with Bounce Hover */}
                <div className="mb-6 relative">
                  <div className={`absolute inset-0 blur-xl opacity-40 transition-opacity duration-300 group-hover:opacity-70 ${method.bgClass}`} />
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg ${method.bgClass}`}
                  >
                    <Icon className="h-9 w-9" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className={`mb-4 text-2xl font-bold tracking-tight ${method.colorClass}`}>
                  {method.title}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-slate-600 dark:text-emerald-100/80 font-medium">
                  {method.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}