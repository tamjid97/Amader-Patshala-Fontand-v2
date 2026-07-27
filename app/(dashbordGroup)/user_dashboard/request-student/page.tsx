"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function RequestStudentPage() {
  const [requestStatus, setRequestStatus] = useState<"None" | "Pending" | "Approved">("None");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentIdOrInfo: "",
    reason: "",
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // এখানে ব্যাকএন্ড API কল হবে (যেমন: axios.post('/api/request-student', formData))
    setTimeout(() => {
      setLoading(false);
      setRequestStatus("Pending");
      toast.success("Student request submitted successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10 max-w-3xl mx-auto animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50 flex items-center justify-center sm:justify-start gap-3">
          <GraduationCap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          Request Student Account
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          স্টুডেন্ট এক্সেস পাওয়ার জন্য নিচে প্রয়োজনীয় তথ্য দিয়ে এডমিনের কাছে আবেদন পাঠান।
        </p>
      </div>

      {/* Status Card */}
      {requestStatus === "Pending" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300">
                <Clock className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-200">আবেদনটি পেন্ডিং রয়েছে</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">
                  আপনার আবেদনটি এডমিনের কাছে পাঠানো হয়েছে। অনুমোদন পেলে একাউন্ট স্টুডেন্ট হিসেবে আপডেট হবে।
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {requestStatus === "Approved" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-900 dark:text-emerald-200">অভিনন্দন! আপনি এখন স্টুডেন্ট</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">
                  এডমিন আপনার আবেদনটি অনুমোদন করেছেন।
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Request Form */}
      {requestStatus === "None" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-emerald-100">আবেদন ফর্ম</CardTitle>
              <CardDescription className="dark:text-slate-400">
                সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন যাতে এডমিন সহজেই যাচাই করতে পারেন।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-emerald-200">
                    Student ID / Batch Info (যদি থাকে)
                  </label>
                  <Input
                    placeholder="যেমন: BIO-2026-001"
                    value={formData.studentIdOrInfo}
                    onChange={(e) => setFormData({ ...formData, studentIdOrInfo: e.target.value })}
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-emerald-200">
                    কারণ বা নোট (ঐচ্ছিক)
                  </label>
                  <Textarea
                    placeholder="কেন আপনি স্টুডেন্ট এক্সেস চাচ্ছেন সংক্ষেপে লিখুন..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 gap-2 h-11 font-semibold"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "সাবমিট হচ্ছে..." : "Submit Student Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}