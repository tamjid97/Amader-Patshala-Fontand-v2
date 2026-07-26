"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Award, ExternalLink, Search, Users, Calendar } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// রেজাল্ট ডাটা টাইপ
interface IResult {
  id: string;
  examName: string;
  batch: string;
  examDate: string;
  resultLink: string;
}

export default function ResultManagementPage() {
  // State Management & Demo Data
  const [results, setResults] = useState<IResult[]>([
    { 
      id: "1", 
      examName: "Botany Chapter 1 CQ Test", 
      batch: "HSC 2025", 
      examDate: "2026-07-20",
      resultLink: "https://docs.google.com/spreadsheets/..." 
    },
    { 
      id: "2", 
      examName: "Medical Admission Model Test - 01", 
      batch: "Medical 2026", 
      examDate: "2026-07-25",
      resultLink: "https://drive.google.com/..." 
    },
  ]);

  const [formData, setFormData] = useState({ id: "", examName: "", batch: "", examDate: "", resultLink: "" });
  const [isEditing, setIsEditing] = useState(false);

  // ইনপুট হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // সাবমিট (Create & Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.examName || !formData.batch || !formData.resultLink) return;

    if (isEditing) {
      // Update Logic
      setResults(results.map((res) => (res.id === formData.id ? { ...res, ...formData } : res)));
      setIsEditing(false);
    } else {
      // Create Logic
      const newResult = {
        ...formData,
        id: Date.now().toString(),
      };
      setResults([newResult, ...results]);
    }
    // Reset Form
    setFormData({ id: "", examName: "", batch: "", examDate: "", resultLink: "" }); 
  };

  // এডিট হ্যান্ডলার
  const handleEdit = (result: IResult) => {
    setFormData(result);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই রেজাল্টটি ডিলিট করতে চান?")) {
      setResults(results.filter((res) => res.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* 🌟 Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          Result Publishing
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          শিক্ষার্থীদের পরীক্ষার ফলাফল এবং মার্কশিট আপলোড ও আপডেট করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 📝 Create / Update Form (Left Side) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-1"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm sticky top-6">
            <CardHeader>
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                {isEditing ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {isEditing ? "Update Result" : "Publish New Result"}
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                নতুন পরীক্ষার ফলাফল প্রকাশ করতে নিচের ফর্মটি পূরণ করুন।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-2">
                  <Label htmlFor="examName" className="dark:text-emerald-100">Exam Name *</Label>
                  <Input 
                    id="examName"
                    name="examName" 
                    value={formData.examName}
                    onChange={handleInputChange}
                    placeholder="e.g. Botany Chapter 1 Test" 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batch" className="dark:text-emerald-100">Target Batch *</Label>
                  <Input 
                    id="batch"
                    name="batch" 
                    value={formData.batch}
                    onChange={handleInputChange}
                    placeholder="e.g. HSC 2025" 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examDate" className="dark:text-emerald-100">Exam Date *</Label>
                  <Input 
                    id="examDate"
                    name="examDate"
                    type="date"
                    value={formData.examDate}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500 [&::-webkit-calendar-picker-indicator]:dark:invert"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultLink" className="dark:text-emerald-100">Result Sheet Link *</Label>
                  <Input 
                    id="resultLink"
                    name="resultLink"
                    type="url"
                    value={formData.resultLink}
                    onChange={handleInputChange}
                    placeholder="Google Drive/Sheet Link..." 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  >
                    {isEditing ? "Update Result" : "Publish Result"}
                  </Button>
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { setIsEditing(false); setFormData({ id: "", examName: "", batch: "", examDate: "", resultLink: "" }); }}
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* 📋 Data Table (Right Side) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm h-full overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-slate-800 dark:text-emerald-100">Published Results</CardTitle>
                <CardDescription className="dark:text-slate-400 mt-1">
                  সর্বমোট {results.length} টি পরীক্ষার ফলাফল প্রকাশ করা হয়েছে।
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search by exam or batch..."
                  className="pl-9 dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="border-y sm:border sm:rounded-md border-slate-200 dark:border-emerald-900/50 overflow-x-auto">
                <Table className="min-w-[650px]">
                  <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                    <TableRow className="border-slate-200 dark:border-emerald-900/50">
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Exam Details</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Batch</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Date</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-slate-500 dark:text-slate-400">
                          এখনো কোনো ফলাফল প্রকাশ করা হয়নি।
                        </TableCell>
                      </TableRow>
                    ) : (
                      results.map((res) => (
                        <TableRow key={res.id} className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20">
                          
                          {/* Exam Details */}
                          <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                                <Award className="h-5 w-5" />
                              </div>
                              <span>{res.examName}</span>
                            </div>
                          </TableCell>
                          
                          {/* Batch Badge */}
                          <TableCell className="text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                              <Users className="h-3.5 w-3.5 text-slate-400" />
                              <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-xs border border-slate-200 dark:border-slate-700">
                                {res.batch}
                              </span>
                            </div>
                          </TableCell>

                          {/* Date */}
                          <TableCell className="text-slate-600 dark:text-slate-300">
                             <div className="flex items-center gap-1.5 whitespace-nowrap text-sm">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              {res.examDate}
                            </div>
                          </TableCell>
                          
                          {/* Actions */}
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 sm:gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="View Result Sheet"
                                onClick={() => window.open(res.resultLink, "_blank")}
                                className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Edit"
                                onClick={() => handleEdit(res)}
                                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Delete"
                                onClick={() => handleDelete(res.id)}
                                className="h-8 w-8 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}