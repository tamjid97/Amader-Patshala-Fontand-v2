"use client";

import React, { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Clock,
  Search,
  Users,
  CalendarDays,
  X 
} from "lucide-react"; 

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createBatch, getBatchTime, updateBatch, deleteBatch } from "../_actions/batchTime";

interface ISchedule {
  id: string;
  batchName: string;
  date: string;
  classTime: string;
}

export default function BatchSchedulePage() {
  const initialState = {
    success: false,
    statusCode: 200,
    message: "",
    data: {},
  };

  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingBatch, setEditingBatch] = useState<ISchedule | null>(null);

  const [isPending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState<{ success: boolean; text: string } | null>(null);

  // ডাটা ফেচ করার কমন ফাংশন
  const fetchBatchData = async () => {
    const response = await getBatchTime();
    if (response?.success) {
      setSchedules(response.data || []);
    }
  };

  // পেজ লোড হওয়ার সময় একবার ডাটা ফেচ হবে
  useEffect(() => {
    let isMounted = true;
    const initFetch = async () => {
      await fetchBatchData();
      if (isMounted) setIsLoading(false);
    };
    initFetch();
    return () => { isMounted = false; };
  }, []);

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 🌟 সমাধান: await করার আগেই form ভেরিয়েবলে টার্গেট সেভ করে রাখা হলো
    const form = e.currentTarget; 
    const formData = new FormData(form);

    startTransition(async () => {
      if (editingBatch) {
        const res = await updateBatch(editingBatch.id, initialState, formData);
        if (res?.success) {
          setEditingBatch(null);
          setFormMessage({ success: true, text: res.message || "Schedule updated successfully!" });
          fetchBatchData(); 
          form.reset(); // 🌟 এখানে form.reset() ব্যবহার করা হয়েছে
        } else {
          setFormMessage({ success: false, text: res?.message || "Failed to update schedule" });
        }
      } else {
        const res = await createBatch(initialState, formData);
        if (res?.success) {
          setFormMessage({ success: true, text: res.message || "Schedule created successfully!" });
          fetchBatchData(); 
          form.reset(); // 🌟 এখানে form.reset() ব্যবহার করা হয়েছে
        } else {
          setFormMessage({ success: false, text: res?.message || "Failed to create schedule" });
        }
      }
    });
  };

  // ডিলিট ফাংশন
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      const res = await deleteBatch(id);
      if (res?.success) {
        fetchBatchData(); 
      } else {
        alert(res?.message || "Failed to delete schedule");
      }
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          Batch Schedule
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          শিক্ষার্থীদের জন্য নতুন ব্যাচের সময়সূচি এবং রুটিন তৈরি ও আপডেট করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-1"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm sticky top-6">
            <CardHeader>
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {editingBatch ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {editingBatch ? "Update Schedule" : "Add New Schedule"}
                </div>
                
                {editingBatch && (
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setEditingBatch(null);
                      setFormMessage(null);
                    }}
                    className="h-8 text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4 mr-1"/> Cancel
                  </Button>
                )}
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                {editingBatch 
                  ? "বর্তমান ব্যাচের সময়সূচি পরিবর্তন করুন।" 
                  : "ব্যাচের নতুন রুটিন বা সময়সূচি যুক্ত করতে ফর্মটি পূরণ করুন।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              
              <form onSubmit={handleFormSubmit} key={editingBatch ? editingBatch.id : "create"} className="space-y-4">
                
                {formMessage?.text && (
                  <p className={`text-sm font-medium ${formMessage.success ? "text-emerald-500" : "text-red-500"}`}>
                    {formMessage.text}
                  </p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="batchName" className="dark:text-emerald-100">Batch Name *</Label>
                  <Input
                    id="batchName"
                    name="batchName"
                    defaultValue={editingBatch?.batchName || ""}
                    placeholder="e.g. HSC 2025"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="dark:text-emerald-100">Class Days *</Label>
                  <Input
                    id="date"
                    name="date"
                    defaultValue={editingBatch?.date || ""}
                    placeholder="e.g. শনি - সোম - বুধ"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classTime" className="dark:text-emerald-100">Class Time *</Label>
                  <Input
                    id="classTime"
                    name="classTime"
                    defaultValue={editingBatch?.classTime || ""}
                    placeholder="e.g. বিকাল ৩:০০ - ৪:৩০"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                    required
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  >
                    {isPending 
                      ? (editingBatch ? "Updating..." : "Adding...") 
                      : (editingBatch ? "Update Schedule" : "Add Schedule")}
                  </Button>
                </div>
              </form>

            </CardContent>
          </Card>
        </motion.div>

        {/* Data Table Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm h-full overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-slate-800 dark:text-emerald-100">
                  Current Schedules
                </CardTitle>
                <CardDescription className="dark:text-slate-400 mt-1">
                  সর্বমোট {schedules.length} টি ব্যাচের শিডিউল অ্যাক্টিভ আছে।
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search batch..."
                  className="pl-9 dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="border-y sm:border sm:rounded-md border-slate-200 dark:border-emerald-900/50 overflow-x-auto">
                {isLoading ? (
                  <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                    Loading schedules...
                  </div>
                ) : schedules.length === 0 ? (
                  <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                    No schedules found. Please add a new one.
                  </div>
                ) : (
                  <Table className="min-w-[650px]">
                    <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                      <TableRow className="border-slate-200 dark:border-emerald-900/50">
                        <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                          Batch Name
                        </TableHead>
                        <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                          Schedule
                        </TableHead>
                        <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.map((sch) => (
                        <TableRow
                          key={sch.id || sch.batchName}
                          className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20"
                        >
                          <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                                <Users className="h-5 w-5" />
                              </div>
                              <span className="font-bold">{sch.batchName}</span>
                            </div>
                          </TableCell>

                          <TableCell className="text-slate-600 dark:text-slate-300">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 whitespace-nowrap text-sm">
                                <CalendarDays className="h-3.5 w-3.5 text-emerald-500" />
                                {sch.date}
                              </div>
                              <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                <Clock className="h-3.5 w-3.5 text-amber-500" />
                                {sch.classTime}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 sm:gap-2">
                              <Button
                                onClick={() => {
                                  setEditingBatch(sch);
                                  setFormMessage(null);
                                }}
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                onClick={() => handleDelete(sch.id)}
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                className="h-8 w-8 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}