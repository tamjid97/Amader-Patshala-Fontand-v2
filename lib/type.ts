import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export interface NavbarProps {
  user: {
    data: {
      role: "USER" | "MODERATOR" | "ADMIN" | string;
      [key: string]: unknown; 
    };
  };
}