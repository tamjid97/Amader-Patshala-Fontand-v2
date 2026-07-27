'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import './globals.css'

// ==========================================
// 🌟 Static Particle Data (Error Free & Pure)
// ==========================================
const floatingParticles = [
  { id: 1, top: "15%", left: "10%", yMove: -70, duration: 4.0, delay: 0.5 },
  { id: 2, top: "35%", left: "25%", yMove: -120, duration: 5.0, delay: 1.2 },
  { id: 3, top: "65%", left: "15%", yMove: -90, duration: 3.5, delay: 2.1 },
  { id: 4, top: "85%", left: "30%", yMove: -60, duration: 4.5, delay: 0.2 },
  { id: 5, top: "25%", left: "55%", yMove: -100, duration: 5.5, delay: 3.0 },
  { id: 6, top: "45%", left: "75%", yMove: -130, duration: 4.2, delay: 1.8 },
  { id: 7, top: "75%", left: "85%", yMove: -80, duration: 3.8, delay: 0.9 },
  { id: 8, top: "10%", left: "80%", yMove: -110, duration: 4.8, delay: 2.5 },
  { id: 9, top: "55%", left: "5%", yMove: -75, duration: 5.2, delay: 1.5 },
  { id: 10, top: "90%", left: "60%", yMove: -140, duration: 4.1, delay: 3.5 },
  { id: 11, top: "20%", left: "90%", yMove: -95, duration: 3.9, delay: 0.7 },
  { id: 12, top: "70%", left: "40%", yMove: -105, duration: 4.7, delay: 2.8 },
  { id: 13, top: "40%", left: "95%", yMove: -65, duration: 5.1, delay: 4.0 },
  { id: 14, top: "80%", left: "10%", yMove: -115, duration: 4.3, delay: 1.1 },
  { id: 15, top: "5%", left: "45%", yMove: -85, duration: 3.6, delay: 2.2 },
]

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020806] text-slate-200">
      
      {/* 🌟 Soft Ambient Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,#10b981_0%,transparent_50%)] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* 🌟 Floating Particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1.5 h-1.5 bg-emerald-500/40 rounded-full"
          style={{
            top: particle.top,
            left: particle.left,
          }}
          animate={{
            y: [0, particle.yMove],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-3xl text-center">
        
        {/* ==========================================
            🌟 Cute Crying "Biological Cell" Cartoon 
            ========================================== */}
        <div className="relative flex justify-center items-center h-64 w-64 mb-10">
          
          {/* Animated Cell Body (Squishy Effect) */}
          <motion.div
            animate={{
              borderRadius: [
                "60% 40% 30% 70%/60% 30% 70% 40%",
                "30% 60% 70% 40%/50% 60% 30% 60%",
                "60% 40% 30% 70%/60% 30% 70% 40%"
              ],
              y: [0, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-teal-600/30 border-2 border-emerald-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)] backdrop-blur-md"
          >
            {/* Cute Glossy Eyes */}
            <div className="absolute top-14 left-10 w-7 h-10 bg-emerald-950 rounded-full overflow-hidden shadow-inner">
              <div className="absolute top-1 left-1 w-3 h-4 bg-white rounded-full opacity-90"></div>
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
            </div>
            <div className="absolute top-14 right-10 w-7 h-10 bg-emerald-950 rounded-full overflow-hidden shadow-inner">
              <div className="absolute top-1 left-1 w-3 h-4 bg-white rounded-full opacity-90"></div>
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
            </div>

            {/* Sad Quivering Mouth */}
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute bottom-12 w-10 h-4 border-t-4 border-emerald-900 rounded-[50%]"
            />
            
            {/* Blushing Cheeks */}
            <div className="absolute top-24 left-6 w-6 h-3 bg-red-500/30 blur-sm rounded-full"></div>
            <div className="absolute top-24 right-6 w-6 h-3 bg-red-500/30 blur-sm rounded-full"></div>

          </motion.div>

          {/* 🌟 Animated Falling Tears */}
          <motion.div
            animate={{ y: [0, 40], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
            className="absolute top-28 left-[40%] w-2 h-4 bg-cyan-400 rounded-b-full rounded-t-sm shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
          <motion.div
            animate={{ y: [0, 45], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn", delay: 0.7 }}
            className="absolute top-28 right-[42%] w-2.5 h-5 bg-cyan-400 rounded-b-full rounded-t-sm shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        </div>

        {/* ==========================================
            🌟 Updated Emotional Text Content 
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-semibold shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <span>404</span>
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            <span>Energy Depleted</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            মাইটোকন্ড্রিয়া তো কোষের পাওয়ার হাউজ, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              কিন্তু এই পেজের সব শক্তি শেষ!
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-emerald-100/70 max-w-lg mx-auto leading-relaxed mt-4 font-medium">
            মন খারাপ করো না! তুমি যে পেজটি খুঁজছো সেটি হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি ভুল। চলো, আমরা একসাথে সঠিক পথে ফিরে যাই।
          </p>
        </motion.div>

        {/* ==========================================
            🌟 Shadcn Exact Buttons 
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          {/* Back Button (Shadcn Outline Style) */}
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/50 hover:text-emerald-300 text-emerald-400 h-12 px-8 py-2 w-full sm:w-auto shadow-sm backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            পূর্বের পেজে যান
          </button>

          {/* Home Button (Shadcn Default Style) */}
          <Link href="/" className="w-full sm:w-auto">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] h-12 px-8 py-2 w-full hover:-translate-y-0.5 active:translate-y-0">
              <Home className="mr-2 h-4 w-4" />
              হোমপেজে ফিরে যাই চলো
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  )
}