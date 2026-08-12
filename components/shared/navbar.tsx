'use client'

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation" 
import { useTheme } from "next-themes"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  Bell,
  LogOut,
  Menu,
  User,
  Sun,
  Moon,
  Dna,
  LayoutDashboard
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner" 
import { logout } from "@/app/service/logout"

type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string | null;
    profilePicture: string | null;
    class: string;
    institute: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    isApproved: string;
    status: string;
  };
};

type NavbarProps = {
  user: IUser
}

const navLinks = [
  { label: "Home", href: "/", protected: false },
  { label: "Batch Time", href: "/batchTime", protected: true },
  { label: "Material", href: "/material", protected: true },
  { label: "QNA", href: "/qna", protected: true },
  { label: "Result", href: "/result", protected: true },
]

function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="mr-2 size-9 rounded-full relative group overflow-hidden border-emerald-200/60 dark:border-emerald-800/60 bg-gradient-to-tr from-emerald-50 to-white dark:from-[#05130e] dark:to-[#081c15] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all duration-500 ease-out border"
      aria-label="Toggle theme"
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-emerald-200/40 dark:bg-emerald-800/40 transition-transform duration-500 ease-out group-hover:scale-150" />
      <Sun className="absolute h-4 w-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-100 rotate-0 opacity-100 dark:scale-0 dark:-rotate-180 dark:opacity-0 text-amber-500 drop-shadow-sm" />
      <Moon className="absolute h-4 w-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-0 rotate-180 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100 text-emerald-300 drop-shadow-[0_0_6px_rgba(110,231,183,0.6)]" fill="currentColor" />
    </Button>
  )
}

function BrandLogo() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 400, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 })

  const rotateX = useTransform(mouseY, [-50, 50], [15, -15])
  const rotateY = useTransform(mouseX, [-50, 50], [-15, 15])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = event.clientX - rect.left - width / 2
    const mouseYPos = event.clientY - rect.top - height / 2
    
    x.set(mouseXPos)
    y.set(mouseYPos)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <Link href="/" className="inline-block z-10" style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="flex items-center gap-2.5 px-2 py-1 rounded-xl cursor-pointer group"
      >
        <motion.span 
          style={{ translateZ: 40 }} 
          whileHover={{ scale: 1.15, rotate: 360 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 10 }}
          className="flex size-9 items-center justify-center rounded-lg bg-emerald-700 text-white dark:bg-emerald-600 shadow-[0_4px_10px_rgba(4,120,87,0.4)] dark:shadow-[0_4px_10px_rgba(5,150,105,0.4)]"
        >
          <Dna className="size-5" />
        </motion.span>
        
        <motion.span 
          style={{ translateZ: 20 }} 
          className="text-lg font-extrabold tracking-tight text-emerald-950 dark:text-emerald-50 drop-shadow-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300"
        >
          Roots Of Biology
        </motion.span>
      </motion.div>
    </Link>
  )
}

function ProfileMenu({ user, onLogout }: { user: IUser; onLogout: () => void }) {
  const router = useRouter() 
  const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000";
  let profilePic = user?.data?.profilePicture;

  if (profilePic && !profilePic.startsWith("http://") && !profilePic.startsWith("https://") && !profilePic.startsWith("data:image/")) {
    const cleanPath = profilePic.replace(/\\/g, "/");
    profilePic = `${BACKEND_URL}/${cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath}`;
  }

  const updateToken = user?.data?.updatedAt ? encodeURIComponent(user.data.updatedAt) : "1";
  const finalProfilePic = profilePic ? `${profilePic}?t=${updateToken}` : null;

  const initial = user?.data?.name ? user.data.name.charAt(0).toUpperCase() : "U";
  const role = user?.data?.role?.toUpperCase();
  const isActiveStatus = user?.data?.status === "ACTIVE";

  const menuItems = [
    { label: "View Profile", icon: User, href: "/profile" },
  ];

  if (role === "ADMIN") {
    menuItems.push({ label: "Dashboard", icon: LayoutDashboard, href: "/admin_dashbord" });
  } else if (role === "MODERATOR") {
    menuItems.push({ label: "Dashboard", icon: LayoutDashboard, href: "/moderator_dashbord" });
  } else if (role === "USER") {
    menuItems.push({ label: "Dashboard", icon: LayoutDashboard, href: "/user_dashboard" });
  }

  menuItems.push({ label: "Notifications", icon: Bell, href: "/coming-soon" });

  return user?.success ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative flex items-center justify-center rounded-full ring-2 ring-emerald-600/30 dark:ring-emerald-400/30 hover:ring-emerald-600 transition-all hover:shadow-[0_0_10px_rgba(5,150,105,0.4)] focus:outline-none cursor-pointer"
        aria-label="Open profile menu"
      >
        <Avatar className="size-9">
          <AvatarImage src={finalProfilePic || undefined} alt={user?.data?.name || "User"} className="object-cover" />
          <AvatarFallback className="bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100 font-bold">
            {initial}
          </AvatarFallback>
        </Avatar>

        {isActiveStatus && (
          <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#030a08] animate-pulse" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-[#030a08] shadow-xl">
        <div className="flex items-center gap-3 p-2">
          <div className="relative">
            <Avatar className="size-10 shadow-sm">
              <AvatarImage src={finalProfilePic || undefined} alt={user?.data?.name || "User"} className="object-cover" />
              <AvatarFallback className="bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100 font-bold">
                {initial}
              </AvatarFallback>
            </Avatar>
            {isActiveStatus && (
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#030a08]" />
            )}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-emerald-950 dark:text-emerald-100">
              {user?.data?.name}
            </span>
            <span className="truncate text-xs text-emerald-800/80 dark:text-emerald-400 font-medium">
              {user?.data?.phoneNumber}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-emerald-200 dark:bg-emerald-800/60" />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem 
              key={item.label} 
              onClick={() => router.push(item.href)}
              className="hover:bg-emerald-200/60 dark:hover:bg-emerald-900/50 cursor-pointer text-emerald-950 dark:text-emerald-100 transition-colors font-medium flex items-center w-full"
            >
              <item.icon className="mr-2 h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-emerald-200 dark:bg-emerald-800/60" />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 font-medium focus:bg-red-100 dark:focus:bg-red-950/50 transition-colors">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href={"/login"}>
      <Button className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 font-semibold shadow-md transition-all hover:scale-105 active:scale-95">
        Login
      </Button>
    </Link>
  )
}

export function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isLoggedIn = user?.success;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.protected && !isLoggedIn) {
      e.preventDefault();
      toast.error("Please login first to view this page!");
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-300/50 dark:border-emerald-900/60 bg-gradient-to-r from-[#a7f3d0]/90 via-[#dcfce7]/90 to-[#a7f3d0]/90 dark:from-[#081c15]/90 dark:via-[#030a08]/90 dark:to-[#081c15]/90 backdrop-blur-md transition-colors duration-300 shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-emerald-300/40 dark:hover:bg-emerald-900/40 text-emerald-950 dark:text-emerald-100"
                aria-label="Open navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 border-r-emerald-200 dark:border-r-emerald-900 bg-emerald-50 dark:bg-[#030a08]">
              <SheetHeader className="border-b border-emerald-200 dark:border-emerald-900/60 p-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <BrandLogo />
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link);
                        if (!link.protected || isLoggedIn) {
                          setOpen(false);
                        }
                      }}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-bold transition-all",
                        isActive 
                          ? "bg-emerald-300/80 text-emerald-950 dark:bg-emerald-900/80 dark:text-emerald-50 shadow-sm" 
                          : "text-emerald-950 dark:text-emerald-100 hover:bg-emerald-200/50 dark:hover:bg-emerald-900/40 hover:text-emerald-950 dark:hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Logo */}
          <div className="hidden md:flex">
            <BrandLogo />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 md:flex bg-white/40 dark:bg-black/20 p-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-white/5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "relative rounded-full px-5 py-1.5 text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "text-emerald-950 bg-white/80 dark:text-emerald-50 dark:bg-emerald-600/40 shadow-sm scale-105" 
                    : "text-emerald-950 dark:text-emerald-100 hover:text-emerald-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-emerald-900/30"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Logo Centered */}
        <div className="flex md:hidden">
          <BrandLogo />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <ProfileMenu user={user} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}