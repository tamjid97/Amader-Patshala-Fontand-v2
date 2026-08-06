"use client";

import { useActionState, useState, useTransition } from "react";
import { 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  School, 
  GraduationCap, 
  Dna, 
  Lock, 
  Image as ImageIcon,
  ChevronDown 
} from "lucide-react";
import { motion, Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "../_action/registerAction";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300 } 
  },
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button 
      type="submit" 
      disabled={isPending}
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
    >
      {isPending ? "Creating Account..." : "Register"}
    </Button>
  );
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [clientError, setClientError] = useState("");
  const [isPending, startTransition] = useTransition();

  const initialState = {
    success: false,
    statusCode: 200,
    message: "",
    data: {},
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError("");

    const formData = new FormData(event.currentTarget);
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;

    // ফোন নম্বর ১১ ডিজিট কিনা চেক
    if (!phoneNumber || phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)) {
      setClientError("Phone number must be exactly 11 digits!");
      return;
    }

    // পাসওয়ার্ড ৬ ডিজিট বা তার বেশি কিনা চেক
    if (!password || password.length < 6) {
      setClientError("Password must be at least 6 characters long!");
      return;
    }

    // startTransition এর ভেতরে formAction কল করা হলো
    startTransition(() => {
      formAction(formData);
    });
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

          <form onSubmit={handleSubmit} className="p-8 pt-4">
            
            {/* Status Message Display */}
            {(clientError || state?.message) && (
              <div className={`mb-4 rounded-xl p-3 text-center text-sm font-medium ${
                state.success && !clientError
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300" 
                  : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300"
              }`}>
                {clientError || state.message}
              </div>
            )}

            {/* Profile Image Preview */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 flex flex-col items-center justify-center space-y-2"
            >
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-emerald-500/50 bg-emerald-50/50 shadow-md dark:bg-slate-900/50">
                {profilePicUrl ? (
                  <img 
                    src={profilePicUrl} 
                    alt="Profile Preview" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "";
                    }}
                  />
                ) : (
                  <User className="h-10 w-10 text-emerald-600/60 dark:text-emerald-400/60" />
                )}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Profile Preview
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
                    name="phoneNumber"
                    type="tel"
                    maxLength={11}
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

              {/* Class / Category Dropdown */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="class" className="text-slate-700 dark:text-slate-300">
                  Class / Category
                </Label>
                <div className="relative group">
                  <GraduationCap className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500 z-10" />
                  
                  <select
                    id="class"
                    name="class"
                    required
                    defaultValue=""
                    className="flex h-10 w-full appearance-none rounded-md border border-slate-200 bg-transparent pl-10 pr-10 py-2 text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:text-white"
                  >
                    <option value="" disabled className="text-slate-500 dark:text-slate-400 dark:bg-slate-900">
                      Select your class...
                    </option>
                    <option value="HSC-27" className="dark:bg-slate-900">HSC-27</option>
                    <option value="HSC-28" className="dark:bg-slate-900">HSC-28</option>
                    <option value="SSC-27" className="dark:bg-slate-900">SSC-27</option>
                    <option value="SSC-28" className="dark:bg-slate-900">SSC-28</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                </div>
              </motion.div>

              {/* Profile Picture URL */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <Label htmlFor="profilePicture" className="text-slate-700 dark:text-slate-300">
                  Profile Picture URL (Optional)
                </Label>
                <div className="relative group">
                  <ImageIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={profilePicUrl}
                    onChange={(e) => setProfilePicUrl(e.target.value)}
                    className="pl-10 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                  Password (Min 6 characters)
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

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2 md:col-span-2">
                <SubmitButton isPending={isPending} />
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