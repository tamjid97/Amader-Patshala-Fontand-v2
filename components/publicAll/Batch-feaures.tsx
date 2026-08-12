'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { batchFeatures } from '@/lib/batch-features'
import { FeatureModal } from '../ui/batch-modal'

// স্পষ্ট করে Variants টাইপ বলে দেওয়া হলো
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

export function BatchFeatures() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeFeature = batchFeatures.find((f) => f.id === activeId)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 flex flex-col items-center"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md shadow-sm">
            <span className="text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm tracking-wide">
              যা যা পাচ্ছো এই ব্যাচে
            </span>
          </div>

          {/* Main Heading (Light Green Color Applied) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
            ব্যাচ ফিচার
          </h2>

          {/* Underline Bar */}
          <div className="w-20 sm:w-28 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-3 mb-4 mx-auto shadow-sm" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            প্রতিটি ফিচারে ক্লিক করে বিস্তারিত জেনে নাও — কী কী থাকছে, কীভাবে সাহায্য করবে সব একসাথে।
          </p>
        </motion.div>

        {/* Grid Wrapped in Motion Div with Variants */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {batchFeatures.map((feature) => {
            const Icon = feature.icon

            return (
              <motion.button
                key={feature.id}
                variants={cardVariants}
                type="button"
                onClick={() => setActiveId(feature.id)}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                aria-haspopup="dialog"
                className="relative group flex h-full w-full flex-col items-start gap-4 rounded-[2rem] border border-emerald-100/60 bg-white/90 p-7 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_20px_40px_-12px_rgba(4,120,87,0.15)] dark:border-emerald-900/50 dark:bg-[#05130e]/90 dark:hover:shadow-[0_20px_40px_-12px_rgba(5,150,105,0.2)] ring-1 ring-black/5 dark:ring-white/5 hover:ring-emerald-300/50 dark:hover:ring-emerald-700/50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {/* Floating Badge */}
                {feature.tag && (
                  <span className="absolute top-6 right-6 inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                    {feature.tag}
                  </span>
                )}

                {/* Icon Box */}
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:group-hover:bg-emerald-600">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>

                <span className="flex-1 w-full mt-2">
                  <span className="block text-xl leading-relaxed font-extrabold text-slate-800 dark:text-emerald-50 text-balance">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-emerald-600/90 dark:text-emerald-400/80">
                    {feature.subtitle}
                  </span>
                  
                  {/* Teaser Description */}
                  {feature.teaser && (
                    <span className="mt-3 block text-[13px] leading-snug text-slate-500 dark:text-emerald-200/60 line-clamp-2">
                      {feature.teaser}
                    </span>
                  )}
                </span>

                {/* CTA Button enhancement */}
                <div className="mt-2 flex w-full items-center justify-between border-t border-emerald-50 dark:border-emerald-900/30 pt-4">
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-teal-600 dark:text-teal-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                    বিস্তারিত দেখুন
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </span>
                  
                  {/* Subtle visual cue */}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100/50 text-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-emerald-800/30 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Modal Entry */}
        <AnimatePresence>
          {activeFeature && (
            <FeatureModal
              feature={activeFeature}
              onClose={() => setActiveId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}