"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Send, Loader2, CheckCircle2, ShieldQuestion, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function RequestModeratorPage() {
  const [requestStatus, setRequestStatus] = useState<"None" | "Pending" | "Approved">("None");
  const [loading, setLoading] = useState(false);
  
  // 🌟 স্টেট-এ id ফিল্ড যুক্ত করা হয়েছে
  const [formData, setFormData] = useState({ id: "", experience: "", reason: "" });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRequestStatus("Pending");
      toast.success("মডারেটর রিকোয়েস্ট জমা হয়েছে!");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-0">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
          <ShieldCheck className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">Become a Moderator</h1>
        <p className="text-slate-500 dark:text-slate-400">কমিউনিটি ম্যানেজ এবং কন্টেন্ট দেখাশোনার দায়িত্ব নিন।</p>
      </div>

      <AnimatePresence mode="wait">
        {requestStatus !== "None" && (
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`overflow-hidden rounded-2xl border p-8 text-center backdrop-blur-xl ${
              requestStatus === "Approved" 
                ? "border-indigo-200 bg-indigo-50/80 dark:border-indigo-900/50 dark:bg-indigo-950/20" 
                : "border-slate-200 bg-slate-50/80 dark:border-slate-800/50 dark:bg-slate-900/50"
            }`}
          >
            {requestStatus === "Pending" ? (
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-slate-500 mb-4" />
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring" }}>
                <CheckCircle2 className="mx-auto h-16 w-16 text-indigo-500 mb-4" />
              </motion.div>
            )}
            
            <h2 className={`text-2xl font-bold mb-2 ${requestStatus === "Approved" ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-300"}`}>
              {requestStatus === "Approved" ? "স্বাগতম নতুন মডারেটর!" : "আবেদনটি রিভিউ পর্যায়ে আছে"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {requestStatus === "Approved" 
                ? "আপনাকে মডারেটর হিসেবে নির্বাচন করা হয়েছে। আপনার নতুন পাওয়ার উপভোগ করুন।" 
                : "আমাদের টিম আপনার আবেদনটি খতিয়ে দেখছে। খুব দ্রুতই আপডেট জানানো হবে।"}
            </p>
          </motion.div>
        )}

        {requestStatus === "None" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-2xl shadow-indigo-500/5 dark:border-slate-800 dark:bg-[#030a08]/80"
          >
            <form onSubmit={handleSubmitRequest} className="space-y-6">
              
              {/* 🌟 নতুন যুক্ত করা ID ফিল্ড */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <IdCard className="h-4 w-4" /> আপনার আইডি (ID)
                </label>
                <Input
                  placeholder="যেমন: USER-1029 বা আপনার ইমেইল"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 transition-all focus:ring-2 focus:ring-indigo-500/50 dark:bg-black/40 dark:border-slate-800"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <ShieldQuestion className="h-4 w-4" /> পূর্বের অভিজ্ঞতা
                </label>
                <Input
                  placeholder="যেমন: ১ বছরের ম্যানেজমেন্ট অভিজ্ঞতা"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 transition-all focus:ring-2 focus:ring-indigo-500/50 dark:bg-black/40 dark:border-slate-800"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  কেন আপনি মডারেটর হতে চান?
                </label>
                <Textarea
                  placeholder="আপনার উদ্দেশ্য ও কাজের আগ্রহ সম্পর্কে বিস্তারিত লিখুন..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={5}
                  required
                  className="rounded-xl bg-slate-50 border-slate-200 transition-all focus:ring-2 focus:ring-indigo-500/50 dark:bg-black/40 dark:border-slate-800 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-1"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Send className="mr-2 h-5 w-5" /> Submit Application</>}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}