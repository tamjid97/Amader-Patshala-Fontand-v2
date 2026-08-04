"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Award, Calendar, Users, ExternalLink, BookOpen, Loader2 } from "lucide-react";
import { getResults } from "@/app/(dashbordGroup)/moderator_dashbord/_actions/result";


interface IResult {
  id: string;
  examName: string;
  batch: string;
  examDate: string;
  resultLink: string;
}

export default function PublicResultPage() {
  const [results, setResults] = useState<IResult[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ডাটা ফেচ করা
  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await getResults();
        if (res.success && Array.isArray(res.data)) {
          setResults(res.data);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const filteredResults = results.filter(
    (item) =>
      item.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald-200/60 dark:border-emerald-900/50 backdrop-blur-md"
          >
            <Award className="h-4 w-4" />
            <span>পরীক্ষার ফলাফল পোর্টাল</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight"
          >
            সকল পরীক্ষার প্রকাশিত ফলাফল
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-emerald-100/70 text-base"
          >
            আপনার ব্যাচ বা পরীক্ষার নাম দিয়ে খুব সহজেই ফলাফল খুঁজে নিন।
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white/80 dark:bg-[#040f0c]/80 backdrop-blur-2xl rounded-full p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-emerald-100/80 dark:border-emerald-950"
          >
            <div className="pl-4 pr-2 flex items-center text-emerald-600 dark:text-emerald-400">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              placeholder="অধ্যায়ের নাম, বিষয় বা ক্লাস দিয়ে সার্চ করুন..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value === "") setSearchQuery("");
              }}
              className="w-full bg-transparent text-slate-800 dark:text-emerald-50 placeholder-slate-400 dark:placeholder-emerald-600/70 text-sm sm:text-base focus:outline-none px-2"
            />

            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>সার্চ করুন</span>
            </button>
          </form>
        </motion.div>

        {/* Results Grid / Loading / Empty States */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        ) : filteredResults.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/60 dark:bg-[#030a08]/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-emerald-900/40 max-w-lg mx-auto p-8 shadow-sm"
          >
            <BookOpen className="h-12 w-12 mx-auto text-slate-300 dark:text-emerald-800 mb-3" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-emerald-200">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-slate-500 dark:text-emerald-400/60 text-sm mt-1">আপনার সার্চের সাথে মিলে যায় এমন কোনো পরীক্ষার ফলাফল নেই।</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                // 🌟 Glassmorphism Card Design
                className="bg-white/70 dark:bg-[#04110d]/60 backdrop-blur-2xl rounded-[2rem] border border-emerald-100/80 dark:border-emerald-900/40 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.1)] hover:border-emerald-400/50 dark:hover:border-emerald-600/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* 🌟 Top Section: Large Date & Batch Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-base tracking-tight">
                      <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{result.examDate}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm">
                      <Users className="h-3 w-3" />
                      {result.batch}
                    </span>
                  </div>

                  {/* 🌟 Exam / Test Name (More Prominent & Premium) */}
                  <div className="pt-2">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-emerald-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight leading-snug">
                      {result.examName}
                    </h2>
                  </div>
                </div>

                {/* View Result Button */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-emerald-950">
                  <a
                    href={result.resultLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    <span>ফলাফল দেখুন (Result Sheet)</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}