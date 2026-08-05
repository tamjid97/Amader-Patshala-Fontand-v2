"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 🌟 ১. useRouter ইমপোর্ট করা হলো
import { requestStudentAccessAction } from "../_action/student";


export default function RequestStudentPage() {
  const [requestStatus, setRequestStatus] = useState<"None" | "Pending">("None");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 🌟 ২. রাউটার ইনিশিয়ালাইজ করা হলো

  const handleSubmitRequest = async () => {
    setLoading(true);
    try {
      const result = await requestStudentAccessAction();
      
      if (result.success) {
        setRequestStatus("Pending");
        toast.success(result.message || "আবেদন সফলভাবে জমা হয়েছে!");
        
        // 🌟 ৩. সফল হওয়ার ১ সেকেন্ড পর হোম পেজে রিডাইরেক্ট হবে
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(result.message || "আবেদন করতে সমস্যা হয়েছে।");
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("সার্ভারের সাথে সংযোগ স্থাপন করা যাচ্ছে না।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4 sm:px-0">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <GraduationCap className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-emerald-50 mb-2">Request Student Access</h1>
        <p className="text-slate-500 dark:text-emerald-100/60 max-w-md mx-auto">
          Roots of Biology-এর প্রিমিয়াম রিসোর্স এবং স্টুডেন্ট ড্যাশবোর্ড এক্সেস পেতে নিচের বাটনে ক্লিক করে আবেদন করুন।
        </p>
      </div>

      <AnimatePresence mode="wait">
        {requestStatus === "Pending" && (
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/80 p-8 text-center backdrop-blur-xl dark:border-amber-900/50 dark:bg-amber-950/20 shadow-lg"
          >
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-amber-500 mb-4" />
            
            <h2 className="text-2xl font-bold mb-2 text-amber-700 dark:text-amber-300">
              আবেদনটি সফলভাবে জমা হয়েছে!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              হোম পেজে রিডাইরেক্ট করা হচ্ছে...
            </p>
          </motion.div>
        )}

        {requestStatus === "None" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-500/5 dark:border-emerald-900/40 dark:bg-[#030a08]/80 text-center space-y-6"
          >
            <p className="text-slate-600 dark:text-emerald-100/80 leading-relaxed">
              আপনি কি একজন ভেরিফাইড স্টুডেন্ট হিসেবে আমাদের প্ল্যাটফর্মে যুক্ত হতে চান? কোনো ফরম পূরণ ছাড়াই এক ক্লিকেই রিকোয়েস্ট পাঠিয়ে দিন।
            </p>

            <Button 
              onClick={handleSubmitRequest} 
              disabled={loading}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Send className="mr-2 h-5 w-5" /> Send Student Request</>}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}