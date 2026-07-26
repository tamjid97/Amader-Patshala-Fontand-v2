"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IMedia {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
}

export default function MediaUploadPage() {
  const [mediaList, setMediaList] = useState<IMedia[]>([
    { id: "1", fileName: "Lecture-01-Recording.mp4", fileType: "Video", fileUrl: "https://..." }
  ]);
  const [formData, setFormData] = useState({ fileName: "", fileType: "Video", fileUrl: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileName || !formData.fileUrl) return;
    setMediaList([{ id: Date.now().toString(), ...formData }, ...mediaList]);
    setFormData({ fileName: "", fileType: "Video", fileUrl: "" });
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">Media Upload</h1>
        <p className="text-slate-500 dark:text-emerald-100/70">ক্লাস রেকর্ডিং ও মিডিয়া ফাইল সার্ভারে আপলোড করুন।</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <UploadCloud className="h-5 w-5" /> Upload Media
            </CardTitle>
            <CardDescription className="dark:text-slate-400">নতুন মিডিয়া ফাইলের লিংক যুক্ত করুন।</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">File Name *</Label>
                <Input value={formData.fileName} onChange={e => setFormData({...formData, fileName: e.target.value})} placeholder="e.g. Class 1 Video" required className="dark:bg-slate-900/50 dark:border-emerald-800/50" />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">File URL *</Label>
                <Input type="url" value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} placeholder="https://..." required className="dark:bg-slate-900/50 dark:border-emerald-800/50" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Upload</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-emerald-100">Uploaded Media</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                <TableRow className="border-slate-200 dark:border-emerald-900/50">
                  <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">File Name</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mediaList.map((m) => (
                  <TableRow key={m.id} className="border-slate-100 dark:border-emerald-900/30">
                    <TableCell className="font-medium text-slate-700 dark:text-emerald-50 flex items-center gap-2">
                      <File className="h-4 w-4 text-emerald-500" /> {m.fileName}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(m.id)} className="h-8 w-8 text-red-600 hover:bg-red-50">
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