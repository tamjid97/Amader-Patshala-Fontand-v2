
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { Navbar } from "@/components/shared/navbar";




const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {







  return (
    <html
      lang="en" className={cn("font-sans", inter.variable)}
      
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <Toaster />
        
        {children}
        </body>
    </html>
  );
}
