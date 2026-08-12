"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  User,
  FileText,
  Loader2,
  AlertCircle,
  Eye,
  Mail,
  Calendar,
  ShieldCheck,
  Hash,
  School,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Actions (আপনার পাথ অনুযায়ী ঠিক রাখবেন)
import { 
  getStudentRequestsAction, 
  updateStudentRequestStatusAction,
  getStudentDetailsAction 
} from "../_actions/student";

interface IStudentRequest {
  id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestDate: string;
  image: string;
}

interface IStudentDetails extends IStudentRequest {
  studentId?: string;
  role?: string;
  class?: string;
  institute?: string;
}

export default function StudentRequestsClient() {
  const [requests, setRequests] = useState<IStudentRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");

  const [selectedStudent, setSelectedStudent] = useState<IStudentDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

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

  const handleApprove = async (id: string) => {
    try {
      const result = await updateStudentRequestStatusAction(id, "APPROVED");
      if (result.success) {
        toast.success(result.message || "সফলভাবে Approve করা হয়েছে!");
        await fetchRequests();
      } else {
        toast.error(result.message || "Failed to approve");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const result = await updateStudentRequestStatusAction(id, "REJECTED");
      if (result.success) {
        toast.success(result.message || "সফলভাবে Reject করা হয়েছে!");
        await fetchRequests();
      } else {
        toast.error(result.message || "Failed to reject");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      setDetailsLoading(true);
      setIsDetailsOpen(true);
      setSelectedStudent(null);
      
      const result = await getStudentDetailsAction(id);
      
      if (result.success && result.data) {
        setSelectedStudent(result.data as IStudentDetails);
      } else {
        toast.error(result.message || "স্টুডেন্ট ডিটেইলস লোড করা যায়নি।");
        setIsDetailsOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("ডেটা ফেচ করতে কোনো সমস্যা হয়েছে।");
      setIsDetailsOpen(false);
    } finally {
      setDetailsLoading(false);
    }
  };

  const totalRequests = requests?.length || 0;
  const pendingCount = requests?.filter((r) => r.status === "PENDING").length || 0;
  const approvedCount = requests?.filter((r) => r.status === "APPROVED").length || 0;
  const rejectedCount = requests?.filter((r) => r.status === "REJECTED").length || 0;

  const filteredRequests = (requests || []).filter((r) => {
    const nameMatch = r.name ? r.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const emailMatch = r.email ? r.email.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const matchesSearch = nameMatch || emailMatch;

    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && r.status === statusFilter;
  });

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
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
          <Card className="border-amber-100 dark:border-amber-900/40 dark:bg-[#030a08]/80 shadow-sm hover:shadow-md transition-shadow">
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
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm hover:shadow-md transition-shadow">
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
          <Card className="border-slate-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Filtering Tabs System */}
      <div className="flex flex-wrap items-center gap-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
          <Button 
            key={status}
            variant={statusFilter === status ? "default" : "outline"} 
            onClick={() => setStatusFilter(status as any)}
            className={`rounded-xl px-5 py-2 font-semibold transition-all ${
              statusFilter === status 
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md border-transparent" 
              : "bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-950/40"
            }`}
          >
            {status.charAt(0) + status.slice(1).toLowerCase()} 
            ({status === "ALL" ? totalRequests : status === "PENDING" ? pendingCount : status === "APPROVED" ? approvedCount : rejectedCount})
          </Button>
        ))}
      </div>

      {/* Data Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-emerald-900/30">
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
                  className="pl-9 dark:bg-slate-900/50 dark:border-emerald-800/50 focus-visible:ring-emerald-500 rounded-xl"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[700px]">
                <TableHeader className="bg-slate-50/50 dark:bg-emerald-950/30">
                  <TableRow className="border-slate-200 dark:border-emerald-900/50 hover:bg-transparent">
                    <TableHead className="w-[80px] text-center font-semibold text-slate-600 dark:text-emerald-200">Avatar</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Applicant Details</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Request Date</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Status</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center text-slate-500 dark:text-slate-400">
                          <div className="flex items-center justify-center gap-3">
                            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" /> 
                            <span className="font-medium">ডেটা লোড হচ্ছে...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : errorMessage ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center text-red-500 dark:text-red-400">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <AlertCircle className="h-8 w-8" />
                            <span className="font-medium">{errorMessage}</span>
                            <Button size="sm" variant="outline" onClick={fetchRequests} className="mt-2 rounded-lg">পুনরায় চেষ্টা করুন</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center text-slate-500 dark:text-slate-400 font-medium">
                          কোনো আবেদন পাওয়া যায় নি।
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((req) => (
                        <motion.tr 
                          key={req.id} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20 group transition-colors"
                        >
                          <TableCell className="p-4 text-center">
                            <div className="mx-auto h-12 w-12 overflow-hidden rounded-full border-2 border-slate-100 dark:border-emerald-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-sm">
                              {req.image ? (
                                <img src={req.image} alt={req.name} className="h-full w-full object-cover" />
                              ) : (
                                <User className="h-6 w-6 text-slate-400" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                            <div className="font-semibold text-[15px]">{req.name}</div>
                            <span className="text-sm text-slate-400 block font-normal mt-0.5">{req.email}</span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" /> {req.requestDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              req.status === "APPROVED" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300" : 
                              req.status === "PENDING" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" : 
                              "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                req.status === "APPROVED" ? "bg-emerald-500" : 
                                req.status === "PENDING" ? "bg-amber-500" : 
                                "bg-red-500"
                              }`} />
                              {req.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <div className="flex justify-end gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                              {req.status === "PENDING" ? (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handleReject(req.id)} className="h-9 rounded-xl gap-1.5 text-xs font-semibold text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/60 dark:hover:bg-red-950/40">
                                    <XCircle className="h-4 w-4" /> Reject
                                  </Button>
                                  <Button size="sm" onClick={() => handleApprove(req.id)} className="h-9 rounded-xl gap-1.5 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm border-none">
                                    <CheckCircle className="h-4 w-4" /> Approve
                                  </Button>
                                </>
                              ) : req.status === "APPROVED" ? (
                                <Button size="sm" variant="outline" onClick={() => handleViewDetails(req.id)} className="h-9 rounded-xl gap-1.5 text-xs font-semibold text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/60 dark:hover:bg-emerald-950/40">
                                  <Eye className="h-4 w-4" /> Details
                                </Button>
                              ) : (
                                <span className="text-xs text-slate-400 italic dark:text-slate-500 px-2">No actions needed</span>
                              )}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 🌟 প্রিমিয়াম ডিজাইনের মোডাল (All Details Handled) */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 rounded-3xl bg-white shadow-2xl dark:bg-[#061410] dark:border dark:border-emerald-900/50">
          <DialogTitle className="sr-only">Student Details Profile</DialogTitle>

          {detailsLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-md bg-emerald-500/20 animate-pulse" />
                <Loader2 className="h-12 w-12 animate-spin text-emerald-500 relative z-10" />
              </div>
              <p className="text-sm text-slate-500 font-semibold tracking-wide uppercase">প্রোফাইল লোড হচ্ছে...</p>
            </div>
          ) : selectedStudent ? (
            <div className="relative animate-in fade-in zoom-in-95 duration-300">
              
              {/* Cover Banner Area */}
              <div className="h-36 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 dark:from-emerald-900 dark:via-teal-800 dark:to-emerald-950 relative overflow-hidden">
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                   <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                   {selectedStudent.status}
                 </div>
              </div>

              {/* Avatar Overlapping Banner */}
              <div className="absolute top-16 left-8 h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-white bg-white dark:border-[#061410] dark:bg-slate-900 shadow-xl flex items-center justify-center z-10">
                {selectedStudent.image ? (
                  <img src={selectedStudent.image} alt={selectedStudent.name} className="h-full w-full object-cover transition-transform hover:scale-110 duration-500" />
                ) : (
                  <User className="h-12 w-12 text-slate-300" />
                )}
              </div>

              {/* Main Content Details */}
              <div className="pt-16 px-8 pb-8">
                {/* Name & Email */}
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
                    {selectedStudent.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
                    <Mail className="h-4 w-4 text-emerald-500" />
                    {selectedStudent.email}
                  </div>
                </div>

                {/* 🌟 Info Grid Cards - Data Mapped Correctly */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  
                  {/* Institute Info */}
                  <div className="bg-slate-50 hover:bg-slate-100 transition-colors dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 rounded-2xl p-5 border border-slate-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                      <School className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Institute
                    </div>
                    <p className="text-slate-800 dark:text-emerald-100 font-semibold text-sm leading-relaxed line-clamp-2" title={selectedStudent.institute}>
                      {selectedStudent.institute}
                    </p>
                  </div>

                  {/* Class Info */}
                  <div className="bg-slate-50 hover:bg-slate-100 transition-colors dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 rounded-2xl p-5 border border-slate-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                      <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" /> Class/Grade
                    </div>
                    <p className="text-slate-800 dark:text-emerald-100 font-semibold text-sm">
                      {selectedStudent.class}
                    </p>
                  </div>

                  {/* Student ID */}
                  <div className="bg-slate-50 hover:bg-slate-100 transition-colors dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 rounded-2xl p-5 border border-slate-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                      <Hash className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Student ID
                    </div>
                    <p className="text-slate-800 dark:text-emerald-100 font-semibold text-sm">
                      {selectedStudent.studentId}
                    </p>
                  </div>

                  {/* Role & Date joined */}
                  <div className="bg-slate-50 hover:bg-slate-100 transition-colors dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 rounded-2xl p-5 border border-slate-100 dark:border-emerald-900/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                        <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" /> System Role
                      </div>
                      <p className="text-slate-800 dark:text-emerald-100 font-semibold text-sm">
                        {selectedStudent.role}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-emerald-900/30 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3.5 w-3.5" /> 
                      Joined {selectedStudent.requestDate}
                    </div>
                  </div>

                </div>

                {/* Footer Button */}
                <div className="mt-8">
                  <Button 
                    onClick={() => setIsDetailsOpen(false)}
                    className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Close Profile
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <AlertCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-medium">কোনো তথ্য খুঁজে পাওয়া যায়নি।</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
    </div>
  );
}