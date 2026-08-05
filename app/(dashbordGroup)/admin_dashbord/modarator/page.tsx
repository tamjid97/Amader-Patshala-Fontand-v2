"use client";

import React, { useState, useEffect, useTransition } from "react";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  User,
  FileText,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { fetchModeratorRequestsAction, updateRequestStatusAction } from "../_action/modarator";

interface IModeratorRequest {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  requestDate: string;
  image: string;
}

interface IBackendItem {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  isApproved?: string;
  status?: string;
  createdAt?: string;
  profilePicture?: string;
  image?: string;
}

export default function ModeratorPage() {
  const [requests, setRequests] = useState<IModeratorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const rawData = await fetchModeratorRequestsAction();
        const safeData = Array.isArray(rawData) ? rawData : [];

        const formatted = safeData.map((item: IBackendItem) => {
          let formattedStatus: "Pending" | "Approved" | "Rejected" = "Pending";
          const statusStr = String(item.isApproved || item.status || "").toUpperCase();
          
          if (statusStr === "APPROVED") formattedStatus = "Approved";
          else if (statusStr === "REJECTED") formattedStatus = "Rejected";
          else formattedStatus = "Pending";

          return {
            id: item.id,
            name: item.name || item.username || "Unknown",
            email: item.email || item.phoneNumber || "N/A",
            status: formattedStatus,
            requestDate: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : "N/A",
            image: item.profilePicture || item.image || "",
          };
        });

        setRequests(formatted);
      } catch (error) {
        toast.error("Failed to load requests");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleApprove = (id: string) => {
    startTransition(async () => {
      const res = await updateRequestStatusAction(id, "APPROVED");
      if (res.success) {
        toast.success(res.message);
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
        );
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleReject = (id: string) => {
    startTransition(async () => {
      const res = await updateRequestStatusAction(id, "REJECTED");
      if (res.success) {
        toast.success(res.message);
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
        );
      } else {
        toast.error(res.message);
      }
    });
  };

  const totalRequests = requests.length;
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;

  const filteredRequests = requests.filter((r) => {
    const matchesSearch = 
      (r.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (r.email?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          Moderator Approval Requests
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          যেসব ইউজার মডারেটর হওয়ার জন্য রিকোয়েস্ট পাঠিয়েছে, তাদের তালিকা দেখে Approve বা Reject করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Approved Moderators</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{approvedCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

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
      </div>

      <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-slate-800 dark:text-emerald-100">Review Applications</CardTitle>
            <CardDescription className="dark:text-slate-400 mt-1">
              {filteredRequests.length} টি আবেদন প্রদর্শিত হচ্ছে।
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40 h-10 px-3 pr-8 rounded-md border text-sm bg-background border-input dark:bg-slate-900/50 dark:border-emerald-800/50 dark:text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending Only</option>
              <option value="Approved">Approved Only</option>
              <option value="Rejected">Rejected Only</option>
            </select>

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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                        লোড হচ্ছে...
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
                          req.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                            : req.status === "Pending"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            req.status === "Approved" ? "bg-emerald-500" : req.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                          }`} />
                          {req.status}
                        </span>
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {req.status === "Pending" ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isPending}
                                onClick={() => handleReject(req.id)}
                                className="h-8 gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/60 dark:hover:bg-red-950/40"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                Reject
                              </Button>
                              
                              <Button 
                                size="sm" 
                                disabled={isPending}
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
    </div>
  );
}