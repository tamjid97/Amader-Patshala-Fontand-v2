"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "../_action/authAction";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Dna, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;

    if (state.success === false) {
      toast.error(state.message || "Login failed");
    } else if (state.success === true) {
      toast.success("Welcome back to Amader Pathshala!");
    }
  }, [state]);

  return (
    // 🌟 ফুল স্ক্রিন সেন্টারিং এবং ব্যাকগ্রাউন্ড গ্লো ইফেক্ট
    <div className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden p-4 md:p-8">
      
      {/* 🧬 Ambient Biology Theme Glow (পেছনের আবছা আলো) */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-emerald-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px]" />

      {/* 🚀 3D Animated Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/70 shadow-[0_8px_32px_rgba(16,185,129,0.1)] backdrop-blur-xl dark:bg-slate-950/70 dark:shadow-[0_8px_32px_rgba(16,185,129,0.05)]">
          
          {/* 🌟 Header Section with DNA Logo */}
          <div className="space-y-2 p-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 shadow-inner dark:bg-emerald-900/50"
            >
              <Dna className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your phone number and password to login
            </p>
          </div>

          {/* 🌟 Form Section */}
          <form action={action} className="space-y-6 p-8 pt-4">
            
            <div className="space-y-4">
              {/* Phone Number Input */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    required
                    disabled={pending}
                    className="pl-10 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>

              {/* Password Input with Eye Toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                    Password
                  </Label>
                  <a href="#" className="text-xs text-emerald-600 hover:underline dark:text-emerald-400">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    disabled={pending}
                    className="pr-10 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-emerald-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 🌟 Submit Button */}
            <Button
              type="submit"
              className="group w-full bg-emerald-600 transition-all duration-300 hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] dark:bg-emerald-600 dark:hover:bg-emerald-500"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <span className="flex items-center justify-center text-base">
                  Login to Pathshala
                  <motion.span
                    className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-100"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </span>
              )}
            </Button>

            {/* Signup Link */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <a href="/register" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}