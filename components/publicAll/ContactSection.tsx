'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, Send, Clock, User, FileText } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "8801922555575"; // আপনার হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোড সহ)
    const text = `নাম: ${name}\nমাসেজ: ${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 transition-colors duration-300">
      
      {/* 🌟 Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-400/10 dark:bg-emerald-900/15 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* 🌟 Section Title */}
        <div className="mb-14 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-sm font-semibold mb-3 shadow-sm"
          >
            <PhoneCall className="w-4 h-4 text-emerald-500" />
            <span>যোগাযোগ করুন</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0a7c41] dark:text-emerald-400 drop-shadow-sm pb-1"
          >
            আমাদের সাথে যুক্ত থাকুন
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-40 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 mt-3 shadow-[0_2px_10px_rgba(16,185,129,0.5)] origin-center"
          />
        </div>

        {/* 🌟 Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 🌟 Call Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-md dark:bg-[#05130e]/90 rounded-[2.5rem] p-8 shadow-[0_15px_40px_-10px_rgba(4,120,87,0.12)] dark:shadow-[0_15px_40px_-10px_rgba(5,150,105,0.2)] border border-emerald-100/80 dark:border-emerald-900/60 flex flex-col justify-between transition-all duration-300 group hover:border-emerald-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                যেকোনো প্রয়োজনে কল করুন
              </h3>
              <p className="text-slate-600 dark:text-emerald-200/80 text-sm md:text-base mb-8 leading-relaxed">
                ক্লাস, পড়াশোনা বা যেকোনো তথ্য জানতে সরাসরি কল করুন। আমাদের প্রতিনিধি আপনার সেবায় প্রস্তুত।
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="tel:01922555575"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>01922555575</span>
              </a>

              <div className="flex items-center gap-2 text-slate-500 dark:text-emerald-300/70 text-sm font-medium pt-2 border-t border-emerald-100 dark:border-emerald-900/50">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>সময়: সকাল ১০টা – রাত ১০টা</span>
              </div>
            </div>
          </motion.div>

          {/* 🌟 WhatsApp Message Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-md dark:bg-[#05130e]/90 rounded-[2.5rem] p-8 shadow-[0_15px_40px_-10px_rgba(4,120,87,0.12)] dark:shadow-[0_15px_40px_-10px_rgba(5,150,105,0.2)] border border-emerald-100/80 dark:border-emerald-900/60 flex flex-col justify-between transition-all duration-300 group hover:border-emerald-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                WhatsApp মেসেজ পাঠান
              </h3>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                />
              </div>

              {/* Message Input */}
              <div className="relative">
                <span className="absolute top-4 left-4 text-slate-400">
                  <FileText className="w-4 h-4" />
                </span>
                <textarea
                  required
                  rows={3}
                  placeholder="আপনার মেসেজ লিখুন"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm resize-none"
                />
              </div>

              {/* WhatsApp Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5" />
                <span>WhatsApp Message</span>
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}