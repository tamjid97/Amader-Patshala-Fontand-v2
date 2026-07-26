'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

import { batchFeatures } from '@/lib/batch-features'
import { FeatureModal } from '../ui/batch-modal'

// ==========================================
// 🌟 Animation Variants
// ==========================================
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // প্রতিটি ফিচার কার্ড একের পর এক আসবে
    },
  },
}

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function BatchFeatures() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeFeature = batchFeatures.find((item) => item.id === activeId)

  return (
    <section
      aria-labelledby="batch-features-title"
      className="relative mx-auto w-full overflow-hidden py-16 sm:py-24 transition-colors duration-300"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-emerald-300/5 dark:bg-emerald-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* 🌟 Animated Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {/* Badge */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-full border border-emerald-200/50 bg-emerald-100/50 px-5 py-1.5 text-sm font-bold text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm backdrop-blur-md"
          >
            যা যা পাচ্ছো এই ব্যাচে
          </motion.span>

          {/* Section Title with Underline */}
          <div className="flex flex-col items-center">
            <h2
              id="batch-features-title"
              className="text-4xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1 text-balance"
            >
              ব্যাচ ফিচার
            </h2>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1.5 w-32 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
            />
          </div>

          <p className="max-w-xl leading-relaxed text-slate-600 dark:text-emerald-100/70 font-medium text-pretty mt-2">
            প্রতিটি ফিচারে ক্লিক করে বিস্তারিত জেনে নাও — কী কী থাকছে, কীভাবে
            সাহায্য করবে সব একসাথে।
          </p>
        </motion.header>

        {/* 🌟 Animated Features Grid */}
        <motion.ul 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {batchFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.li key={feature.id} variants={gridItemVariants}>
                <motion.button
                  type="button"
                  onClick={() => setActiveId(feature.id)}
                  whileHover={{ y: -8, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full flex-col items-start gap-5 rounded-[2rem] border border-emerald-100/60 bg-white/90 p-7 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(4,120,87,0.15)] dark:border-emerald-900/50 dark:bg-[#05130e]/90 dark:hover:shadow-[0_20px_40px_-12px_rgba(5,150,105,0.2)] ring-1 ring-black/5 dark:ring-white/5 hover:ring-emerald-300/50 dark:hover:ring-emerald-700/50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {/* Icon Box */}
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400 dark:group-hover:bg-emerald-600">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-xl leading-relaxed font-extrabold text-slate-800 dark:text-emerald-50 text-balance">
                      {feature.title}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold text-emerald-600/90 dark:text-emerald-400/80">
                      {feature.subtitle}
                    </span>
                  </span>

                  <span className="flex items-center gap-1.5 text-[15px] font-bold text-teal-600 dark:text-teal-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                    বিস্তারিত দেখুন
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </span>
                </motion.button>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* Render Animated Modal */}
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