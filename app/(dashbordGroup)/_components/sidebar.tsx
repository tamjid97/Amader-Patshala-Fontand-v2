"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  LogOut
} from "lucide-react"

import { Button } from "@/components/ui/button"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Batch Schedule",
    href: "/dashboard/schedule",
    icon: Users,
  },
  {
    title: "Exam Results",
    href: "/dashboard/results",
    icon: ClipboardList,
  },
  {
    title: "Certificates",
    href: "/dashboard/certificates",
    icon: GraduationCap,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-[calc(100vh-4rem)] w-64 flex-col justify-between border-r border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-[#030a08]/50 md:flex">
      
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
        <nav className="grid gap-2">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20 dark:bg-emerald-600 dark:shadow-emerald-900/30"
                      : "text-slate-600 hover:bg-emerald-100/50 hover:text-emerald-900 dark:text-slate-400 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400"
                    )}
                  />
                  {item.title}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Action (e.g., Logout or Help) */}
      <div className="border-t border-emerald-200 p-4 dark:border-emerald-900/60">
        <Button 
          variant="ghost" 
          className="w-full justify-start rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}