import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { BioBackground } from "@/components/ui/BioBackground";
import { ThemeProvider } from '@/components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Roots Of Biology — Best Biology Coaching in Khulna | By S M Tamjid Hossain Epick',
  description: 'Roots Of Biology is a premier biology coaching center and research dashboard in Khulna, developed by S M Tamjid Hossain Epick (epickdev).',
  generator: 'epickdev',
  authors: [{ name: 'S M Tamjid Hossain Epick', url: 'আপনার-পোর্টফোলিও-বা-গিটহাব-লিংক' }],
  keywords: ['Roots Of Biology Khulna', 'S M Tamjid Hossain Epick', 'epickdev', 'Biology Coaching in Khulna'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Toaster />
          
          {/* এখানে আর Navbar ও Footer থাকবে না */}
          {children}

          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}