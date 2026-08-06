"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
  CheckSquare,
  Square
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

// আপনার ব্যাকএন্ড অ্যাকশনগুলো ইমপোর্ট করুন
import { getPdfs, updatePdf } from "../_actions/pdf";

interface IPdf {
  id: string;
  _id?: string;
  title: string;
  subject: string;
  className?: string;
  pdfUrl?: string;
  link?: string;
  image: string;
  date?: string;
  createdAt?: string;
}

const AVAILABLE_BATCHES = [

    "HSC-27",
    "HSC-28",
    "SSC-27",
    "SSC-28"
];

export default function PdfAccessManagementPage() {
  const [pdfs, setPdfs] = useState<IPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const [selectedPdf, setSelectedPdf] = useState<IPdf | null>(null);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);

  // 🌟 useCallback দিয়ে ফাংশনটিকে অপ্টিমাইজ করা হলো যাতে ক্যাসকেডিং রেন্ডার না হয়
  const fetchPdfs = useCallback(async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    }
    try {
      const res = await getPdfs();
      const rawData = Array.isArray(res) ? res : res?.data;

      if (res?.success && Array.isArray(rawData)) {
        const formattedData = rawData.map((item: Record<string, unknown>) => ({
          ...(item as unknown as IPdf),
          id: (item._id as string) || (item.id as string) || "",
          link: (item.pdfUrl as string) || (item.link as string) || "",
          image: (item.image as string) || (item.coverImage as string) || "",
          title: (item.title as string) || "",
          subject: (item.subject as string) || (item.category as string) || "",
          className: (item.className as string) || (item.class as string) || "",
        }));
        setPdfs(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch PDFs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🌟 useEffect-এর ভেতরে সরাসরি ফেচ ফাংশন কল না করে নিরাপদ উপায়ে হ্যান্ডেল করা হলো
  useEffect(() => {
    let isMounted = true;
    
    async function loadInitialData() {
      try {
        const res = await getPdfs();
        const rawData = Array.isArray(res) ? res : res?.data;

        if (isMounted && res?.success && Array.isArray(rawData)) {
          const formattedData = rawData.map((item: Record<string, unknown>) => ({
            ...(item as unknown as IPdf),
            id: (item._id as string) || (item.id as string) || "",
            link: (item.pdfUrl as string) || (item.link as string) || "",
            image: (item.image as string) || (item.coverImage as string) || "",
            title: (item.title as string) || "",
            subject: (item.subject as string) || (item.category as string) || "",
            className: (item.className as string) || (item.class as string) || "",
          }));
          setPdfs(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch PDFs:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleManageAccess = (pdf: IPdf) => {
    setSelectedPdf(pdf);
    const currentBatches = pdf.className 
      ? pdf.className.split(",").map(b => b.trim()).filter(b => b !== "")
      : [];
    
    setSelectedBatches(currentBatches);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleBatch = (batchName: string) => {
    setSelectedBatches((prev) => 
      prev.includes(batchName) 
        ? prev.filter((b) => b !== batchName)
        : [...prev, batchName]
    );
  };

const handleSubmitAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPdf) return;

    const updatedClassNameString = selectedBatches.join(", ");

    const payload = {
      className: updatedClassNameString,
      title: selectedPdf.title || "",
      subject: selectedPdf.subject || "",
      pdfUrl: selectedPdf.pdfUrl || selectedPdf.link || "",
      image: selectedPdf.image || "",
    };

    // 🔍 কি পাঠানো হচ্ছে তা কনসোলে চেক করার জন্য
    console.log("➡️ Sending ID:", selectedPdf.id);
    console.log("➡️ Sending Payload:", payload);

    startTransition(async () => {
      try {
        const res = await updatePdf(selectedPdf.id, payload);
        console.log("⬅️ Server Response:", res);

        if (res && res.success) {
          alert("সফলভাবে ব্যাচ এক্সেস আপডেট করা হয়েছে!");
          setSelectedPdf(null);
          setSelectedBatches([]);
          fetchPdfs(true); 
        } else {
          alert(res?.message || "আপডেট করতে সমস্যা হয়েছে।");
        }
      } catch (error: any) {
        // 🔍 আসল এরর কনসোলে প্রিন্ট করার জন্য
        console.error("❌ Detailed Catch Error:", error);
        alert(`সার্ভার এরর: ${error.message || "সংযোগ বিচ্ছিন্ন হয়েছে।"}`);
      }
    });
  };

  const filteredPdfs = pdfs.filter(
    (pdf) =>
      (pdf.title || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
      (pdf.subject || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
      (pdf.className || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          PDF Access Control
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          নির্ধারণ করুন কোন পিডিএফটি কোন কোন ব্যাচের শিক্ষার্থীরা দেখতে পাবে।
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column - Access Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-1"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm sticky top-6">
            <CardHeader>
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Manage Batch Access
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                {selectedPdf 
                  ? "নিচের লিস্ট থেকে ব্যাচগুলো টিক দিন।" 
                  : "ডানদিকের টেবিল থেকে একটি পিডিএফ সিলেক্ট করুন।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPdf ? (
                <form onSubmit={handleSubmitAccess} className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Selected PDF:</p>
                    <p className="font-semibold text-slate-800 dark:text-emerald-100">{selectedPdf.title}</p>
                    <p className="text-sm text-slate-600 dark:text-emerald-200/70">{selectedPdf.subject}</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 dark:text-emerald-100 font-semibold border-b border-slate-200 dark:border-slate-800 pb-2 block">
                      Allow Access For:
                    </Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {AVAILABLE_BATCHES.map((batch) => {
                        const isChecked = selectedBatches.includes(batch);
                        return (
                          <div 
                            key={batch}
                            onClick={() => toggleBatch(batch)}
                            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border transition-all duration-200 ${
                              isChecked 
                                ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500/50 dark:text-emerald-200" 
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-400" />
                            )}
                            <span className="text-sm font-medium">{batch}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    >
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Access
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedPdf(null);
                        setSelectedBatches([]);
                      }}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    এক্সেস ম্যানেজ করতে ডানদিকের টেবিল থেকে <strong>Manage Access</strong> বাটনে ক্লিক করুন।
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Table */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2"
        >
          <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm h-full overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
              <div>
                <CardTitle className="text-slate-800 dark:text-emerald-100">
                  All PDFs Library
                </CardTitle>
                <CardDescription className="dark:text-slate-400 mt-1">
                  সর্বমোট {filteredPdfs.length} টি পিডিএফ পাওয়া গেছে।
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, batch..."
                  className="pl-9 dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <div className="border-y sm:border sm:rounded-md border-slate-200 dark:border-emerald-900/50 overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                    <TableRow className="border-slate-200 dark:border-emerald-900/50">
                      <TableHead className="w-[80px] text-center font-semibold text-slate-600 dark:text-emerald-200">
                        Cover
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                        Title & Subject
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                        Allowed Batches
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-slate-500 dark:text-slate-400">
                          <div className="flex justify-center items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" /> লোড হচ্ছে...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredPdfs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-slate-500 dark:text-slate-400">
                          কোনো পিডিএফ পাওয়া যায়নি।
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPdfs.map((pdf) => (
                        <TableRow
                          key={pdf.id}
                          className={`border-slate-100 dark:border-emerald-900/30 transition-colors ${
                            selectedPdf?.id === pdf.id ? "bg-emerald-50/50 dark:bg-emerald-950/40" : "hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20"
                          }`}
                        >
                          <TableCell className="p-2 text-center">
                            <div className="mx-auto h-12 w-12 overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-emerald-800 dark:bg-slate-800 flex items-center justify-center">
                              {pdf.image ? (
                                <img src={pdf.image} alt={pdf.title} className="h-full w-full object-cover" />
                              ) : (
                                <ImageIcon className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                          </TableCell>

                          <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                            <div className="font-semibold">{pdf.title}</div>
                            <div className="text-xs text-slate-500 dark:text-emerald-200/60 mt-0.5">
                              {pdf.subject}
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {pdf.className ? (
                                pdf.className.split(",").map((batch, index) => (
                                  <span key={index} className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 px-2 py-0.5 rounded-md text-[10px] font-medium border border-emerald-200 dark:border-emerald-800">
                                    {batch.trim()}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-red-500 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-100 dark:border-red-900">
                                  No Access Assigned
                                </span>
                              )}
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <Button
                              variant={selectedPdf?.id === pdf.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleManageAccess(pdf)}
                              className={selectedPdf?.id === pdf.id 
                                ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                                : "text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/50"
                              }
                            >
                              <ShieldCheck className="h-4 w-4 mr-1.5" />
                              Manage Access
                            </Button>
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