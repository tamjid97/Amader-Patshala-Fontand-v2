import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "./service/getMe";
import { BioBackground } from "@/components/ui/BioBackground";
import { ThemeProvider } from '@/components/ui/theme-provider';
import Footer from '@/components/shared/footer';



const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Roots Of Biology — Bio Research Dashboard',
  description: 'A premium biology-themed analytics dashboard with a glowing, animated molecular background.',
  generator: 'epickdev',
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#081c15' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // ইউজারের ডেটা ফেচিং
  const user = await getMe();

  // JSX কমেন্টটি return এর ভেতরে না দিয়ে এখানে দেওয়া হলো যাতে Unreachable code এরর না আসে
  // হার্ডকোড করা 'light' ক্লাস সরানো হয়েছে এবং suppressHydrationWarning যোগ করা হয়েছে
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body className="relative min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#030a08] antialiased transition-colors duration-300">
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BioBackground />
          
          
          <Navbar user={user} />
          <Toaster />
          
          <main className="flex-1 z-10 w-full">
            {children}
          </main>
          <Footer/>

          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}