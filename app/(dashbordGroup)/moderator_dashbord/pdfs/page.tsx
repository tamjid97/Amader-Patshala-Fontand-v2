"use client";

import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Link as LinkIcon,
  Search,
  Image as ImageIcon,
  Loader2,
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
import { createPdf, deletePdf, getPdfs, updatePdf } from "../_actions/pdf";

// Server Actions import করুন (আপনার ফাইলের পাথ অনুযায়ী ঠিক করে নেবেন)

interface IPdf {
  id: string;
  _id?: string; // ব্যাকএন্ডে সাধারণত _id থাকে
  title: string;
  subject: string;
  pdfUrl?: string;
  link?: string;
  image: string;
  date?: string;
  createdAt?: string;
}

export default function PdfManagementPage() {
  const [pdfs, setPdfs] = useState<IPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subject: "",
    link: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // ডাটা লোড করার ফাংশন
  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const res = await getPdfs();
      if (res.success && Array.isArray(res.data)) {
        // ব্যাকএন্ডের _id কে id হিসেবে ম্যাপ করা হলো এবং pdfUrl কে link হিসেবে ধরা হলো
        const formattedData = res.data.map((item: any) => ({
          ...item,
          id: item._id || item.id,
          link: item.pdfUrl || item.link,
        }));
        setPdfs(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch PDFs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ডাটা লোড করার ফাংশন
  useEffect(() => {
    let isMounted = true;

    const loadPdfs = async () => {
      setLoading(true);
      try {
        const res = await getPdfs();
        if (isMounted && res.success && Array.isArray(res.data)) {
          const formattedData = res.data.map((item: any) => ({
            ...item,
            id: item._id || item.id,
            link: item.pdfUrl || item.link,
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
    };

    loadPdfs();

    return () => {
      isMounted = false;
    };
  }, []);

  // ইনপুট হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // সাবমিট (Create & Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subject || !formData.link) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("link", formData.link);
    data.append("image", formData.image);

    startTransition(async () => {
      if (isEditing && formData.id) {
        // Update Action
        const res = await updatePdf(formData.id, data);
        if (res.success) {
          alert("সফলভাবে আপডেট করা হয়েছে!");
          setIsEditing(false);
          fetchPdfs();
        } else {
          alert(res.message || "আপডেট করতে সমস্যা হয়েছে।");
        }
      } else {
        // Create Action
        const res = await createPdf(data);
        if (res.success) {
          alert("সফলভাবে পিডিএফ যুক্ত করা হয়েছে!");
          fetchPdfs();
        } else {
          alert(res.message || "যোগ করতে সমস্যা হয়েছে।");
        }
      }
      setFormData({ id: "", title: "", subject: "", link: "", image: "" });
    });
  };

  // এডিট হ্যান্ডলার
  const handleEdit = (pdf: IPdf) => {
    setFormData({
      id: pdf.id,
      title: pdf.title,
      subject: pdf.subject,
      link: pdf.link || "",
      image: pdf.image || "",
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই PDF টি ডিলিট করতে চান?")) {
      startTransition(async () => {
        const res = await deletePdf(id);
        if (res.success) {
          alert("সফলভাবে ডিলিট করা হয়েছে!");
          fetchPdfs();
        } else {
          alert(res.message || "ডিলিট করতে সমস্যা হয়েছে।");
        }
      });
    }
  };

  // সার্চ ফিল্টার
  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* 🌟 Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          PDF Management
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          স্টাডি ম্যাটেরিয়াল এবং পিডিএফ ফাইলগুলো আপলোড, এডিট এবং ডিলিট করুন।
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
                {isEditing ? (
                  <Edit2 className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
                {isEditing ? "Update PDF" : "Add New PDF"}
              </CardTitle>
              <CardDescription className="dark:text-slate-400">
                শিক্ষার্থীদের জন্য নতুন পিডিএফ ও কভার ছবি যুক্ত করুন।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="dark:text-emerald-100">
                    PDF Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Chapter 1 Notes"
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="dark:text-emerald-100">
                    Subject / Category *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Botany"
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="dark:text-emerald-100">
                    Cover Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link" className="dark:text-emerald-100">
                    Google Drive Link *
                  </Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/..."
                    required
                    className="dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  >
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isEditing ? "Update PDF" : "Upload PDF"}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          id: "",
                          title: "",
                          subject: "",
                          link: "",
                          image: "",
                        });
                      }}
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
                <CardTitle className="text-slate-800 dark:text-emerald-100">
                  Uploaded Files
                </CardTitle>
                <CardDescription className="dark:text-slate-400 mt-1">
                  সর্বমোট {filteredPdfs.length} টি পিডিএফ পাওয়া গেছে।
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search PDFs..."
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
                        Title
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">
                        Subject
                      </TableHead>
                      <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-32 text-center text-slate-500 dark:text-slate-400"
                        >
                          <div className="flex justify-center items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />{" "}
                            লোড হচ্ছে...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredPdfs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-32 text-center text-slate-500 dark:text-slate-400"
                        >
                          কোনো পিডিএফ পাওয়া যায়নি।
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPdfs.map((pdf) => (
                        <TableRow
                          key={pdf.id}
                          className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20"
                        >
                          {/* 🖼️ Image Cell */}
                          <TableCell className="p-2 text-center">
                            <div className="mx-auto h-12 w-12 overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-emerald-800 dark:bg-slate-800 flex items-center justify-center">
                              {pdf.image ? (
                                <img
                                  src={pdf.image}
                                  alt={pdf.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                          </TableCell>

                          <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                            <div className="flex items-center gap-2">
                              {pdf.title}
                            </div>
                            <span className="text-xs text-slate-400 block mt-0.5">
                              {pdf.date || pdf.createdAt?.split("T")[0]}
                            </span>
                          </TableCell>

                          <TableCell className="text-slate-600 dark:text-slate-300">
                            <span className="bg-slate-100 dark:bg-emerald-900/30 px-2 py-1 rounded-md text-xs border border-slate-200 dark:border-emerald-800/50">
                              {pdf.subject}
                            </span>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 sm:gap-2">
                              {pdf.link && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View PDF"
                                  onClick={() =>
                                    window.open(pdf.link, "_blank")
                                  }
                                  className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => handleEdit(pdf)}
                                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={() => handleDelete(pdf.id)}
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
