"use client";

import React, { useActionState } from "react";
// 🌟 ১. ফর্মে লোডিং স্টেট চেক করার জন্য useFormStatus ইম্পোর্ট করা হলো
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Clock,
  Search,
  Users,
  CalendarDays,
  MapPin,
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
import { createBatch } from "../_actions/batchTime";

// 🌟 ২. সার্ভার অ্যাকশন ফাইল থেকে createBatch ফাংশনটি ইম্পোর্ট করা হলো


// 🌟 ৩. SubmitButton কম্পোনেন্টটি এখানে ডিফাইন করা হলো যাতে 'Not defined' এরর না আসে
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
    >
      {pending ? "Adding..." : "Add Schedule"}
    </Button>
  );
}

interface ISchedule {
  id: string;
  batchName: string;
  days: string;
  time: string;
  location: string;
}

const schedules: ISchedule[] = [
  {
    id: "1",
    batchName: "HSC 2025 (Botany)",
    days: "শনি - সোম - বুধ",
    time: "বিকাল ৩:০০ - ৪:৩০",
    location: "Room 101 (Offline)",
  },
  {
    id: "2",
    batchName: "Medical Target 2026",
    days: "রবি - মঙ্গল - বৃহস্পতি",
    time: "রাত ৮:০০ - ৯:৩০",
    location: "Zoom (Online)",
  },
];

export default function BatchSchedulePage() {
  const initialState = {
    success: false,
    statusCode: 200,
    message: "",
    data: {},
  };

  // 🌟 ৪. সার্ভার অ্যাকশনের সাথে ফর্ম কানেক্ট করার জন্য useActionState হুক
  const [state, formAction] = useActionState(createBatch, initialState);

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* 🌟 Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          Batch Schedule
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          শিক্ষার্থীদের জন্য নতুন ব্যাচের সময়সূচি এবং রুটিন তৈরি ও আপডেট করুন।
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
                <Plus className="h-5 w-5" />
                Add New Schedule
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                ব্যাচের নতুন রুটিন বা সময়সূচি যুক্ত করতে ফর্মটি পূরণ করুন।
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 🌟 ৫. ফর্ম সাবমিট হলে formAction ট্রিগার হবে */}
              <form action={formAction} className="space-y-4">
                
                {/* 🌟 ৬. সার্ভার থেকে আসা সফল বা ব্যর্থ মেসেজ এখানে দেখানো হবে */}
                {state?.message && (
                  <p
                    className={`text-sm font-medium ${state.success ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {state.message}
                  </p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="batchName" className="dark:text-emerald-100">
                    Batch Name *
                  </Label>
                  <Input
                    id="batchName"
                    name="batchName"
                    placeholder="e.g. HSC 2025"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days" className="dark:text-emerald-100">
                    Class Days *
                  </Label>
                  <Input
                    id="days"
                    name="date"
                    placeholder="e.g. শনি - সোম - বুধ"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="dark:text-emerald-100">
                    Class Time *
                  </Label>
                  <Input
                    id="time"
                    name="classTime"
                    placeholder="e.g. বিকাল ৩:০০ - ৪:৩০"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>


                <div className="pt-2 flex gap-3">
                  {/* 🌟 ৭. লোডিং স্টেটসহ সাবমিট বাটনটি রেন্ডার করা হলো */}
                  <SubmitButton />
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
                <Table className="min-w-[650px]">
                  <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                    <TableRow className="border-slate-200 dark:border-emerald-900/50">
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                        Batch Name
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                        Schedule
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                        Location
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((sch) => (
                      <TableRow
                        key={sch.id}
                        className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20"
                      >
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
                              className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}