"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Trash2, CheckCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IReview {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  status: "Approved" | "Pending";
}

export default function ReviewManagementPage() {
  const [reviews, setReviews] = useState<IReview[]>([
    { id: "1", studentName: "Rakibul Hasan", rating: 5, comment: "বোটানি ক্লাসগুলো অসাধারণ লেগেছে!", status: "Approved" },
    { id: "2", studentName: "Sumaiya Akter", rating: 4, comment: "পিডিএফ নোটগুলো খুব হেল্পফুল ছিল।", status: "Pending" },
  ]);

  const toggleStatus = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: r.status === "Approved" ? "Pending" : "Approved" } : r));
  };

  const handleDelete = (id: string) => {
    if (confirm("এই রিভিউটি ডিলিট করতে চান?")) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">Review Management</h1>
        <p className="text-slate-500 dark:text-emerald-100/70">শিক্ষার্থীদের ফিডব্যাক ও রিভিউ মনিটর এবং অনুমোদন করুন।</p>
      </div>

      <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-slate-800 dark:text-emerald-100">Student Reviews</CardTitle>
            <CardDescription className="dark:text-slate-400 mt-1">সর্বমোট {reviews.length} টি রিভিউ পাওয়া গেছে।</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Search reviews..." className="pl-9 dark:bg-slate-900/50 dark:border-emerald-800/50" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
              <TableRow className="border-slate-200 dark:border-emerald-900/50">
                <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Student</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Rating</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Comment</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((rev) => (
                <TableRow key={rev.id} className="border-slate-100 dark:border-emerald-900/30">
                  <TableCell className="font-medium text-slate-700 dark:text-emerald-50 flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-500" /> {rev.studentName}
                  </TableCell>
                  <TableCell>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">{rev.comment}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-xs ${rev.status === "Approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                      {rev.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => toggleStatus(rev.id)} className="h-8 text-xs">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" /> Toggle
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(rev.id)} className="h-8 w-8 text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}