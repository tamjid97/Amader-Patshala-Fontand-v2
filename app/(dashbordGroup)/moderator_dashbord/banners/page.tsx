"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IBanner {
  id: string;
  title: string;
  imageUrl: string;
}

export default function BannerManagementPage() {
  const [banners, setBanners] = useState<IBanner[]>([
    { id: "1", title: "HSC 2025 Special Batch Banner", imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=80" }
  ]);
  const [formData, setFormData] = useState({ title: "", imageUrl: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;
    setBanners([{ id: Date.now().toString(), ...formData }, ...banners]);
    setFormData({ title: "", imageUrl: "" });
  };

  const handleDelete = (id: string) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">Banner Management</h1>
        <p className="text-slate-500 dark:text-emerald-100/70">হোমপেজ ও ড্যাশবোর্ডের প্রমোশনাল ব্যানার পরিবর্তন করুন।</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <Plus className="h-5 w-5" /> Add New Banner
            </CardTitle>
            <CardDescription className="dark:text-slate-400">নতুন ব্যানার যুক্ত করতে ফর্ম পূরণ করুন।</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">Banner Title *</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Summer Offer" required className="dark:bg-slate-900/50 dark:border-emerald-800/50" />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">Image URL *</Label>
                <Input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." required className="dark:bg-slate-900/50 dark:border-emerald-800/50" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Upload Banner</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-emerald-100">Active Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                <TableRow className="border-slate-200 dark:border-emerald-900/50">
                  <TableHead className="w-20 text-center font-semibold text-slate-600 dark:text-emerald-200">Image</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Title</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((b) => (
                  <TableRow key={b.id} className="border-slate-100 dark:border-emerald-900/30">
                    <TableCell className="text-center p-2">
                      <div className="h-10 w-16 mx-auto overflow-hidden rounded border border-slate-200 dark:border-emerald-800">
                        <img src={b.imageUrl} alt={b.title} className="h-full w-full object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-700 dark:text-emerald-50">{b.title}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(b.id)} className="h-8 w-8 text-red-600 hover:bg-red-50">
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
    </div>
  );
}