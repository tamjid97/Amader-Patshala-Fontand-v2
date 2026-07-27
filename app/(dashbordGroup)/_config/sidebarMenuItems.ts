import type { ISidebarItem } from "@/lib/type"
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
  UserX
} from "lucide-react"

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Admin Dashboard",
        href: "/admin_dashbord",
        icon: LayoutDashboard
    },
    {
        label: "All Users",
        href: "/admin_dashbord/allUser",
        icon: Users
    },
    {
        label: "Student Approvals",
        href: "/admin_dashbord/syudent",
        icon: UserCheck 
    },
    {
        label: "Manage Moderators",
        href: "/admin_dashbord/modarator",
        icon: ShieldPlus 
    },
    {
        label: "Banned Users",
        href: "/admin_dashbord/bannedUser",
        icon: UserX 
    }
];

const AUTHOR_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/author-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Posts",
        href: "/author-dashboard/my-posts",
        icon: FileText
    },
]

const USER_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/sttudent_dashboard",
        icon : LayoutDashboard
    },
    {
        label : "My Posts",
        href : "/sttudent_dashboard/my-posts",
        icon : FileText
    },
]

export const MODERATOR_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/moderator_dashbord",
        icon: LayoutDashboard
    },
    {
        label: "PDF Management",
        href: "/moderator_dashbord/pdfs", // 👈 পাথ ফিক্স করা হয়েছে
        icon: FileText
    },
    {
        label: "Results",
        href: "/moderator_dashbord/results", 
        icon: Award
    },
    {
        label: "Reviews",
        href: "/moderator_dashbord/reviews", 
        icon: MessageSquare
    },
    {
        label: "Banner Management",
        href: "/moderator_dashbord/banners", 
        icon: ImageIcon
    },
    {
        label: "Batch Schedule",
        href: "/moderator_dashbord/batch-schedule", 
        icon: Clock
    },
    {
        label: "Media Upload",
        href: "/moderator_dashbord/media-upload", 
        icon: UploadCloud
    },
]

export const sidebarMenuItems = {
    USER : USER_SIDEBAR_ITEMS,
    AUTHOR : AUTHOR_SIDEBAR_ITEMS,
    MODERATOR : MODERATOR_SIDEBAR_ITEMS, 
    ADMIN : ADMIN_SIDEBAR_ITEMS
}