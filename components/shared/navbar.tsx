"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import {
  Bell,
  CreditCard,
  LogOut,
  Menu,
  Settings,
  User,
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
  { label: "Home", href: "#" },
  { label: "Dashboard", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "Projects", href: "#" },
]

const menuItems = [
  { label: "View Profile", icon: User },
  { label: "Account Settings", icon: Settings },
  { label: "Billing", icon: CreditCard },
  { label: "Notifications", icon: Bell },
]

function BrandLogo() {
  return (
    <Link href="#" className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <path
            d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 12 3 7m9 5 9-5m-9 5v10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        BrandLogo
      </span>
    </Link>
  )
}


function ProfileMenu({ user, onLogout }: { user: IUser; onLogout: () => void }) {
  const profilePic = user?.data?.profilePicture || undefined;
  const initial = user?.data?.name ? user.data.name.charAt(0).toUpperCase() : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Open profile menu"
          >
            <Avatar className="size-9">
              <AvatarImage src={profilePic} alt={user?.data?.name || "User"} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="size-10">
            <AvatarImage src={profilePic} alt={user?.data?.name || "User"} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {user?.data?.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.data?.phoneNumber}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.label}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem variant="destructive" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <BrandLogo />
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex">
            <BrandLogo />
          </div>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex md:hidden">
          <BrandLogo />
        </div>

        <div className="flex items-center">
          
          <ProfileMenu user={user} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}