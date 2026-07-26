"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { sidebarMenuItems } from "../_config/sidebarMenuItems"
import type { ISidebarItem, NavbarProps } from "@/lib/type"

interface SidebarContentProps {
  pathname: string;
  user: NavbarProps["user"];
  setOpen?: (open: boolean) => void;
}

function SidebarContent({ pathname, user, setOpen }: SidebarContentProps) {
  let navItems: ISidebarItem[] = [];

const role = user?.data?.role?.toUpperCase();

  if (role === "USER") {
    navItems = sidebarMenuItems.USER;
  } else if (role === "MODERATOR") {
    navItems = sidebarMenuItems.MODERATOR;
  } else if (role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="p-4 border-b border-emerald-200/60 dark:border-emerald-900/40">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen?.(false)}>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              RB
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm">
                Roots Of Biology
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ← Return to Home
              </span>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="py-4 px-3">
          <nav className="grid gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen?.(false)}>
                  <span
                    className={cn(
                      "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-emerald-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-100/50 hover:text-emerald-900 dark:text-slate-400 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-50"
                    )}
                  >
                    {Icon && <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400")} />}
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="border-t border-emerald-200/60 p-4 dark:border-emerald-900/60">
        <Button variant="ghost" className="w-full justify-start rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export function Sidebar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 📱 1. Mobile Topbar (Sheet Drawer) */}
      <div className="flex h-16 w-full items-center justify-between border-b border-emerald-200/80 bg-emerald-50/80 px-4 dark:border-emerald-900/60 dark:bg-[#030a08] md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
            RB
          </div>
          <span className="font-extrabold text-emerald-950 dark:text-emerald-100 text-sm">
            Roots Of Biology
          </span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-emerald-800 dark:text-emerald-200">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-white dark:bg-[#030a08] border-r border-emerald-200/80 dark:border-emerald-900/60">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent pathname={pathname} user={user} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      {/* 💻 2. Desktop View (Fixed Sidebar) */}
      <aside className="hidden h-screen w-64 border-r border-emerald-200/80 bg-emerald-50/30 dark:border-emerald-900/60 dark:bg-[#030a08]/50 md:flex flex-col">
        <SidebarContent pathname={pathname} user={user} />
      </aside>
    </>
  )
}