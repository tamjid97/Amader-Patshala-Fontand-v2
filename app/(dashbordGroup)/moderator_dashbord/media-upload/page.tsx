"use client";

import React, { useActionState, useState } from "react";
import { ImagePlus, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFormStatus } from "react-dom";
import { picUplade } from "../_actions/picMidia";

interface IGallery {
  id: string;
  title: string;
  pictureUrl: string;
  description: string;
}

  // work 1
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

export default function GalleryManagementPage() {
  const [galleryList] = useState<IGallery[]>([
    { 
      id: "1", 
      title: "Anniversary Event Photo", 
      pictureUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", 
      description: "Edited couple photo for the cover page." 
    }
  ]);




// work 2
    const initialState = {
    success: false,
    statusCode: 200,
    message: "",
    data: {},
  };


  // work 3
  const [state, formAction] = useActionState(picUplade, initialState);
  

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* পেইজ হেডার */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">Gallery Management</h1>
        <p className="text-slate-500 dark:text-emerald-100/70">ওয়েবসাইটের ছবি প্রদর্শনের প্যানেল।</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ইনপুট কার্ড */}
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <ImagePlus className="h-5 w-5" /> 
              Add New Picture
            </CardTitle>
            <CardDescription className="dark:text-slate-400">
              ছবির টাইটেল, লিংক এবং ডেসক্রিপশন দিন।
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* work 4 */}
            <form action={formAction}>
              {/* wark 5 */}
              {state?.message && (
                  <p
                    className={`text-sm font-medium ${state.success ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {state.message}
                  </p>
                )}


              <div className="space-y-4">
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">Title *</Label>
                <Input 
                  name="title"
                  placeholder="e.g. Anniversary Event Photo" 
                  className="dark:bg-slate-900/50 dark:border-emerald-800/50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">Picture URL *</Label>
                <Input
                  name="pictureUrl"
                  type="url" 
                  placeholder="https://..." 
                  className="dark:bg-slate-900/50 dark:border-emerald-800/50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-emerald-100">Description</Label>
                <Input
                  name="description"
                  placeholder="Short description..." 
                  className="dark:bg-slate-900/50 dark:border-emerald-800/50" 
                />
              </div>
              
              
            </div>
              <div className="pt-2">
                {/* work 6 */}
                <SubmitButton/>
              </div>
            </form>
            
          </CardContent>
        </Card>

        {/* টেবিল কার্ড */}
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-emerald-100 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Uploaded Pictures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                <TableRow className="border-slate-200 dark:border-emerald-900/50">
                  <TableHead className="w-16 font-semibold text-slate-600 dark:text-emerald-200">Image</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Title</TableHead>
                  <TableHead className="hidden md:table-cell font-semibold text-slate-600 dark:text-emerald-200">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {galleryList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-slate-500">
                      No pictures uploaded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  galleryList.map((item) => (
                    <TableRow key={item.id} className="border-slate-100 dark:border-emerald-900/30">
                      
                      {/* প্রিভিউ ইমেজ */}
                      <TableCell>
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={item.pictureUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=Error")} 
                          />
                        </div>
                      </TableCell>
                      
                      {/* টাইটেল */}
                      <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                        {item.title}
                      </TableCell>
                      
                      {/* ডেসক্রিপশন */}
                      <TableCell className="hidden md:table-cell text-sm text-slate-500 dark:text-emerald-100/60 max-w-[200px] truncate">
                        {item.description || "N/A"}
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}