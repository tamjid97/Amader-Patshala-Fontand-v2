"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  Clock, 
  UserX, 
  Search, 
  User 
} from "lucide-react";

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ইউজার ডাটা টাইপ
interface IUser {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Moderator" | "Admin";
  status: "Active" | "Pending" | "Banned";
  image: string;
  joinedDate: string;
}

export default function UserManagementPage() {
  // ডেমো ডাটা
  const [users] = useState<IUser[]>([
    {
      id: "1",
      name: "Tanvir Ahmed",
      email: "tanvir@example.com",
      role: "Student",
      status: "Active",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      joinedDate: "2026-07-20"
    },
    {
      id: "2",
      name: "Sumi Akter",
      email: "sumi@example.com",
      role: "Student",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      joinedDate: "2026-07-25"
    },
    {
      id: "3",
      name: "Mahmud Hasan",
      email: "mahmud@example.com",
      role: "Moderator",
      status: "Active",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      joinedDate: "2026-06-15"
    },
    {
      id: "4",
      name: "Rakib Hossain",
      email: "rakib@example.com",
      role: "Student",
      status: "Banned",
      image: "",
      joinedDate: "2026-05-10"
    },
    {
      id: "5",
      name: "Nusrat Jahan",
      email: "nusrat@example.com",
      role: "Student",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      joinedDate: "2026-07-26"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // 📊 গণনা (Count Summary)
  const totalUsers = users.length;
  const totalStudents = users.filter((u) => u.role === "Student").length;
  const pendingUsers = users.filter((u) => u.status === "Pending").length;
  const bannedUsers = users.filter((u) => u.status === "Banned").length;

  // 🔍 সার্চ এবং ফিল্টারিং লজিক
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());

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
          ওয়েবসাইটের নিবন্ধিত সমস্ত ইউজার, স্টুডেন্ট এবং একাউন্ট স্ট্যাটাসের তালিকা।
        </p>
      </div>

      {/* 🔢 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Users */}
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

        {/* Card 2: Total Students */}
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

        {/* Card 3: Pending Requests */}
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

        {/* Card 4: Banned Users */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-emerald-100 dark:border-emerald-900/40 dark:bg-[#030a08]/80 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-emerald-200/70">Banned Users</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-emerald-50 mt-1">{bannedUsers}</h3>
              </div>
              <div className="p-3 rounded-xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400">
                <UserX className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* 📋 Data Table & Search Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-emerald-100 dark:border-emerald-900/50 dark:bg-[#030a08]/80 shadow-sm overflow-hidden">
          
          {/* Top Controls: Search & Category Filter */}
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-slate-800 dark:text-emerald-100">User List</CardTitle>
              <CardDescription className="dark:text-slate-400 mt-1">
                সর্বমোট {filteredUsers.length} জন ইউজার প্রদর্শিত হচ্ছে।
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              
              {/* Quick Status Dropdown Filter */}
              <div className="relative w-full sm:w-40">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 px-3 pr-8 rounded-md border text-sm bg-background border-input dark:bg-slate-900/50 dark:border-emerald-800/50 dark:text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Pending">Pending Only</option>
                  <option value="Banned">Banned Only</option>
                </select>
              </div>

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

          {/* Read-Only Table */}
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="border-y sm:border sm:rounded-md border-slate-200 dark:border-emerald-900/50 overflow-x-auto">
              <Table className="min-w-[650px]">
                <TableHeader className="bg-slate-50 dark:bg-emerald-950/30">
                  <TableRow className="border-slate-200 dark:border-emerald-900/50">
                    <TableHead className="w-[70px] text-center font-semibold text-slate-600 dark:text-emerald-200">Avatar</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">User Details</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Role</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200">Status</TableHead>
                    <TableHead className="font-semibold text-slate-600 dark:text-emerald-200 text-right">Joined Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500 dark:text-slate-400">
                        কোনো ইউজার খুঁজে পাওয়া যায় নি।
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

                        {/* 📅 Date */}
                        <TableCell className="text-xs text-slate-500 dark:text-slate-400 text-right font-medium">
                          {user.joinedDate}
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