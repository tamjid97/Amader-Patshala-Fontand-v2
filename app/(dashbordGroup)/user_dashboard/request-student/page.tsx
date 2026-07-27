"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Send, Loader2, CheckCircle2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function RequestStudentPage() {
  const [requestStatus, setRequestStatus] = useState<"None" | "Pending" | "Approved">("None");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ studentIdOrInfo: "", reason: "" });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRequestStatus("Pending");
      toast.success("আবেদন সফলভাবে জমা হয়েছে!");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-0">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <GraduationCap className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-emerald-50 mb-2">Request Student Access</h1>
        <p className="text-slate-500 dark:text-emerald-100/60">Roots of Biology-এর প্রিমিয়াম রিসোর্স পেতে আবেদন করুন।</p>
      </div>

      <AnimatePresence mode="wait">
        {/* State: Pending / Approved */}
        {requestStatus !== "None" && (
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`overflow-hidden rounded-2xl border p-8 text-center backdrop-blur-xl ${
              requestStatus === "Approved" 
                ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20" 
                : "border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20"
            }`}
          >
            {requestStatus === "Pending" ? (
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-amber-500 mb-4" />
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring" }}>
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
              </motion.div>
            )}
            
            <h2 className={`text-2xl font-bold mb-2 ${requestStatus === "Approved" ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
              {requestStatus === "Approved" ? "অভিনন্দন! আবেদন গৃহীত হয়েছে" : "আবেদনটি রিভিউ হচ্ছে"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {requestStatus === "Approved" 
                ? "আপনি এখন একজন ভেরিফাইড স্টুডেন্ট। ড্যাশবোর্ড থেকে সকল ফিচারে এক্সেস নিতে পারবেন।" 
                : "আপনার আবেদনটি এডমিনের কাছে পাঠানো হয়েছে। যাচাইকরণ শেষে আপনাকে জানানো হবে।"}
            </p>
          </motion.div>
        )}

        {/* State: Form */}
        {requestStatus === "None" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-500/5 dark:border-emerald-900/40 dark:bg-[#030a08]/80"
          >
            <form onSubmit={handleSubmitRequest} className="space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-emerald-200 flex items-center gap-2">
                  <Search className="h-4 w-4" /> Student ID / Batch Info
                </label>
                <Input
                  placeholder="e.g. BIO-2026-001"
                  value={formData.studentIdOrInfo}
                  onChange={(e) => setFormData({ ...formData, studentIdOrInfo: e.target.value })}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 transition-all focus:ring-2 focus:ring-emerald-500/50 dark:bg-black/40 dark:border-emerald-800/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-emerald-200">
                  কেন আপনি এক্সেস চাচ্ছেন? (ঐচ্ছিক)
                </label>
                <Textarea
                  placeholder="আপনার সম্পর্কে সংক্ষেপে লিখুন..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  className="rounded-xl bg-slate-50 border-slate-200 transition-all focus:ring-2 focus:ring-emerald-500/50 dark:bg-black/40 dark:border-emerald-800/50 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Send className="mr-2 h-5 w-5" /> Submit Request</>}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}