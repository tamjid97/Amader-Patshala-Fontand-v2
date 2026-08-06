import type { ISidebarItem } from "@/lib/type";
import {
  FileText,
  LayoutDashboard,
  Award,
  MessageSquare,
  Image as ImageIcon,
  Clock,
  UploadCloud,
  Users,
  UserCheck,
  ShieldPlus,
  UserX,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/admin_dashbord",
    icon: LayoutDashboard,
  },

  {
    label: "Manage Moderators",
    href: "/admin_dashbord/modarator",
    icon: ShieldPlus,
  },
  {
    label: "Manage Users",
    href: "/admin_dashbord/bannedUser",
    icon: Users,
  },
];

const USER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/user_dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Request Student",
    href: "/user_dashboard/request-student",
    icon: UserCheck,
  },
  {
    label: "Request Moderator",
    href: "/user_dashboard/request-moderator",
    icon: ShieldPlus,
  },
];

export const MODERATOR_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/moderator_dashbord",
    icon: LayoutDashboard,
  },
  {
    label: "PDF Management",
    href: "/moderator_dashbord/pdfs", // 👈 পাথ ফিক্স করা হয়েছে
    icon: FileText,
  },
    {
    label: "PDF ACCESS",
    href: "/moderator_dashbord/pdf-access", // 👈 পাথ ফিক্স করা হয়েছে
    icon: FileText,
  },
  {
    label: "Batch Schedule",
    href: "/moderator_dashbord/batch-schedule",
    icon: Clock,
  },
  {
    label: "Student Approvals",
    href: "/moderator_dashbord/syudent",
    icon: UserCheck,
  },
  {
    label: "Results",
    href: "/moderator_dashbord/results",
    icon: Award,
  },
];

export const sidebarMenuItems = {
  USER: USER_SIDEBAR_ITEMS,
  MODERATOR: MODERATOR_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
