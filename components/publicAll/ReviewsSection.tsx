'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  { 
    id: 1,
    name: "M.D Tausif",
    role: "Dhaka University",
    text: "গর্বের সাথে বলতে পারি, এই এলাকায় এটি অন্যতম সেরা ব্যাচ। খুলনা সিটিতে সেরা সার্ভিস।", 
    rating: 5,
    location: 'Khulna',
    img: '/sir 1.jpeg',
    avatarBg: 'from-emerald-400 to-emerald-600'
  },
  { 
    id: 2,
    name: "Abdullah Al",
    role: "Khulna University",
    text: "To get a good grade in biology you need to have a clear concept. If you can't do a good result, try here. One of the best coaching in the city.", 
    rating: 5,
    location: 'Khulna',
    img: '/sir2.jpg',
    avatarBg: 'from-emerald-500 to-green-600'
  },
  { 
    id: 3,
    name: "Tanvir Ahmed",
    role: "BUET",
    text: "পড়াশোনার পরিবেশ এবং গাইডলাইন সত্যি অতুলনীয়। ভাইয়ার বায়োলজি পড়ানোর কৌশল দারুণ।", 
    rating: 5,
    location: 'Dhaka',
    img: '/sir 1.jpeg', 
    avatarBg: 'from-emerald-400 to-teal-500'
  },
  { 
    id: 4,
    name: "Nusrat Jahan",
    role: "Medical College",
    text: "বায়োলজি কঠিন লাগতো, কিন্তু এখানে পড়ার পর বিষয়টি পানির মতো সহজ হয়ে গেছে।", 
    rating: 5,
    location: 'Khulna',
    img: '/sir2.jpg', 
    avatarBg: 'from-green-400 to-emerald-600'
  }
]

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto cycle every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="relative w-full py-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/50 via-slate-50 to-white dark:from-[#05120e] dark:via-[#030712] dark:to-[#000000] overflow-hidden transition-colors duration-500">
      
      {/* Premium Background Ambient Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-400/10 dark:bg-teal-800/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 px-5 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-6 backdrop-blur-xl uppercase tracking-[0.2em] shadow-sm ring-1 ring-inset ring-white/20 dark:ring-white/5"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-emerald-500" />
            শিক্ষার্থী ও অভিভাবক মতামত
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            কেন আমরাই শিক্ষার্থী ও <br className="hidden md:block"/>
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 block -skew-y-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-xl rounded-full"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 dark:from-emerald-300 dark:via-emerald-400 dark:to-teal-400 drop-shadow-sm">
                অভিভাবকদের প্রথম পছন্দ?
              </span>
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg font-medium"
          >
            আমাদের শিক্ষার্থীরা যা অভিজ্ঞতা অর্জন করেছে, তা এখানে শেয়ার করেছে।
          </motion.p>
        </div>

        {/* Split Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Interactive Client List Selection */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {testimonials.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false); // ক্লিক করলে অটো-প্লে সাময়িক বন্ধ হবে
                  }}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                  className={`group relative cursor-pointer p-4 sm:p-5 rounded-2xl transition-all duration-500 flex items-center justify-between border overflow-hidden ${
                    isActive
                      ? 'bg-white/80 dark:bg-slate-900/80 border-emerald-500/50 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] backdrop-blur-md scale-[1.02]'
                      : 'bg-white/30 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/30 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {/* Active Progress Bar indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeHighlight"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-l-2xl"
                    />
                  )}

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                      {item.img ? (
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className={`h-14 w-14 rounded-2xl object-cover transition-all duration-500 ${isActive ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 shadow-lg' : 'opacity-70 group-hover:opacity-100'}`} 
                        />
                      ) : (
                        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.avatarBg} flex items-center justify-center font-extrabold text-white text-xl transition-all duration-500 ${isActive ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 shadow-lg' : 'opacity-70 group-hover:opacity-100'}`}>
                          {item.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className={`font-bold text-lg transition-colors ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {item.name}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                    isActive ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] rotate-0' : 'text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 -rotate-45 group-hover:rotate-0'
                  }`}>
                    <ArrowRight className="h-5 w-5" />
                  </div>

                  {/* 4-Second Animated Progress Bar on Active Item */}
                  {isActive && isAutoPlaying && (
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-[2px] bg-emerald-500/40 dark:bg-emerald-400/40"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Right Side: Glassmorphism Featured Display Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 rounded-[3rem] p-8 sm:p-14 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden group"
              >
                {/* Beautiful Inner Ring */}
                <div className="absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-emerald-500/10 pointer-events-none"></div>

                {/* Decorative Premium Quote Icon */}
                <div className="absolute -top-6 -right-6 text-emerald-500/5 dark:text-emerald-400/5 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
                  <Quote className="h-64 w-64 rotate-180" />
                </div>

                <div className="relative z-10">
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-10">
                    <div className="flex gap-1">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          key={i}
                        >
                          <Star className="h-6 w-6 text-amber-400 fill-amber-400 drop-shadow-sm" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 px-4 py-1.5 rounded-full shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Verified Student
                    </div>
                  </div>

                  {/* Main Review Quote */}
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-100 mb-12 leading-[1.6] tracking-tight">
                    "{activeTestimonial.text}"
                  </p>

                  {/* Author Details Footer */}
                  <div className="flex items-center gap-5 pt-8 border-t border-slate-200/60 dark:border-slate-700/60">
                    
                    {/* Glowing Avatar */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
                      {activeTestimonial.img ? (
                        <img 
                          src={activeTestimonial.img} 
                          alt={activeTestimonial.name} 
                          className="relative h-16 w-16 rounded-full object-cover border-2 border-white dark:border-slate-800" 
                        />
                      ) : (
                        <div className={`relative h-16 w-16 rounded-full bg-gradient-to-br ${activeTestimonial.avatarBg} flex items-center justify-center font-black text-white text-3xl border-2 border-white dark:border-slate-800`}>
                          {activeTestimonial.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-1">
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                        {activeTestimonial.role} <span className="text-slate-400 dark:text-slate-500 font-normal ml-1 capitalize">• {activeTestimonial.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}