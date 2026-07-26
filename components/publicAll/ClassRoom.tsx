'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Video } from 'lucide-react'

export default function ClassroomVideo() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-400/5 dark:bg-emerald-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* 🌟 Animated Section Title */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <Video className="w-4 h-4 text-emerald-500" />
            <span>আমাদের পরিবেশ</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            আমাদের ক্লাস রুম
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

        {/* 🌟 Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-900 shadow-[0_20px_50px_-15px_rgba(4,120,87,0.25)] dark:shadow-[0_20px_50px_-15px_rgba(5,150,105,0.3)] ring-1 ring-black/10 dark:ring-white/10"
        >
          {!isPlaying ? (
            <div 
              className="relative h-full w-full group cursor-pointer" 
              onClick={() => setIsPlaying(true)}
            >
              <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
                <img 
                  src="/class.jpeg" 
                  alt="আমাদের ক্লাস রুম"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-slate-950/40 transition-colors group-hover:bg-slate-950/30" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-colors group-hover:bg-emerald-400"
                >
                  <Play className="h-8 w-8 translate-x-0.5 fill-current" />
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
              <video 
                src="/class.mp4" 
                controls 
                autoPlay 
                className="h-full w-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  )
}