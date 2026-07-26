"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Clock, Search, Users, CalendarDays, MapPin } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ব্যাচ শিডিউল ডাটা টাইপ
interface ISchedule {
  id: string;
  batchName: string;
  days: string;
  time: string;
  location: string;
}

export default function BatchSchedulePage() {
  // State Management & Demo Data
  const [schedules, setSchedules] = useState<ISchedule[]>([
    { 
      id: "1", 
      batchName: "HSC 2025 (Botany)", 
      days: "শনি - সোম - বুধ", 
      time: "বিকাল ৩:০০ - ৪:৩০",
      location: "Room 101 (Offline)" 
    },
    { 
      id: "2", 
      batchName: "Medical Target 2026", 
      days: "রবি - মঙ্গল - বৃহস্পতি", 
      time: "রাত ৮:০০ - ৯:৩০",
      location: "Zoom (Online)" 
    },
  ]);

  const [formData, setFormData] = useState({ id: "", batchName: "", days: "", time: "", location: "" });
  const [isEditing, setIsEditing] = useState(false);

  // ইনপুট হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // সাবমিট (Create & Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batchName || !formData.days || !formData.time) return;

    if (isEditing) {
      // Update Logic
      setSchedules(schedules.map((sch) => (sch.id === formData.id ? { ...sch, ...formData } : sch)));
      setIsEditing(false);
    } else {
      // Create Logic
      const newSchedule = {
        ...formData,
        id: Date.now().toString(),
      };
      setSchedules([newSchedule, ...schedules]);
    }
    // Reset Form
    setFormData({ id: "", batchName: "", days: "", time: "", location: "" }); 
  };

  // এডিট হ্যান্ডলার
  const handleEdit = (schedule: ISchedule) => {
    setFormData(schedule);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই শিডিউলটি ডিলিট করতে চান?")) {
      setSchedules(schedules.filter((sch) => sch.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* 🌟 Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          Batch Schedule
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          শিক্ষার্থীদের জন্য নতুন ব্যাচের সময়সূচি এবং রুটিন তৈরি ও আপডেট করুন।
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
                {isEditing ? "Update Schedule" : "Add New Schedule"}
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                ব্যাচের নতুন রুটিন বা সময়সূচি যুক্ত করতে ফর্মটি পূরণ করুন।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-2">
                  <Label htmlFor="batchName" className="dark:text-emerald-100">Batch Name *</Label>
                  <Input 
                    id="batchName"
                    name="batchName" 
                    value={formData.batchName}
                    onChange={handleInputChange}
                    placeholder="e.g. HSC 2025" 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="days" className="dark:text-emerald-100">Class Days *</Label>
                  <Input 
                    id="days"
                    name="days" 
                    value={formData.days}
                    onChange={handleInputChange}
                    placeholder="e.g. শনি - সোম - বুধ" 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="dark:text-emerald-100">Class Time *</Label>
                  <Input 
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g. বিকাল ৩:০০ - ৪:৩০" 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="dark:text-emerald-100">Location / Platform *</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Zoom or Room 101" 
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  >
                    {isEditing ? "Update Schedule" : "Add Schedule"}
                  </Button>
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => { setIsEditing(false); setFormData({ id: "", batchName: "", days: "", time: "", location: "" }); }}
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
                <CardTitle className="text-slate-800 dark:text-emerald-100">Current Schedules</CardTitle>
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
                <Table className="min-w-[650px]">
                  <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                    <TableRow className="border-slate-200 dark:border-emerald-900/50">
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Batch Name</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Schedule</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Location</TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-slate-500 dark:text-slate-400">
                          কোনো শিডিউল পাওয়া যায়নি।
                        </TableCell>
                      </TableRow>
                    ) : (
                      schedules.map((sch) => (
                        <TableRow key={sch.id} className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20">
                          
                          {/* Batch Name */}
                          <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                                <Users className="h-5 w-5" />
                              </div>
                              <span className="font-bold">{sch.batchName}</span>
                            </div>
                          </TableCell>
                          
                          {/* Schedule Details */}
                          <TableCell className="text-slate-600 dark:text-slate-300">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 whitespace-nowrap text-sm">
                                <CalendarDays className="h-3.5 w-3.5 text-emerald-500" />
                                {sch.days}
                              </div>
                              <div className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                <Clock className="h-3.5 w-3.5 text-amber-500" />
                                {sch.time}
                              </div>
                            </div>
                          </TableCell>

                          {/* Location */}
                          <TableCell className="text-slate-600 dark:text-slate-300">
                             <div className="flex items-center gap-1.5 whitespace-nowrap text-sm">
                              <MapPin className="h-3.5 w-3.5 text-rose-500" />
                              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-200 dark:border-slate-700">
                                {sch.location}
                              </span>
                            </div>
                          </TableCell>
                          
                          {/* Actions */}
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 sm:gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Edit"
                                onClick={() => handleEdit(sch)}
                                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Delete"
                                onClick={() => handleDelete(sch.id)}
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