"use client";

import { useState } from "react";

import { RegisterAction } from "../_action/registerAction";
import { useActionState } from "react";
import { 
  Eye, EyeOff, User, Phone, 
  School, GraduationCap, Dna, Lock, Camera 
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  
  const [state, formAction, isPending] = useActionState(RegisterAction, null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden p-4 md:p-8">
      
      
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="relative w-full max-w-2xl"
      >
        <div className="overflow-hidden rounded-3xl border border-emerald-500/20 bg-white/70 shadow-[0_8px_32px_rgba(16,185,129,0.1)] backdrop-blur-xl dark:bg-slate-950/70 dark:shadow-[0_8px_32px_rgba(16,185,129,0.05)]">
          
          {/* Header */}
          <div className="space-y-1 p-8 pb-2 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 shadow-inner dark:bg-emerald-900/50"
            >
              <Dna className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create an Account
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Join Amader Pathshala to start your learning journey
            </p>
          </div>

          
          <form action={formAction} className="p-8 pt-4">
            
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 flex flex-col items-center justify-center space-y-2"
            >
              <div className="relative group">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-emerald-500/50 bg-emerald-50/50 shadow-md transition-all group-hover:border-emerald-500 dark:bg-slate-900/50">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile Preview" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-emerald-600/60 dark:text-emerald-400/60" />
                  )}
                </div>

                <label 
                  htmlFor="profilePicture" 
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Upload Profile Picture
              </span>
            </motion.div>

            {/* Input Fields Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {/* Full Name */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Rakibul Islam"
                    required
                    className="pl-10 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-slate-700 dark:text-slate-300">
                  Phone Number
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="phoneNumber"
                    name="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    required
                    className="pl-10 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </motion.div>

              {/* Institute */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="institute" className="text-slate-700 dark:text-slate-300">
                  Institute Name
                </Label>
                <div className="relative group">
                  <School className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="institute"
                    name="institute"
                    type="text"
                    placeholder="Dhaka College"
                    required
                    className="pl-10 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </motion.div>

              {/* Class */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="class" className="text-slate-700 dark:text-slate-300">
                  Class / Year
                </Label>
                <div className="relative group">
                  <GraduationCap className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="class"
                    name="class"
                    type="text"
                    placeholder="12"
                    required
                    className="pl-10 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-12 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              
              <input type="hidden" name="role" value="USER" />

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2 md:col-span-2">
                <Button
                  type="submit"
                  disabled={isPending} 
                  className="group w-full rounded-xl bg-emerald-600 py-6 text-base font-medium transition-all hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  <span className="flex items-center justify-center">
                    {isPending ? "Registering..." : "Register Now"}
                    <motion.span
                      className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-100"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>

            </motion.div>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                Log in here
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}