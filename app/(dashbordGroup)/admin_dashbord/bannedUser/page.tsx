"use client";

import React, { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Clock, 
  UserX, 
  Search, 
  User, 
  UserCheck, 
  RotateCcw,
  ShieldAlert,
  Loader2
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { fetchAllUsersAction, updateUserStatusAction } from "../_action/user";
interface IUser {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Moderator" | "Admin";
  status: "Active" | "Pending" | "Banned";
  image: string;
  joinedDate: string;
}

interface IBackendUser {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  status?: string;
  isApproved?: string;
  profilePicture?: string;
  image?: string;
  createdAt?: string;
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isPending, startTransition] = useTransition();

  // ব্যাকএন্ড থেকে ইউজার ডেটা লোড করা
  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      try {
        const rawData = await fetchAllUsersAction();
        const safeData = Array.isArray(rawData) ? rawData : [];

        const formattedUsers: IUser[] = safeData.map((item: IBackendUser) => {
          let formattedStatus: "Active" | "Pending" | "Banned" = "Active";
          const st = String(item.status || item.isApproved || "").toUpperCase();
          if (st === "PENDING") formattedStatus = "Pending";
          else if (st === "BANNED" || st === "REJECTED") formattedStatus = "Banned";
          else formattedStatus = "Active";

          let formattedRole: "Student" | "Moderator" | "Admin" = "Student";
          const r = String(item.role || "").toUpperCase();
          if (r === "ADMIN") formattedRole = "Admin";
          else if (r === "MODERATOR") formattedRole = "Moderator";
          else formattedRole = "Student";

          return {
            id: item.id,
            name: item.name || item.username || "Unknown",
            email: item.email || "N/A",
            role: formattedRole,
            status: formattedStatus,
            image: item.profilePicture || item.image || "",
            joinedDate: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : "N/A",
          };
        });

        setUsers(formattedUsers);
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  // 🔄 Ban / Unban এবং Approve লজিক
  const handleStatusChange = (id: string, newStatus: "Active" | "Banned") => {
    startTransition(async () => {
      const res = await updateUserStatusAction(id, newStatus.toUpperCase());
      if (res.success) {
        toast.success(res.message);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
        );
      } else {
        toast.error(res.message);
      }
    });
  };

  // 📊 স্ট্যাট কার্ডের গণনা
  const totalUsers = users.length;
  const totalStudents = users.filter((u) => u.role === "Student").length;
  const pendingUsers = users.filter((u) => u.status === "Pending").length;
  const bannedUsers = users.filter((u) => u.status === "Banned").length;

  // 🔍 সার্চ এবং ফিল্টারিং লজিক
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      (u.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (u.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (u.role?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || u.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* 🌟 Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-emerald-50">
          All Users Directory
        </h1>
        <p className="text-slate-500 dark:text-emerald-100/70">
          ওয়েবসাইটের সমস্ত ইউজারদের তালিকা দেখুন এবং প্রয়োজন অনুযায়ী Approve, Ban বা Unban করুন।
        </p>
      </div>

      {/* 🔢 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Total Users</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 mt-1">{totalUsers}</h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Total Students</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 mt-1">{totalStudents}</h3>
              </div>
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
                <GraduationCap className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Pending Requests</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 mt-1">{pendingUsers}</h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Banned Users</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 mt-1">{bannedUsers}</h3>
              </div>
              <div className="p-3 rounded-xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400">
                <ShieldAlert className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 📋 Data Table & Filter Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm overflow-hidden">
          
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-slate-800 dark:text-emerald-100">User List</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-1">
                মোট {filteredUsers.length} জন ইউজার প্রদর্শিত হচ্ছে।
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Dropdown Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40 h-10 px-3 pr-8 rounded-md border text-sm bg-background border-input dark:bg-slate-900/50 dark:border-emerald-800/50 dark:text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Users</option>
                <option value="Active">Active Only</option>
                <option value="Pending">Pending Only</option>
                <option value="Banned">Banned Only</option>
              </select>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search name, email, role..."
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
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">User Details</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Role</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Status</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                          ইউজারদের ডেটা লোড হচ্ছে...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                        খুঁজে পাওয়া যায় নি। অন্য কিছু দিয়ে সার্চ করুন।
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-slate-100 dark:border-emerald-900/30 dark:hover:bg-emerald-950/20">
                        
                        {/* 🖼️ Avatar */}
                        <TableCell className="p-2 text-center">
                          <div className="mx-auto h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-emerald-800 dark:bg-slate-800 flex items-center justify-center">
                            {user.image ? (
                              <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                        </TableCell>

                        {/* 👤 Name & Email */}
                        <TableCell className="font-medium text-slate-700 dark:text-emerald-50">
                          <div>{user.name}</div>
                          <span className="text-xs text-slate-400 block font-normal">{user.email}</span>
                        </TableCell>
                        
                        {/* 🛡️ Role */}
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            user.role === "Admin"
                              ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50"
                              : user.role === "Moderator"
                              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50"
                          }`}>
                            {user.role}
                          </span>
                        </TableCell>

                        {/* 🟢 Status */}
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                              : user.status === "Pending"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              user.status === "Active" ? "bg-emerald-500" : user.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                            }`} />
                            {user.status}
                          </span>
                        </TableCell>
                        
                        {/* ⚡ Actions (Approve / Ban / Unban) */}
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {user.status === "Pending" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                disabled={isPending}
                                onClick={() => handleStatusChange(user.id, "Active")}
                                className="gap-1.5 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/60 dark:hover:bg-emerald-950/40"
                              >
                                <UserCheck className="h-3.5 w-3.5" />
                                Approve
                              </Button>
                            )}

                            {user.status === "Banned" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isPending}
                                onClick={() => handleStatusChange(user.id, "Active")}
                                className="gap-1.5 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800/60 dark:hover:bg-blue-950/40"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Unban
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isPending}
                                onClick={() => handleStatusChange(user.id, "Banned")}
                                className="gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/60 dark:hover:bg-red-950/40"
                              >
                                <UserX className="h-3.5 w-3.5" />
                                Ban
                              </Button>
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