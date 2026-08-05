"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  User,
  FileText,
  Loader2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStudentRequestsAction, updateStudentRequestStatusAction } from "../_actions/student";

interface IStudentRequest {
  id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestDate: string;
  image: string;
}

export default function StudentRequestsClient() {
  const [requests, setRequests] = useState<IStudentRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 🌟 ফিল্টার স্টেট ("ALL" | "PENDING" | "APPROVED" | "REJECTED")
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");

  const fetchRequests = async () => {
    try {
      setErrorMessage(null);

      const result = await getStudentRequestsAction();

      if (result?.success && Array.isArray(result.data)) {
        setRequests(result.data as IStudentRequest[]);
      } else {
        setRequests([]);
        setErrorMessage(result?.message || "ডেটা পাওয়া যায়নি।");
      }
    } catch (error: unknown) {
      console.error("Error fetching student requests:", error);
      setErrorMessage("সার্ভারের সাথে সংযোগ স্থাপন করা যাচ্ছে না।");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Approve Handler
  const handleApprove = async (id: string) => {
    try {
      const result = await updateStudentRequestStatusAction(id, "APPROVED");
      if (result.success) {
        toast.success(result.message || "সফলভাবে Approve করা হয়েছে!");
        await fetchRequests(); // রিয়েল-টাইম আপডেট ও কাউন্টের জন্য
      } else {
        toast.error(result.message || "Failed to approve");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ❌ Reject Handler
  const handleReject = async (id: string) => {
    try {
      const result = await updateStudentRequestStatusAction(id, "REJECTED");
      if (result.success) {
        toast.success(result.message || "সফলভাবে Reject করা হয়েছে!");
        await fetchRequests(); // রিয়েল-টাইম আপডেট ও কাউন্টের জন্য
      } else {
        toast.error(result.message || "Failed to reject");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // 📊 স্ট্যাটাস অনুযায়ী কাউন্ট হিসাব
  const totalRequests = requests?.length || 0;
  const pendingCount = requests?.filter((r) => r.status === "PENDING").length || 0;
  const approvedCount = requests?.filter((r) => r.status === "APPROVED").length || 0;
  const rejectedCount = requests?.filter((r) => r.status === "REJECTED").length || 0;

  // 🔍 সার্চ এবং ফিল্টার লজিক একসাথে
  const filteredRequests = (requests || []).filter((r) => {
    const nameMatch = r.name ? r.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const emailMatch = r.email ? r.email.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const matchesSearch = nameMatch || emailMatch;

    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && r.status === statusFilter;
  });

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          Student Approval Requests
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          যেসব ইউজার স্টুডেন্ট হওয়ার জন্য রিকোয়েস্ট পাঠিয়েছে, তাদের তালিকা দেখে Approve বা Reject করুন।
        </p>
      </div>

      {/* Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-amber-100 dark:border-amber-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Pending Requests</p>
                <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Approved Students</p>
                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{approvedCount}</h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <GraduationCap className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-slate-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Total Applications</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 mt-1">{totalRequests}</h3>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <FileText className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 🌟 Filtering Tabs System */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant={statusFilter === "ALL" ? "default" : "outline"}
          onClick={() => setStatusFilter("ALL")}
          className={`rounded-xl px-5 py-2 font-semibold transition-all ${
            statusFilter === "ALL" 
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md border-transparent" 
              : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-950/40"
          }`}
        >
          All ({totalRequests})
        </Button>

        <Button
          variant={statusFilter === "PENDING" ? "default" : "outline"}
          onClick={() => setStatusFilter("PENDING")}
          className={`rounded-xl px-5 py-2 font-semibold transition-all ${
            statusFilter === "PENDING" 
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md border-transparent" 
              : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-950/40"
          }`}
        >
          Pending ({pendingCount})
        </Button>

        <Button
          variant={statusFilter === "APPROVED" ? "default" : "outline"}
          onClick={() => setStatusFilter("APPROVED")}
          className={`rounded-xl px-5 py-2 font-semibold transition-all ${
            statusFilter === "APPROVED" 
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md border-transparent" 
              : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-950/40"
          }`}
        >
          Approved ({approvedCount})
        </Button>

        <Button
          variant={statusFilter === "REJECTED" ? "default" : "outline"}
          onClick={() => setStatusFilter("REJECTED")}
          className={`rounded-xl px-5 py-2 font-semibold transition-all ${
            statusFilter === "REJECTED" 
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md border-transparent" 
              : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-950/40"
          }`}
        >
          Rejected ({rejectedCount})
        </Button>
      </div>

      {/* 📋 Data Table & Search Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-slate-800 dark:text-emerald-100">Review Applications</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-1">
                {filteredRequests.length} টি আবেদন প্রদর্শিত হচ্ছে।
              </CardDescription>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search applicant name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="border-y sm:border sm:rounded-md border-slate-200 dark:border-emerald-900/50 overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                  <TableRow className="border-slate-200 dark:border-emerald-900/50">
                    <TableHead className="w-[70px] text-center font-semibold text-slate-600 dark:text-emerald-200">Avatar</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Applicant Details</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Request Date</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Status</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" /> ডেটা লোড হচ্ছে...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : errorMessage ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-red-500 dark:text-red-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <AlertCircle className="h-6 w-6" />
                          <span>{errorMessage}</span>
                          <Button size="sm" variant="outline" onClick={fetchRequests} className="mt-2">
                            পুনরায় চেষ্টা করুন (Retry)
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                        কোনো আবেদন পাওয়া যায় নি।
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((req) => (
                      <TableRow key={req.id} className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20">
                        <TableCell className="p-2 text-center">
                          <div className="mx-auto h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-emerald-800 dark:bg-slate-800 flex items-center justify-center">
                            {req.image ? (
                              <img src={req.image} alt={req.name} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                          <div>{req.name}</div>
                          <span className="text-xs text-slate-400 block font-normal">{req.email}</span>
                        </TableCell>

                        <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                          {req.requestDate}
                        </TableCell>

                        <TableCell>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            req.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                              : req.status === "PENDING"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              req.status === "APPROVED" ? "bg-emerald-500" : req.status === "PENDING" ? "bg-amber-500" : "bg-red-500"
                            }`} />
                            {req.status}
                          </span>
                        </TableCell>
                        
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {req.status === "PENDING" ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReject(req.id)}
                                  className="h-8 gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/60 dark:hover:bg-red-950/40"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  Reject
                                </Button>
                                
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApprove(req.id)}
                                  className="h-8 gap-1.5 text-xs bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm border-none"
                                >
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  Approve
                                </Button>
                              </>
                            ) : (
                              <span className="text-xs text-slate-400 italic dark:text-slate-500 px-2">
                                No actions needed
                              </span>
                            )}
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
  );
}